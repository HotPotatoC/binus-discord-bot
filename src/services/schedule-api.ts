import axios from 'axios'
import { auth, binus } from '../config'

import { routeScheduleDate } from '../types'
import type { ScheduleResponse } from '../types'

/** Fetches class schedule by date */
export async function fetchSchedule(date: string) {
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

  return data as unknown as ScheduleResponse
}

/** Fetches today's class schedule */
export async function fetchTodaysSchedule() {
  // Get tomorrow's date
  const date = new Date().toISOString().slice(0, 10)

  return fetchSchedule(date)
}

/** Fetches tomorrow's class schedule */
export async function fetchTomorrowsSchedule() {
  // Get tomorrow's date
  const date = new Date(+new Date() + 86400000).toISOString().slice(0, 10)

  return fetchSchedule(date)
}
