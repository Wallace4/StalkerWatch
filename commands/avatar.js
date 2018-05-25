module.exports = {
    name: 'avatar',
    description: 'ti fa vedere l\'avatar di chi menzioni, o di te, se lasci vuoto',
    usage: '<userList>',
    aliases: ['icon', 'pfp'],
    run (client, message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});
		message.channel.send(avatarList);
    },
};
