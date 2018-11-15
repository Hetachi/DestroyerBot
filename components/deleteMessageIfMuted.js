module.exports = (databaseLists, bot, userID, channelID, messageID, event) => {
  const guildID = event.d.guild_id

  if(databaseLists.mutedPlayerList.includes(userID)) {

    bot.deleteMessage({
      channelID: channelID,
      messageID: messageID
    })
    bot.sendMessage({
      to: userID,
      message: "You are muted in "+ bot.servers[guildID].name +" discord chat!"
    })
  }

}
