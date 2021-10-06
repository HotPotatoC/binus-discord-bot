import 'dotenv/config'

/** Bot configurations */
export const bot = {
  token: process.env.TOKEN as string,
  guildID: process.env.GUILD_ID as string,
  clientID: process.env.CLIENT_ID as string,
  prefix: process.env.PREFIX as string,
}

/** Auth configurations */
export const auth = {
  bearerToken: process.env.BINUS_BEARER_TOKEN as string,
}

/** Binus constants */
export const binus = {
  restScheduleURL: 'https://func-bm7-schedule-prod.azurewebsites.net/api',
  restCourseURL: 'https://apim-bm7-prod.azure-api.net/func-bm7-course-prod',
  binusMayaURL: 'https://newbinusmaya.binus.ac.id',
}

export default { bot, auth, binus }
