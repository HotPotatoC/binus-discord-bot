import type { ColorResolvable } from 'discord.js'

export type Theme = {
  colors: {
    [key: string]: ColorResolvable
  }
}

export const theme: Theme = {
  colors: {
    primary: '#1631A4',
    warning: '#EAC435',
    danger: '#FB3640',
    success: '#0CCE6B',
  },
}

export default theme
