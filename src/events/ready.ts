import type { Client } from 'discord.js'

export default function () {
  return (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Connected to ${client.guilds.cache.size} guilds!`)
  }
}
