import fs from 'fs'
import path from 'path'

import { SlashCommandBuilder } from '@discordjs/builders'
import type { REST } from 'discord.js'
import { Collection, Routes } from 'discord.js'

import { bot } from './config'
import type { Command, CommandOption } from './types'

/** Default commands directory path */
const commandsDirPath = path.resolve(__dirname, './commands')

/** Get command files */
const getCommandFiles = (): string[] =>
  fs.readdirSync(commandsDirPath).filter((file) => file.endsWith('.ts'))

/** Commands map */
export const commands = new Collection<string, Command>()

/** Create slash commands */
export async function createSlashCommands() {
  const slashCommands: SlashCommandBuilder[] = []
  for (const file of getCommandFiles()) {
    const command = (await import(path.resolve(commandsDirPath, file)))
      .default as Command

    const slashCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)

    if (command.options && command.options.length) {
      command.options.forEach((cmdOpt: CommandOption) => {
        switch (cmdOpt.type) {
          case 'string':
            slashCommand.addStringOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'number':
            slashCommand.addNumberOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'boolean':
            slashCommand.addBooleanOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'user':
            slashCommand.addUserOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'channel':
            slashCommand.addChannelOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'role':
            slashCommand.addRoleOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
          case 'mentionable':
            slashCommand.addMentionableOption((option) =>
              option
                .setName(cmdOpt.name)
                .setDescription(cmdOpt.description)
                .setRequired(cmdOpt.required || false)
            )
            break
        }
      })
    }

    slashCommands.push(slashCommand)
  }

  return slashCommands
}

/** Register commands */
export async function registerCommands(client: REST) {
  // Get all commands in the commands directory and register them
  for (const file of getCommandFiles()) {
    const command = (await import(path.resolve(commandsDirPath, file)))
      .default as Command
    commands.set(command.name, command)
  }

  const slashCommands = await createSlashCommands()
  await client
    .put(Routes.applicationCommands(bot.clientID), {
      body: slashCommands.map((c) => c.toJSON()),
    })
    .catch(console.error)

  console.log('Successfully registered application commands.')
}
