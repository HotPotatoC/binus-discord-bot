import { Client, GatewayIntentBits, REST } from 'discord.js'

import { bot } from './config'
import database from './infrastructure/database'
import { registerCommands } from './register-commands'

import events from './events'

/** Entry-point */
async function main() {
  console.log('Starting...')

  const [mongoDatabase, mongoClient] = await database.connect(
    process.env.MONGODB_URL as string
  )

  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  const rest = new REST({ version: '10' }).setToken(bot.token)

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
