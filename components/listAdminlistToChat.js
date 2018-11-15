module.exports = ( databaseLists, bot, channelID, message, userID ) => {
  if(message.split(" ")[0] === '!mods' && databaseLists.adminList.includes(userID)) {
    var adminListMessage = "------------- Moderator list ------------- "
    databaseLists.adminList.map( user => {
      adminListMessage += '\n'
      adminListMessage += '<@'+user+'>,'
    })
    bot.sendMessage({
      to: channelID,
      message: adminListMessage
    })
  }
}
