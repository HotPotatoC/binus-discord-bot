import { MessageEmbed } from 'discord.js'
import type { HexColorString } from 'discord.js'

import theme from '../theme'
import createScheduleDomain from '../domain/schedule-domain'
import createScheduleService from '../services/schedule'
import type { Command, CommandContext } from '../types'

export async function todayExecute({ interaction, mongodb }: CommandContext) {
  try {
    const scheduleDomain = createScheduleDomain({
      database: mongodb.database,
      client: mongodb.client,
    })

    const scheduleService = createScheduleService({
      domain: scheduleDomain,
    })

    const data = await scheduleService.fetchTodaysSchedules()
    const scheduleEmbeds: MessageEmbed[] = []

    for (const schedule of data.values()) {
      const embed = new MessageEmbed()
        .setTitle(`${schedule.content} [${schedule.title}]`)
        .setDescription(
          `Session ${schedule.customParam.sessionNumber} ${schedule.content} ${schedule.title}`
        )
        .addField(
          'Starting at:',
          new Date(schedule.dateStart).toLocaleTimeString(),
          true
        )
        .addField(
          'Ends at:',
          new Date(schedule.dateEnd).toLocaleTimeString(),
          true
        )
        .addField(
          'Session:',
          schedule.customParam.sessionNumber.toString(),
          true
        )
        .addField('Delivery Mode:', schedule.deliveryMode, true)
        .setColor(theme.colors.primary as HexColorString)

      scheduleEmbeds.push(embed)
    }

    await interaction.reply({ embeds: scheduleEmbeds })
  } catch (error) {
    console.log(error)
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
}

export default {
  name: 'today',
  description: "Fetches today's class schedules",
  execute: todayExecute,
} as Command
