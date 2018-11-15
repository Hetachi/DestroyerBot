const deleteInviteLinks = require('./components/deleteInviteLinks')
const mutePlayer = require('./components/mutePlayer')
const listMutedPlayers = require('./components/listMutedPlayers')
const deleteMessageIfMuted = require('./components/deleteMessageIfMuted')
const addModerator = require('./components/addModerator')
const listCommandsToChat = require('./components/listCommandsToChat')
const listAdminlistToChat = require('./components/listAdminlistToChat')
const token = require('./components/config/botToken')

var Discord = require('discord.io');
var bot = new Discord.Client({
    token,
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
let databaseLists = {
  owner: '162628772271489024',
  adminList: ['162628772271489024'],
  mutedPlayerList: []
}
var allowedChannel = "431461850836893696"
var urlCheckRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

bot.on('message', function(user, userID, channelID, message, event) {
    const messageID = event.d.id;

    deleteInviteLinks( urlCheckRegEx, databaseLists, bot, user, userID, channelID, message, messageID, event)

    mutePlayer( databaseLists, bot, user, userID, channelID, message, messageID, event)

    listMutedPlayers( databaseLists, bot, userID, channelID, message)

    deleteMessageIfMuted( databaseLists, bot, userID, channelID, messageID)

    addModerator( databaseLists, bot, userID, message, channelID)

    listCommandsToChat( databaseLists, bot, channelID, message, messageID, userID )

    listAdminlistToChat( databaseLists, bot, channelID, message, userID )

});
