import { MessageEmbed } from 'discord.js'
import dayjs from 'dayjs'
import type { HexColorString } from 'discord.js'

import theme from '../theme'
import createScheduleDomain from '../domain/schedule-domain'
import createScheduleService from '../services/schedule'
import type { Command, CommandContext } from '../types'

export async function tomorrowExecute({
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

    const schedules = await scheduleService.fetchTomorrowsSchedules()
    const scheduleEmbeds: MessageEmbed[] = []

    for (const schedule of schedules.values()) {
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
        .setColor(theme.colors.primary as HexColorString)

      scheduleEmbeds.push(embed)
    }

    await interaction.reply({ embeds: scheduleEmbeds })
  } catch (error) {
    console.log(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
}

export default {
  name: 'tomorrow',
  description: "Fetches tomorrow's class schedules",
  execute: tomorrowExecute,
} as Command
