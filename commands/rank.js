const snekfetch = require('snekfetch');
const Discord = require('discord.js');

module.exports = {
	name: 'rank',
	description: 'mostra il personaggio più giocato su Overwatch',
	usage: '<BattleTag>',
	args: true,
	async execute(message, args) {
		var person = args[0];
		const { body } = await snekfetch.get('https://ow-api.com/v1/stats/pc/ue/'+person+'/profile');
		if (body.error === 'The requested player was not found') {
			return message.channel.send(`Nessun risultato per **${args[0]}**`);
		}
		var level = (body.level < 10) ? '0'+body.level : body.level;
		if (level === '100')
			level = '00';
		message.channel.send('Nome: '+body.name+'\r\n'+
							 'Level: '+body.prestige+level+'\r\n'+
							 'Rank: '+body.ratingName+' '+body.rating);
    },
};
