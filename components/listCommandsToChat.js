module.exports = ( databaseLists, bot, channelID, message, messageID, userID ) => {
  if(databaseLists.adminList.includes(userID) && message.split(" ")[0] === '!actions') {
    bot.deleteMessage({
      channelID: channelID,
      messageID: messageID
    })
    bot.sendMessage({
      to: channelID,
      message: '-------------- Destroyer Commands --------------\n !mute - Mutes a player\n !unmute - Unmutes a player\n !mod - Promotes a user to moderator\n !unmod - Demotes a user from moderator\n !actions - Displays all the commands Destroyer can obey.'
    })
  }
}
