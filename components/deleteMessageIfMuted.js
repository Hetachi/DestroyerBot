module.exports = (databaseLists, bot, userID, channelID, messageID) => {
  if(databaseLists.mutedPlayerList.includes(userID)) {
    bot.deleteMessage({
      channelID: channelID,
      messageID: messageID
    })
    bot.sendMessage({
      to: userID,
      message: "You are muted in Exile.lv discord chat!"
    })
  }
}
