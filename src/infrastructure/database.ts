import * as mongodb from 'mongodb'

export async function connect(url: string) {
  const client = await mongodb.MongoClient.connect(url)

  await client.connect()

  return [client.db(), client] as [mongodb.Db, mongodb.MongoClient]
}

export default { connect }
