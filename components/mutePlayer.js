const getBotCatchPhrase = require('./getBotCatchPhrase')

module.exports = (databaseLists, bot, user, userID, channelID, message, messageID, event) => {
  if(databaseLists.adminList.includes(userID) && message.split(" ")[0] === '!mute') {
      var messageArray = message.split(/\s*\b\s*/)

      if(!databaseLists.mutedPlayerList.includes(messageArray[3]) && !databaseLists.adminList.includes(messageArray[3])) {
        databaseLists.mutedPlayerList.push(messageArray[3])
        bot.sendMessage({
          to: channelID,
          message: getBotCatchPhrase() + ' <@'+messageArray[3]+'> has been muted!'
        })
      }
  } else if (databaseLists.adminList.includes(userID) && message.split(" ")[0] === '!unmute') {
      var messageArray = message.split(/\s*\b\s*/)

      if(databaseLists.mutedPlayerList.includes(messageArray[3])){
        const index = databaseLists.mutedPlayerList.indexOf(messageArray[3]);
        databaseLists.mutedPlayerList.splice(index, 1);

        bot.sendMessage({
          to: channelID,
          message: getBotCatchPhrase() + ' <@'+messageArray[3]+'> has been unmuted!'
        })
        console.log(databaseLists.mutedPlayerList)
      }

  }
}
