import { Client, Intents, TextChannel } from 'discord.js'
import { REST } from '@discordjs/rest'

import { bot } from './config'
import database from './infrastructure/database'
import { commands, registerCommands } from './register-commands'
import { ConfigureCommandComponentID } from './commands/configure'

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

  client.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.tag}!`)

    console.log(`Connected to ${client.guilds.cache.size} guilds!`)
  })

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isSelectMenu()) {
      if (
        interaction.customId ===
        ConfigureCommandComponentID.notificationsChannelID
      ) {
        // TODO: Implement notifications
        await interaction.update({
          content: 'Notification is still in WIP',
          components: [],
        })
      }
    }

    if (!interaction.isCommand()) return
    try {
      const command = commands.get(interaction.commandName)

      if (!command) {
        interaction.reply('Command not found')
        return
      }

      await command.execute({
        interaction,
        client,
        mongodb: {
          database: mongoDatabase,
          client: mongoClient,
        },
      })
    } catch (error) {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  })

  client.login(bot.token)
}

main()
