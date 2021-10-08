import { Client, Intents } from 'discord.js'
import { REST } from '@discordjs/rest'

import { bot } from './config'
import database from './infrastructure/database'
import { registerCommands } from './register-commands'

import events from './events'

/** Entry-point */
async function main() {
  const [mongoDatabase, mongoClient] = await database.connect(
    process.env.MONGODB_URL as string
  )

  const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
  })

  const rest = new REST({ version: '9' }).setToken(bot.token)

  await registerCommands(rest)

  client.on('ready', events.createReadyEventListener())

  client.on(
    'interactionCreate',
    events.createInteractionCreateListener({
      client,
      mongodb: { database: mongoDatabase, client: mongoClient },
    })
  )

  client.login(bot.token)
}

main()
