module.exports = {
    name: 'kick',
    description: 'kicka qualcuno dal server',
    usage: '<user>',
    guildOnly: true,
    execute(message, args) {
		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.reply('Devi dirmi chi devo kickare ragazzo');
		}
		if (!taggedUser.bannable)
		{
			return message.reply('Stai provando a toccare un intoccabile, vai via prima che sia troppo tardi');
		}
		if (!message.author.permissions.has('KICK_MEMBERS'))
		{
			message.channel.send('EH VOLLLEVI, non sei nessuno. Accetta il tuo ruolo di Pleb e rivolgiti ad uno dei tuoi Dei o alle Bambinaie u.u');
		}
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};
