import type { Message } from 'discord.js'
import type { Command, CommandContext } from './../types'

export async function pingExecute({ interaction }: CommandContext) {
  const sent = (await interaction.reply({
    content: 'Pinging...',
    fetchReply: true,
  })) as Message

  await interaction.editReply(
    `Roundtrip latency: ${
      sent.createdTimestamp - interaction.createdTimestamp
    }ms`
  )
}

export default {
  name: 'ping',
  description: 'Pings the bot (Not to be confused with your ping)',
  execute: pingExecute,
} as Command
