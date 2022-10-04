import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EmbedBuilder } from 'discord.js'

import createScheduleDomain from '../domain/schedule-domain'
import createScheduleService from '../services/schedule'
import theme from '../theme'
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
