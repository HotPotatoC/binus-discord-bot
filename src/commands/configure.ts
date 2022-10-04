import type { TextChannel } from 'discord.js'
import { ActionRowBuilder, ChannelType, SelectMenuBuilder } from 'discord.js'

import type { Command, CommandContext } from './../types'

export enum ConfigureCommandComponentID {
  notificationsChannelID = 'commands.configure.select--notificationsChannelID',
}

export async function configureExecute({ interaction }: CommandContext) {
  if (!interaction.isChatInputCommand()) return

  const channels = interaction.client.channels.cache
  const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
    new SelectMenuBuilder()
      .setCustomId(ConfigureCommandComponentID.notificationsChannelID)
      .setPlaceholder('Nothing selected')
      .addOptions(
        ...channels
          .filter((channel) => channel.type === ChannelType.GuildText)
          .map((channel) => ({
            value: channel.id,
            label: (channels.get(channel.id) as TextChannel).name,
          }))
      )
  )

  await interaction.reply({
    content: 'Select channel to send upcoming class notifications',
    components: [row],
  })
}

export default {
  name: 'configure',
  description: 'Configure the bot',
  execute: configureExecute,
} as Command
