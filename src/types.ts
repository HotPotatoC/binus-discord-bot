import type { Client, CommandInteraction } from 'discord.js'
import * as mongodb from 'mongodb'

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

/** Class session resource */
export type ClassSessionResource = {
  id: string
  name: string
  url: string | null
  token: string | null
  type: any | null
  duration: string
  index: string
  isOpen: boolean
  progressStamp: number
  timesAccessed: number
  resourceStatus: string
  lastUpdatedDate: string
  resourceLastUpdatedDate: string
  assessmentType: any | null
  resourceType: string
  dueDate: string
  thumbnail: any | null
  isOverdue: boolean
  iosRedirectUrl: string | null
  androidRedirectUrl: string | null
}

/** Class session details */
export type ClassSession = {
  topic: string
  status: any
  resources: ClassSessionResource[]
  lecturers: {
    id: string
    name: string
    pictureUrl: string
    userCode: string
    role: string
  }
  totalResource: number
  classSessionProgress: {
    notStarted: number
    inProgress: number
    completed: number
  }
  meetingStart: string
  meetingEnd: string
  joinUrl: string
  isEnded: boolean
  sessionNumber: number
  startDateSessionUtc: string
  endDateSessionUtc: string
  dateStart: string
  dateEnd: string
  classDeliveryMode: string
  deliveryMode: string
  deliveryModeDesc: string
  courseSubTopic: string[]
}

export const routes = {
  /** Route: https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule (used as prefix) */
  Schedule: `${binus.restScheduleURL}/schedule`,

  /** Route: (POST) https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule/Date-v1/{date} */
  ScheduleDate: (date: string) =>
    `${binus.restScheduleURL}/schedule/Date-v1/${date}`,

  /** Route: (POST) https://func-bm7-schedule-prod.azurewebsites.net/api/api/schedule/Month-v1/{date} */
  ScheduleMonth: (date: string) =>
    `${binus.restScheduleURL}/schedule/Month-v1/${date}`,

  /** Route: https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component (used as prefix) */
  Courses: `${binus.restCourseURL}/Course/Period/2110/Component`,

  /** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/LEC/Student */
  CoursesLEC: `${binus.restCourseURL}/Course/Period/2110/Component/LEC/Student`,

  /** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/TUT/Student */
  CoursesTUT: `${binus.restCourseURL}/Course/Period/2110/Component/TUT/Student`,

  /** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/Course/Period/2110/Component/LAB/Student */
  CoursesLAB: `${binus.restCourseURL}/Course/Period/2110/Component/LAB/Student`,
  /** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/Class/{classID}/Student */
  Class: (classID: string) =>
    `${binus.restCourseURL}/ClassSession/Class/${classID}/Student`,

  /** Route: (GET) https://apim-bm7-prod.azure-api.net/func-bm7-course-prod/ClassSession/Session/{sessionID}/Resource/Student */
  ClassSession: (sessionID: string) =>
    `${binus.restCourseURL}/ClassSession/Session/${sessionID}/Resource/Student`,
}
