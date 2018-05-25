if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const fs = require('fs');
const Discord = require('discord.js');
const http = require('http');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const client = new Discord.Client();
const app = express();

client.config = require("./config.js");
client.logger = require("./util/logger.js");
client.commands = new Discord.Collection();
client.sqlite3 = sqlite3;

/**
const commandFiles = fs.readdirSync('./commands'); 

for (const file of commandFiles) { //ti mette in loop gli include in pratica
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}**/

fs.readdir("./", (err, files) => {
    let init = false;
    if (err) return client.logger.error(err);
  
    files.forEach(file => {
      if (file == "battletag.db") init = true;
    });

    if (!init) {
      let db = new client.sqlite3.Database('./battletag.db', (err) => {
        if (err) return client.logger.error(err.message);
        client.logger.log("Connected to the battletag SQlite database.");

        db.run("CREATE TABLE IF NOT EXISTS battletags (user_id text PRIMARY KEY, region text, platform text, battletag text)", function (err) {
          if (err) return client.logger.error(err.message);
          client.logger.log("Creating the battletag table...");

          db.close((err) => {
            if (err) return client.logger.error(err.message);
            client.logger.log('Closed the battletag database connection.');
          });
        });
      });
    }
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
  
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      
      client.on(eventName, eventFunction.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
  
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
});

/**
client.on('message', message => {
	
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	
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
	
});**/

app.get("/", (request, response) => {
  
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
  
});

app.listen(process.env.PORT);

  setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  
}, 280000);

client.on('ready', () => {
    console.log('Ready!');
});

client.login(client.config.token);
