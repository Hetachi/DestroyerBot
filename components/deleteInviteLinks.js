module.exports = ( urlCheckRegEx, databaseLists, bot, user, userID, channelID, message, messageID, event) => {
  const messageCheckedForInviteLink = urlCheckRegEx.exec(message);

  if (message.includes('discord') && messageCheckedForInviteLink) {

    console.log("Detected discord invite link, deleting it...")
    bot.deleteMessage({
      channelID: channelID,
      messageID: messageID
    })
    bot.sendMessage({
      to: userID,
      message: "Please do not advertise other discord channels in our discord group!"
    })
  }
}
