import { ObjectId } from 'bson'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import type {
  ScheduleDomain,
  ScheduleDomainContext,
} from '../domain/schedule-domain'
import request from '../infrastructure/http-client'
import type { ClassSession, ScheduleResponse, ServiceContext } from '../types'
import { routes } from '../types'

/** Creates a new schedule service handler */
export function createScheduleService({
  domain,
}: ServiceContext<ScheduleDomainContext>) {
  /** Fetches class schedule by date (yyyy-mm-dd) */
  async function fetchSchedule(date: string) {
    // If the schedule exists in the collection, return it
    const savedSchedule = await domain.findOne({
      dateStart: {
        $gte: dayjs(date).toISOString(),
        $lte: dayjs(date)
          .add(23, 'hour')
          .add(59, 'minute')
          .add(59, 'second')
          .toISOString(),
      },
    })

    if (!savedSchedule) {
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

      const { data } = await request.post(routes.ScheduleDate(date), payload)

      const { dateStart, Schedule } = data as unknown as ScheduleResponse
      const [_id, uniqueId, createdAt] = [new ObjectId(), uuidv4(), new Date()]

      const schedule = await Promise.all(
        Schedule.map(async (session) => {
          const response = await request.get<ClassSession>(
            routes.ClassSession(session.customParam.classSessionId)
          )
          return { ...session, zoomUrl: response.data.joinUrl }
        })
      )

      await domain.insertOne({
        _id,
        uniqueId,
        dateStart,
        schedule,
        createdAt,
      })

      return {
        _id,
        uniqueId,
        dateStart,
        schedule: Schedule,
        createdAt,
      } as ScheduleDomain
    }

    return savedSchedule
  }

  /** Fetches today's class schedule */
  async function fetchTodaysSchedules() {
    // Get today's date yyyy-mm-dd
    const date = dayjs().format('YYYY-MM-DD')
    return fetchSchedule(date)
  }

  /** Fetches tomorrow's class schedule */
  async function fetchTomorrowsSchedules() {
    // Get tomorrow's date yyyy-mm-dd
    const date = dayjs().add(1, 'day').format('YYYY-MM-DD')
    return fetchSchedule(date)
  }

  return {
    fetchSchedule,
    fetchTodaysSchedules,
    fetchTomorrowsSchedules,
  }
}

export default createScheduleService
