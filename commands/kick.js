module.exports = {
    name: 'kick',
    description: 'kicka qualcuno dal server',
    usage: '<user>',
    guildOnly: true,
    execute(message, args) {
    const guild = message.channel.guild;
    const member = guild.member(message.author);
		const taggedUser = guild.member(message.mentions.users.first());
		if (!message.mentions.users.size) {
			return message.reply('Devi dirmi chi devo kickare ragazzo');
		}
    message.channel.send(`${taggedUser.kickable}`); 
    if (!member.permissions.has('KICK_MEMBERS'))
		{
      message.channel.send('EH VOLLLEVI, non sei nessuno. Accetta il tuo ruolo di Pleb e rivolgiti ad uno dei tuoi Dei o alle Bambinaie u.u');
		}
		if (!taggedUser.kickable)
		{
			message.reply('Stai provando a toccare un intoccabile, vai via prima che sia troppo tardi');
		} 
		message.channel.send(`You wanted to kick: ${taggedUser.user.username}`);
    },
};
