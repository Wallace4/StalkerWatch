module.exports = {
    name: 'args-info',
    description: 'se gli dai degli argomenti te li restituisce. già',
    args: true,
    run (client, message, args) {
        message.channel.send(`Arguments: ${args}`);
    },
};
