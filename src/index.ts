import { Client, Intents } from 'discord.js'
import { REST } from '@discordjs/rest'

import { bot } from './config'
import { commands, registerCommands } from './register-commands'

/** Entry-point */
async function main() {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
  })

  const rest = new REST({ version: '9' }).setToken(bot.token)

  await registerCommands(rest)

  client.on('ready', () => {
    console.log('Ready!')
  })

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return
    try {
      const command = commands.get(interaction.commandName)

      if (!command) {
        interaction.reply('Command not found')
        return
      }

      await command.execute(interaction)
    } catch (error) {
      return interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  })

  client.login(bot.token)
}

main()
