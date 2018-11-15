const getBotCatchPhrase = require('./getBotCatchPhrase')

module.exports = ( databaseLists, bot, userID, message, channelID ) => {
  if((databaseLists.adminList.includes(userID) || userID === databaseLists.owner) && message.split(" ")[0] === '!mod') {
    var messageArray = message.split(/\s*\b\s*/)

    if(!databaseLists.adminList.includes(messageArray[3])) {
      databaseLists.adminList.push(messageArray[3])
      bot.sendMessage({
        to: channelID,
        message: getBotCatchPhrase() + '<@'+messageArray[3]+'> you have been promoted to a moderator!'
      })
    } else {
      bot.sendMessage({
        to: channelID,
        message: 'User is already a moderator'
      })
    }
  } else if ((databaseLists.adminList.includes(userID) || userID === databaseLists.owner) && message.split(" ")[0] === '!unmod') {
    var messageArray = message.split(/\s*\b\s*/)

    if(databaseLists.adminList.includes(messageArray[3])){
      const index = databaseLists.adminList.indexOf(messageArray[3]);
      databaseLists.adminList.splice(index, 1);

      bot.sendMessage({
        to: channelID,
        message: getBotCatchPhrase() + ' <@'+messageArray[3]+'> has been demoted to a mortal peasant!'
      })
      console.log(databaseLists.adminList)
    }
  }
}
