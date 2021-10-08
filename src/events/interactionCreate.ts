import mongodb from 'mongodb'
import type { Client, Interaction } from 'discord.js'

import { ConfigureCommandComponentID } from '../commands/configure'
import { commands } from '../register-commands'

export type InteractionCreateContext = {
  client: Client
  mongodb: {
    database: mongodb.Db
    client: mongodb.MongoClient
  }
}

export default function ({ client, mongodb }: InteractionCreateContext) {
  return async (interaction: Interaction) => {
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
        mongodb,
      })
    } catch (error) {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }
}
