module.exports = (databaseLists, bot, userID, channelID, message) => {

  if(message === '!mutedList' && databaseLists.adminList.includes(userID) && databaseLists.mutedPlayerList.length > 0) {
    var mutedListMessage = "------------- Muted player list ------------- "
    databaseLists.mutedPlayerList.map( user => {
      mutedListMessage += '\n'
      mutedListMessage += '<@'+user+'>,'
    })
    bot.sendMessage({
      to: channelID,
      message: mutedListMessage
    })
  }

}
