import type { SelectMenuInteraction } from 'discord.js'
import { ConfigureCommandComponentID } from '../../commands/configure'

export async function selectMenuInteraction(interaction: SelectMenuInteraction) {
  if (
    interaction.customId === ConfigureCommandComponentID.notificationsChannelID
  ) {
    // TODO: Implement notifications
    await interaction.update({
      content: 'Notification is still in WIP',
      components: [],
    })
  }
}
