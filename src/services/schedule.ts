import axios from 'axios'
import { ObjectId } from 'bson'
import { nanoid } from 'nanoid'

import { auth, binus } from '../config'
import { routeScheduleDate } from '../types'
import type { ServiceContext, ScheduleResponse } from '../types'
import type { ScheduleDomainContext } from '../domain/schedule-domain'

/** Creates a new schedule service handler */
export function createScheduleService({
  domain,
}: ServiceContext<ScheduleDomainContext>) {
  /** Fetches class schedule by date (yyyy-mm-dd) */
  async function fetchSchedule(date: string) {
    // If the schedule exists in the collection, return it
    const scheduleExists = await domain.findOne({
      dateStart: {
        $gte: new Date(date).toISOString(),
        $lte: new Date(date + 'T23:59:59.999Z').toISOString(),
      },
    })

    if (!scheduleExists) {
      // If the schedule doesn't exist, fetch it from Binus API and save it to the collection
      const payload = {
        roleActivity: [
          {
            name: 'Student',
            userCode: '2501994771',
            roleId: '4bcb81bd-46a8-4a09-a923-5e812cb7007b',
            roleType: 'student',
            roleOrganizationId: '1059b47e-695d-4476-9950-bb8de0454ca0',
            academicCareerId: 'd98ce516-1068-4f75-8324-63587cc631f0',
            academicCareer: 'RS1',
            academicCareerDesc: 'Undergraduate',
            institutionId: null,
            institution: 'BNS01',
            institutionDesc: 'BINUS University',
            isPrimary: true,
            isActive: true,
          },
        ],
      }

      const { data } = await axios.post(routeScheduleDate(date), payload, {
        headers: {
          Origin: binus.binusMayaURL,
          Referer: binus.binusMayaURL,
          roleName: 'Student',
          Authorization: `Bearer ${auth.bearerToken}`,
          academicCareer: 'RS1',
          institution: 'BNS01',
          rOld: '1059b47e-695d-4476-9950-bb8de0454ca0',
          roleId: '4bcb81bd-46a8-4a09-a923-5e812cb7007b',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
          'Content-Type': 'application/json',
        },
      })

      const { dateStart } = data as unknown as ScheduleResponse
      const schedule = (data as unknown as ScheduleResponse).Schedule
      const [_id, uniqueId, createdAt] = [new ObjectId(), nanoid(), new Date()]
      await domain.insertOne({
        _id,
        uniqueId,
        dateStart,
        schedule,
        createdAt,
      })

      return schedule
    }

    return scheduleExists.schedule
  }

  /** Fetches today's class schedule */
  async function fetchTodaysSchedules() {
    // Get today's date yyyy-mm-dd
    const date = new Date().toISOString().split('T')[0]
    return fetchSchedule(date)
  }

  /** Fetches tomorrow's class schedule */
  async function fetchTomorrowsSchedules() {
    // Get tomorrow's date yyyy-mm-dd
    const date = new Date(+new Date() + 86400000).toISOString().split('T')[0]
    return fetchSchedule(date)
  }

  return {
    fetchSchedule,
    fetchTodaysSchedules,
    fetchTomorrowsSchedules,
  }
}

export default createScheduleService
