import { ObjectId } from 'bson'
import type { Filter } from 'mongodb'

import type { DomainContext, ScheduleAPISchema } from '../types'

/** The schedule domain */
export type ScheduleDomain = {
  _id: ObjectId
  uniqueId: string
  dateStart: string
  schedule: (ScheduleAPISchema & { zoomUrl: string | null })[]
  createdAt: Date
}

/** Creates a new schedule domain handler */
export function createScheduleDomain({ database }: DomainContext) {
  const collectionScheduleName = 'schedules'
  const collectionSchedule = database.collection<ScheduleDomain>(
    collectionScheduleName
  )

  /** Finds multiple schedules by the given filter */
  async function find(
    filter: Filter<ScheduleDomain>
  ): Promise<ScheduleDomain[]> {
    return collectionSchedule.find(filter).toArray()
  }

  /** Finds a schedule by the given filter */
  async function findOne(
    filter: Filter<ScheduleDomain>
  ): Promise<ScheduleDomain | null> {
    return collectionSchedule.findOne(filter)
  }

  /** Inserts a schedule */
  async function insertOne(schedule: ScheduleDomain): Promise<string> {
    const result = await collectionSchedule.insertOne(schedule)
    return result.insertedId.toHexString()
  }

  /** Updates a schedule */
  async function updateOne(
    filter: Filter<ScheduleDomain>,
    schedule: ScheduleDomain
  ): Promise<number> {
    const result = await collectionSchedule.updateOne(filter, {
      $set: schedule,
    })
    return result.modifiedCount
  }

  /** Deletes a schedule */
  async function deleteOne(filter: Filter<ScheduleDomain>): Promise<number> {
    const result = await collectionSchedule.deleteOne(filter)
    return result.deletedCount
  }

  return {
    collectionScheduleName,
    collectionSchedule,
    find,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
  }
}

export type ScheduleDomainContext = ReturnType<typeof createScheduleDomain>

export default createScheduleDomain
