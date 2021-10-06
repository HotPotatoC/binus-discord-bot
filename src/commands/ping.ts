import { CommandInteraction } from 'discord.js'
import type { Command } from './../types'

export async function pingExecute(interaction: CommandInteraction) {
  await interaction.reply('Pong!')
}

export default {
  name: 'ping',
  description: 'Replies with pong!',
  execute: pingExecute,
} as Command
