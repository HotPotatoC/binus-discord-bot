import * as mongodb from 'mongodb'

export let database: mongodb.Db
export let client: mongodb.MongoClient

export async function connect(url: string) {
  const client = await mongodb.MongoClient.connect(url)

  await client.connect()

  return [client.db(), client] as [mongodb.Db, mongodb.MongoClient]
}

export default { connect }
