import 'dotenv/config'

/** Bot configurations */
export const bot = {
  token: process.env.TOKEN as string,
  clientID: process.env.CLIENT_ID as string,
  prefix: process.env.PREFIX as string,
  notificationChannelID: '',
  setNotificationChannelID: (id: string) => {
    bot.notificationChannelID = id
  },
}

/** Auth configurations */
export const auth = {
  bearerToken: process.env.BINUS_BEARER_TOKEN as string,
}

/** Binus constants */
export const binus = {
  restScheduleURL: 'https://func-bm7-schedule-prod.azurewebsites.net/api',
  restCourseURL: 'https://apim-bm7-prod.azure-api.net/func-bm7-course-prod',
  newBinusMayaURL: 'https://newbinusmaya.binus.ac.id',
  oldBinusMayaURL: 'https://binusmaya.binus.ac.id',
}

export default { bot, auth, binus }
