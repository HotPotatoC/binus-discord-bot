import { CommandInteraction, MessageEmbed } from 'discord.js'
import { fetchTodaysSchedule } from '../services/schedule-api'
import type { Command } from '../types'

export async function todayExecute(interaction: CommandInteraction) {
  try {
    const data = await fetchTodaysSchedule()
    const scheduleEmbeds: MessageEmbed[] = []

    for (const schedule of data.Schedule.values()) {
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
        .setColor('#FFF')

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
