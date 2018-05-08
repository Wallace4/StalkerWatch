module.exports = {
    name: 'server',
    description: 'mostra nome del server in cui ti trovi',
    execute(message, args) {
		message.channel.send('rip awareness, tranquillo ci sono io a guidarti\r\n');
        message.channel.send(`Questo server è ${message.guild.name} e voi siete i Plebs`);
    },
};
