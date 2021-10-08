import * as mongodb from 'mongodb'
import type { Client, CommandInteraction } from 'discord.js'

import { binus } from './config'

/** Domain dependencies */
export type DomainContext = {
  database: mongodb.Db
  client: mongodb.MongoClient
}

/** Service dependencies */
export type ServiceContext<D> = {
  domain: D
}

/** Command dependencies */
export type CommandContext = {
  interaction: CommandInteraction
  client: Client
  mongodb: {
    database: mongodb.Db
    client: mongodb.MongoClient
  }
}

/** Command option */
export type CommandOption = {
  name: string
  description: string
  required?: boolean
  type:
    | 'string'
    | 'integer'
    | 'number'
    | 'boolean'
    | 'user'
    | 'channel'
    | 'role'
    | 'mentionable'
}

/** A generic command */
export type Command = {
  /** Name of the command */
  name: string
  /** Description of the command */
  description: string
  /** Logic of the command */
  execute: (ctx: CommandContext) => Promise<void>
  /** Options of the command (slash commands only) */
  options?: CommandOption[]
}

/** Schedule schema */
export type ScheduleAPISchema = {
  dateStart: string
  dateEnd: string
  title: string
  content: string
  location: string | null
  locationValue: string | null
  scheduleType: string
  customParam: {
    classId: string
    classSessionId: string
    sessionNumber: number
  }
  classDeliveryMode: string
  deliveryMode: string
  deliveryModeDesc: string
  academicCareerDesc: string
  institutionDesc: string
  organizationRoleId: string
}

/** Schedule REST API response schema */
export type ScheduleResponse = {
  dateStart: string
  Schedule: ScheduleAPISchema[]
}

/** Route: https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule (used as prefix) */
export const routeSchedule = `${binus.restScheduleURL}/schedule`

/** Route: (POST) https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule/Date-v1/{date} */
export const routeScheduleDate = (date: string) =>
  `${routeSchedule}/Date-v1/${date}`

/** Route: (POST) https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule/Month-v1/{date} */
export const routeScheduleMonth = (date: string) =>
  `${routeSchedule}/Month-v1/${date}`

/** Route: https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component (used as prefix) */
export const routeCourses = `${binus.restCourseURL}/Course/Period/2110/Component`

/** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/LEC/Student */
export const routeCoursesLEC = `${routeCourses}/LEC/Student`

/** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/TUT/Student */
export const routeCoursesTUT = `${routeCourses}/TUT/Student`

/** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/LAB/Student */
export const routeCoursesLAB = `${routeCourses}/LAB/Student`

/** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/Class/{classID}/Student */
export const routeClass = (classID: string) =>
  `${binus.restCourseURL}/ClassSession/Class/${classID}/Student`

/** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/Session/{sessionID}/Resource/Student */
export const routeClassSession = (sessionID: string) =>
  `${binus.restCourseURL}/ClassSession/Session/${sessionID}/Resource/Student`
