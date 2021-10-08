import { MessageEmbed } from 'discord.js'
import dayjs from 'dayjs'
import type { HexColorString } from 'discord.js'

import theme from '../theme'
import createScheduleDomain from '../domain/schedule-domain'
import createScheduleService from '../services/schedule'
import type { Command, CommandContext, CommandOption } from '../types'

const scheduleCommandOptions: CommandOption[] = [
  {
    name: 'year',
    description: 'The year of the schedule (ex: 2021)',
    required: true,
    type: 'string',
  },
  {
    name: 'month',
    description: 'The month of the schedule (ex: 06 or 12)',
    required: true,
    type: 'string',
  },
  {
    name: 'day',
    description: 'The day of the schedule (ex: 04 or 16)',
    required: true,
    type: 'string',
  },
]

export async function scheduleExecute({
  interaction,
  mongodb,
}: CommandContext) {
  try {
    const scheduleDomain = createScheduleDomain({
      database: mongodb.database,
      client: mongodb.client,
    })

    const scheduleService = createScheduleService({
      domain: scheduleDomain,
    })

    const year = interaction.options.getString('year')
    const month = interaction.options.getString('month')
    const day = interaction.options.getString('day')
    const date = `${year}-${month}-${day}`

    const data = await scheduleService.fetchSchedule(date)

    if (!data) {
      await interaction.reply({
        content: 'No schedule found for that date.',
        ephemeral: true,
      })
      return
    }

    const scheduleEmbeds: MessageEmbed[] = []

    for (const schedule of data.values()) {
      const startsAt = dayjs(schedule.dateStart).format('YYYY-MM-DD HH:mm')
      const endsAt = dayjs(schedule.dateEnd).format('YYYY-MM-DD HH:mm')

      const embed = new MessageEmbed()
        .setTitle(`${schedule.content} [${schedule.title}]`)
        .setDescription(
          `Session ${schedule.customParam.sessionNumber} ${schedule.content} ${schedule.title}`
        )
        .addField('Starts at:', startsAt, true)
        .addField('Ends at:', endsAt, true)
        .addField(
          'Session:',
          schedule.customParam.sessionNumber.toString(),
          true
        )
        .addField('Delivery Mode:', schedule.deliveryMode, true)
        .setColor(theme.colors.primary)

      scheduleEmbeds.push(embed)
    }

    await interaction.reply({ embeds: scheduleEmbeds })
  } catch (error) {
    console.log(error)
    return interaction.reply({
      content: 'An error occurred while fetching the schedule.',
      ephemeral: true,
    })
  }
}

export default {
  name: 'schedule',
  description: 'Fetches class schedule by the specified date',
  execute: scheduleExecute,
  options: scheduleCommandOptions,
} as Command
