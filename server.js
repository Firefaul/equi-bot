﻿const Discord = require('discord.js');
const Roblox = require('roblox-js');
const client = new Discord.Client();

const groupId = 4271865;

Roblox.login({username: "EquinauticalBot", password: process.env.PASSWORD})

const day = 86400000;

client.on('ready', () => {
    console.log('Logged in as equinautical bot');
});

client.on('message', async message => {
  // If the message is "ping"
  if (message.channel.name === 'member-approval') {
	await message.react('👍');
	await message.react('👎');
	var reacts = message.reactions;
	var ups = 0;
	var downs = 0;
	var username = message.content.substring(0,message.content.indexOf("wants to") - 1);
	Roblox.message(Roblox.getIdFromUsername(username), 'Equinautical Notice', 'Your test is being reviewd and you will be notified in 24 hours of your results.')
	const reactions = message.awaitReactions(reaction => {
		if (reaction.emoji.name === '👍') {
			ups = reaction.count
		};
		if (reaction.emoji.name === '👎') {
			downs = reaction.count
		};
	}, day);
	setTimeout(function(){
		if (ups > downs){
			console.log('approved');
			Roblox.handleJoinRequest(groupId, username, true);
			Roblox.message(Roblox.getIdFromUsername(username), 'Equinautical Notice', 'You have been accepted into Equinautical.')
		};
		if (ups < downs){
			console.log('denied');
			Roblox.handleJoinRequest(groupId, username, false);
			Roblox.message(Roblox.getIdFromUsername(username), 'Equinautical Notice', 'You have not been accepted into Equinautical.')
		};
		if (ups === downs){
			console.log('approved');
			Roblox.handleJoinRequest(groupId, username, false);
			Roblox.message(Roblox.getIdFromUsername(username), 'Equinautical Notice', 'You have not been accepted into Equinautical.')
		};
	}, day);
  };
  if (message.channel.name === 'polls') {
	await message.react('👍');
	await message.react('👎');
  };
if (message.channel.name === 'refresher') {
	setInterval(() => {
  		message.channel.send("Refreshed")
	}, 280000);
};
});



client.login(process.env.BOT_TOKEN);

