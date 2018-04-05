var Discord = require('discord.io');

var bot = new Discord.Client({
    token: "NDE5MjgxMTY1MzI1Njk3MDQ0.DXt1kg.EevC2AWwT1_i7Uv9tlaMUI54GM8",
    autorun: true
});

var messages = []
var members = []

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message) {
		console.log(user + ": " + message)
    }
});

bot.on('message', function(user, userID, channelID, message, event){
	if(message === "!help") {
		bot.sendMessage({
			to: channelID,
			message: "Commands: \n\n !sub - You will be notified about any deleted messages. \n !unsub - You will be removed from the list where you get notified about any messages \n\n End of transmission..."
		})
	}
	if(message === "!sub"){
		bot.sendMessage({
			to: channelID,
			message: "Gotcha Boss!"
		})
		members.push({'userID': userID})
	}
	if(message === "!unsub"){
		bot.sendMessage({
			to: channelID,
			message: "Done, removed ya from the list!"
		})
		members.map(function(member, index) {
			if(member.userID === userID) {
				members.splice(index, 1)
			}
		})
	}
})

bot.on('any', function(event) {
	if(event && event.t === "MESSAGE_DELETE") {
		messages.map( function(message) {
			if(message.id === event.d.id) {
				console.log( '------------- DELTETED MESSAGE -----------')
				console.log(message.message)
				console.log(message.attachment)
				console.log(' ------------------------------------------')
				members.map(function(member){
					bot.sendMessage({
							to: member.userID,
							message: 'Message was deleted on Exile.lv: \n ```User who deleted the message: '+ event.d.id + '\n Original message author: '+ message.author + '\n Message: ' + message.message+'```'
					})
				})
			}
		})
	}
	
	if(event && event.t === "MESSAGE_CREATE") {
		if(event.d.content != "!list_messages" && event.d.content != "!list" && event.d.content != "!subscribe" && event.d.content != "!unsubscribe" && event.d.content != "!help")
		messages.push({'id': event.d.id, 'author': event.d.author.username , 'message': event.d.content, 'attachment': event.d.attachments})
	}
	
	if(messages.length > 1001) {
		messages.shift()
	}
});

bot.on('message', function(user, userID, channelID, message, event){
	if(message === "!list_messages") {
		var listOfMessages = messages.map(function(item){
			return bot.sendMessage({
				to: userID,
				message: "--------\n Username: "+ item.user +"\n Message: " + item.message + "\n Attachments: "+ item.attachment+"\n --------\n"
			})
		});

	}
});

bot.on('any', function(event){
	if(event.t === "TYPING_START") {

	}
})
