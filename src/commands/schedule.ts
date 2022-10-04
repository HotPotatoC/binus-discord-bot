import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { EmbedBuilder } from 'discord.js'

import createScheduleDomain from '../domain/schedule-domain'
import createScheduleService from '../services/schedule'
import theme from '../theme'
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

    const year = interaction.options.get('year')
    const month = interaction.options.get('month')
    const day = interaction.options.get('day')
    const date = `${year}-${month}-${day}`

    const schedule = await scheduleService.fetchSchedule(date)

    if (!schedule) {
      await interaction.reply({
        content: 'No schedule found for that date.',
        ephemeral: true,
      })
      return
    }

    const scheduleEmbeds: EmbedBuilder[] = []

    for (const session of schedule.schedule.values()) {
      dayjs.extend(relativeTime)
      const whenStartsAt = dayjs(session.dateStart).fromNow()
      const startsAt = dayjs(session.dateStart).format('YYYY-MM-DD HH:mm')
      const endsAt = dayjs(session.dateEnd).format('YYYY-MM-DD HH:mm')

      const embed = new EmbedBuilder()
        .setTitle(`${session.content} [${session.title}]`)
        .setDescription(
          `Session ${session.customParam.sessionNumber} ${session.content} ${session.title}`
        )
        .addFields(
          { name: 'Starts at:', value: `${whenStartsAt} - ${startsAt}` },
          { name: 'Ends at:', value: endsAt },
          {
            name: 'Session:',
            value: session.customParam.sessionNumber.toString(),
            inline: true,
          },
          { name: 'Delivery Mode:', value: session.deliveryMode, inline: true }
        )
        .setFooter({ text: `ID: ${schedule.uniqueId}` })
        .setColor(theme.colors.primary)

      if (session.zoomUrl) {
        embed.setURL(session.zoomUrl)
        embed.addFields({ name: 'Zoom URL:', value: session.zoomUrl })
      }

      scheduleEmbeds.push(embed)
    }

    await interaction.reply({ embeds: scheduleEmbeds })
  } catch (error) {
    console.log(error)
    await interaction.reply({
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
