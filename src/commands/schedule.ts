import { CommandInteraction, MessageEmbed } from 'discord.js'
import { fetchSchedule } from '../services/schedule-api'
import type { Command, CommandOption } from '../types'

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

export async function scheduleExecute(interaction: CommandInteraction) {
  try {
    const year = interaction.options.getString('year')
    const month = interaction.options.getString('month')
    const day = interaction.options.getString('day')
    const date = `${year}-${month}-${day}`

    const data = await fetchSchedule(date)

    if (!data) {
      await interaction.reply({
        content: 'No schedule found for that date.',
        ephemeral: true,
      })
      return
    }

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
