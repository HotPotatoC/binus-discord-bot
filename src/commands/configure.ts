import { MessageActionRow, MessageSelectMenu } from 'discord.js'
import type { TextChannel } from 'discord.js'

import type { Command, CommandContext } from './../types'

export enum ConfigureCommandComponentID {
  notificationsChannelID = 'commands.configure.select--notificationsChannelID',
}

export async function configureExecute({ interaction }: CommandContext) {
  const channels = interaction.client.channels.cache
  const actionRow = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId(ConfigureCommandComponentID.notificationsChannelID)
      .setPlaceholder('Nothing selected')
      .addOptions(
        ...channels
          .filter((channel) => channel.type === 'GUILD_TEXT')
          .map((channel) => ({
            value: channel.id,
            label: (channels.get(channel.id) as TextChannel).name,
          }))
      )
  )

  await interaction.reply({
    content: 'Select channel to send upcoming class notifications',
    components: [actionRow],
  })
}

export default {
  name: 'configure',
  description: 'Configure the bot',
  execute: configureExecute,
} as Command
