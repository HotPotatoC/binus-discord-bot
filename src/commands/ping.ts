import type { Command, CommandContext } from './../types'

export async function pingExecute({ interaction }: CommandContext) {
  await interaction.reply('Pong!')
}

export default {
  name: 'ping',
  description: 'Replies with pong!',
  execute: pingExecute,
} as Command
