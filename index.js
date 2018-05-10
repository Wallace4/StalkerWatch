const fs = require('fs');
//questo serve tipo include per chiedere la libreria
const Discord = require('discord.js');
//include la libreria config dove sono tutte le variabili costanti
//const config = require('./config.json');
//const { prefix, token } = require('./config.json');
//questo crea un nuovo oggetto discord client
const client = new Discord.Client();

client.config = require("./config.js");

client.commands = new Discord.Collection();
//ti restituisce una lista con i nomi dei file nella cartella
const commandFiles = fs.readdirSync('./commands'); 

for (const file of commandFiles) { //ti mette in loop gli include in pratica
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//fa l'echo dal canale alla console
client.on('message', message => {
	
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return; // se sei un bot o se non inizi con ! muori
	
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;
	
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	
});

//roba che si triggera quando il bot si avvia
client.on('ready', () => {
    console.log('Ready!');
});

//fa il login al bot con il token
client.login(client.config.token);
