const config = require("../config.js");

module.exports = {
	name: 'help',
	description: 'Mostra la lista comandi',
	aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
	execute(message, args) {
		
		const { commands } = message.client;
		const data = [];
		
		if (!args.length) {
			data.push('scopri tutti i miei segreti, ma un cucchiaino di affari tuoi no eh?');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPuoi mandarmi \`${config.prefix}help [command name]\` per avere info su uno specifico comando!`);
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('that\'s not a valid command!');
			}
			
			const command = commands.get(args[0]);
			
			data.push(`**Name:** ${command.name}`);
			
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);
			
			data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		}
		
		message.author.send(data, { split: true })
		.then(() => {
			if (message.channel.type !== 'dm') {
				message.channel.send('Ti ho mandato un messaggio privato con tutte le informazioni');
			}
		})
		.catch(() => message.reply('Mumble, non posso contattarti in privato a quanto pare.'));
    },
};
