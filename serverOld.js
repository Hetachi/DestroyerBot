
var Discord = require('discord.io');

var bot = new Discord.Client({
    token: "",
    autorun: true
});

var allowedChannel = "431461850836893696"
var botID = "431493320397815808"

var authorizedUsers = ['162628772271489024']
var pendingAuthorization = []
var authLocked = false
const allowedUserAndChannel = function(channelID, userID) { return channelID === allowedChannel && userID != botID}

var game = {
  owner: '',
  state: {
    started: false,
    level: 0,
  }
}

var gameLevels = [
  {
    situation: 'You have started your journing choose which way you wish to go.',
    answers: ['North','South','East','West']
  },
]

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

function listLevelOptions(gameLevel){
  botSendMessage('Your possible options are:')
  gameLevel.answers.map(function(option){
    botSendMessage(option)
  })
}

function botSendMessage(message) {
  bot.sendMessage({
    to: allowedChannel,
    message: message
  })
}

function botDeleteMessage(messageID) {
  bot.deleteMessage({
    channelID: allowedChannel,
    messageID: messageID
  })
}

function botSendPrivateMessage(userID, message){
  bot.sendMessage({
    to: userID,
    message: message
  })
}

bot.on('message', function(user, userID, channelID, message, event){
  allowedUserAndChannel(channelID, userID) && !authorizedUsers.includes(userID) && botDeleteMessage(event.d.id)
});

/// AUTH BLOCK
bot.on('message', function(user, userID, channelID, message, event) {
  if(allowedUserAndChannel(channelID, userID) && authLocked) {
  }else if (allowedUserAndChannel(channelID, userID) && message === '!auth') {

      var isAuthorized = authorizedUsers.includes(userID)

      if(isAuthorized) {
        botSendMessage("Yo Boss you already in the authorized list!")
      }else {
        !pendingAuthorization.includes(userID) && pendingAuthorization.push(userID)
        botSendMessage("Gotcha! Adding <@"+userID+"> to the list, you will need to be approved by authorized user tho.")
      }

    }
});

bot.on('message', function(user, userID, channelID, message, event) {
  if(allowedUserAndChannel(channelID, userID) && authLocked) {
  }else if (allowedUserAndChannel(channelID, userID) && authorizedUsers.includes(userID) && message === '!pendingAuth') {

      if(pendingAuthorization.length > 0) {
        botSendMessage("The users who are pending authorization are (Approve with !approve userID):")
        pendingAuthorization.map(function(user) {
          botSendMessage("<@"+user+"> - `"+user+"`")
        })
      }else {
        botSendMessage("No users are waiting authorization!")
      }

    }
});

bot.on('message', function(user, userID, channelID, message, event) {
    if(allowedUserAndChannel(channelID, userID) && authLocked) {
    } else {

      var regVal = message.match(/\D+/g)
      if (channelID === allowedChannel && userID != botID && authorizedUsers.includes(userID) && regVal[0] === '!approve ') {

        var approvedUserId = message.replace(/\D+/g, '');

        if(!authorizedUsers.includes(approvedUserId) && pendingAuthorization.includes(approvedUserId)){
              authorizedUsers.push(approvedUserId)

        var index = pendingAuthorization.indexOf(approvedUserId)
          if(index > -1){
            pendingAuthorization.splice(index, 1)
        }

        botSendMessage("<@"+approvedUserId+"> has been added to authorized user list!")
          } else {
            botSendMessage("Something went wrong, I can't find the right userID, or the user is not in the pending authorization list.")
          }

      }

    }
});

bot.on('message', function(user, userID, channelID, message, event) {

    if (allowedUserAndChannel(channelID, userID) && authorizedUsers.includes(userID) && message === '!unauth') {

      botSendMessage("Cya! don't wanna be ya!")
      var index = authorizedUsers.indexOf(userID)
      authorizedUsers.splice(index, 1)
    }
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (allowedUserAndChannel(channelID, userID) && authorizedUsers.includes(userID) && message === '!lockauth') {
      authLocked = !authLocked;
      botSendMessage("Authlocked - "+authLocked)
    }
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (allowedUserAndChannel(channelID, userID) && authorizedUsers.includes(userID) && message === '!listCommands') {
      botSendPrivateMessage(userID,"Command list: \n```!auth - Ask for authorization. \n!unauth - Ask for de-authorization. \n!lockauth - Locks Authentication queue. \n!approve {userID} - Approve a user who is pending to be authorized. \n!pendingAuth - Check which members are pending authorization.```")
    }
});
// AUTH BLOCK END
