// TODO: Implement notification service
// import { MessageEmbed } from 'discord.js'
// import type { TextChannel, HexColorString } from 'discord.js'

// import { fetchTodaysSchedules } from './schedule'

// import theme from '../theme'

// /** Gets upcoming class schedules */
// export async function getUpcomingSchedule() {
//   const schedule = await fetchTodaysSchedules()

//   const now = new Date()
//   const upcoming = schedule.filter(
//     ({ dateStart, dateEnd }) =>
//       new Date(dateStart) > now && new Date(dateStart) < new Date(dateEnd)
//   )

//   return upcoming
// }

// /** Gets past class schedules */
// export async function getPastSchedule() {
//   const schedule = await fetchTodaysSchedules()

//   const now = new Date()
//   const past = schedule.filter(
//     ({ dateStart, dateEnd }) =>
//       new Date(dateStart) < now && new Date(dateEnd) < now
//   )

//   return past
// }

// /**
//  * Sends notifications to students when they have
//  * a class in the next hour.
//  */
// export async function notifyUpcomingClass(channel: TextChannel) {
//   const upcoming = await getUpcomingSchedule()

//   // Filters upcoming classes in the next hour
//   const upcomingClasses = upcoming.filter(({ dateStart }) => {
//     const now = new Date()
//     const start = new Date(dateStart)

//     return start.getHours() === now.getHours() + 1
//   })

//   const upcomingClassesMessage = upcomingClasses.length
//     ? `\n\n${upcomingClasses.map(({ content }) => content).join('\n')}`
//     : ''

//   const messageEmbed = new MessageEmbed()
//     .setTitle(`Upcoming Class${upcomingClasses.length > 1 ? 'es' : ''}`)
//     .setDescription(
//       `${upcomingClasses.length} upcoming class${
//         upcomingClasses.length > 1 ? 'es' : ''
//       }${upcomingClassesMessage}`
//     )
//     .setColor(theme.colors.primary as HexColorString)

//   await channel.send({ embeds: [messageEmbed] })
// }
