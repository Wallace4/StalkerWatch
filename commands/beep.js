module.exports = {
    name: 'beep',
    description: 'beep!',
    run (client, message, args) {
        message.channel.send('Boop.');
    },
};
