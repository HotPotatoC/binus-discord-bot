import { MessageEmbed } from 'discord.js'
import type { ColorResolvable, Message } from 'discord.js'

import theme from '../theme'
import type { Command, CommandContext } from './../types'

export async function pingExecute({ interaction }: CommandContext) {
  const sent = (await interaction.reply({
    content: 'Pinging...',
    fetchReply: true,
  })) as Message

  const [slow, medium, fast] = ['🔴', '🟡', '🟢']
  const latency = sent.createdTimestamp - interaction.createdTimestamp
  let description = `${slow} \`${latency}ms\``
  let color: ColorResolvable = theme.colors.danger

  if (latency > 100 && latency < 500) {
    description = `${medium} \`${latency}ms\``
    color = theme.colors.warning
  }

  if (latency < 100) {
    description = `${fast} \`${latency}ms\``
    color = theme.colors.success
  }

  const embed = new MessageEmbed().setDescription(description).setColor(color)

  await interaction.editReply({ embeds: [embed] })
}

export default {
  name: 'ping',
  description: 'Pings the bot (Not to be confused with your ping)',
  execute: pingExecute,
} as Command
