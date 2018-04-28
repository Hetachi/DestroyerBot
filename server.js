
var Discord = require('discord.io');


var bot = new Discord.Client({
    token: "",
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

var allowedChannel = "431461850836893696"
var playerDB = []

//utils
function checkPlayerInDB(userID) {
  return playerDB.find(function(player){return player.userID === userID})
}

function sendPlayerStats(userID){
  playerDB.map( function(item) {
    if(item.userID === userID) {
      var playerStats = "``` =========== Character Stats ===========\n Health: "+item.stats.health+"\n Level: "+item.stats.level+"\n XP: "+item.stats.xp+"/"+item.stats.level*1000+"\n Attack: "+item.stats.attack+"\n Defense: "+item.stats.defense+"\n Money: "+item.stats.money+"\n Kills: "+item.stats.kills+"\n Deaths: "+item.stats.deaths+"```"
      botSendPrivateMessage(playerStats, userID)
    }
  })
}

function attemptGainXpAndMoney(userID) {
  if(Math.floor((Math.random() * 3) + 1) === 1){

    playerDB.map(function(player){

      if(userID === player.userID) {

        var xpGained = Math.floor((Math.random() * 500) + 1)
        var moneyGained = Math.floor((Math.random() * 50) + 1)

        player.stats.xp = player.stats.xp + xpGained

        if(player.stats.xp >= 1000*player.stats.level) {
          var xpLeftOver = player.stats.xp - 1000*player.stats.level
          player.stats.xp = xpLeftOver
          player.stats.level++
          player.stats.health = 10*player.stats.level
          botSendPrivateMessage('Congratulations you have leveled up! Your level is: '+player.stats.level, userID)
        }

        player.stats.money = player.stats.money + moneyGained

        console.log("------------------------------------\nplayer.userID: "+player.userID+"\n\n userID: "+userID+"\n-------\n"+player.stats+"\n\n\n\n" )
      }

    })

  }
}
//utils

function botSendMessage(message) {
  bot.sendMessage({
    to: allowedChannel,
    message: message
  })
}

function botSendPrivateMessage(message, userID) {
  bot.sendMessage({
    to: userID,
    message: message
  })
}

function botDeleteMessage(messageID) {
  bot.deleteMessage({
    channelID: allowedChannel,
    messageID: messageID
  })
}

bot.on('message', function(user, userID, channelID, message, event) {
    if(checkPlayerInDB(userID)){attemptGainXpAndMoney(userID)}

    if (allowedChannel === channelID && message === '!register') {
      if(checkPlayerInDB(userID)){
        botSendMessage("You already have an account!")
        sendPlayerStats(userID)
      }else {
      botSendMessage("Player registered!")
      playerDB.push({userID, user, stats: {
        health: 10,
        xp: 0,
        level: 1,
        money: 0,
        attack: 0,
        defense: 0,
        kills: 0,
        deaths: 0,
      }})
      console.log(playerDB)
      }
    }

    if(allowedChannel === channelID && message === '!mystats') {
      sendPlayerStats(userID)
    }

    if(allowedChannel === channelID && message === '!topMoney'){
      var sortedPlayers = playerDB.sort(function (a, b) {
        return a.stats.money - b.stats.money;
      })

      sortedPlayers.slice(0,5)
      sortedPlayers.reverse()

      var topPlayerString = '```---- Player Money Top ----\n'
      sortedPlayers.map(function(player, index){
        index++
        topPlayerString = topPlayerString + '\n '+index+': '+player.user+' - '+player.stats.money+'$'
      })
      topPlayerString = topPlayerString+'\n----------------```'
      botSendMessage(topPlayerString)
    }

    if(allowedChannel === channelID && message === '!topLevel'){
      var sortedPlayers = playerDB.sort(function (a, b) {
        return a.stats.level - b.stats.level;
      })

      sortedPlayers.slice(0,5)
      sortedPlayers.reverse()

      var topPlayerString = '```---- Player Level Top ----\n'
      sortedPlayers.map(function(player, index){
        index++
        topPlayerString = topPlayerString + '\n '+index+': '+player.user+' - '+player.stats.level
      })
      topPlayerString = topPlayerString+'\n----------------```'
      botSendMessage(topPlayerString)
    }
});
