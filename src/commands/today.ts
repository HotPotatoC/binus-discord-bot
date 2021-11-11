import { MessageEmbed } from 'discord.js'
import dayjs from 'dayjs'

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

    const schedule = await scheduleService.fetchTodaysSchedules()
    const scheduleEmbeds: MessageEmbed[] = []

    for (const session of schedule.schedule.values()) {
      const startsAt = dayjs(session.dateStart).format('YYYY-MM-DD HH:mm')
      const endsAt = dayjs(session.dateEnd).format('YYYY-MM-DD HH:mm')

      const embed = new MessageEmbed()
        .setTitle(`${session.content} [${session.title}]`)
        .setDescription(
          `Session ${session.customParam.sessionNumber} ${session.content} ${session.title}`
        )
        .addField('Starts at:', startsAt)
        .addField('Ends at:', endsAt)
        .addField(
          'Session:',
          session.customParam.sessionNumber.toString(),
          true
        )
        .addField('Delivery Mode:', session.deliveryMode, true)
        .setURL(session.zoomUrl || '')
        .setFooter(`ID: ${schedule.uniqueId}`)
        .setColor(theme.colors.primary)

      if (session.zoomUrl) {
        embed.addField('Zoom URL:', session.zoomUrl)
      }

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
  name: 'today',
  description: "Fetches today's class schedules",
  execute: todayExecute,
} as Command
