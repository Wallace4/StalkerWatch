module.exports = {
    name: 'kick',
    description: 'kicka qualcuno dal server',
    usage: '<user>',
    guildOnly: true,
    run (client, message, args) {
      const guild = message.guild;
      const member = message.member;
      const taggedUser = guild.member(message.mentions.users.first());
      if (!message.mentions.users.size) {
        return message.reply('Devi dirmi chi devo kickare ragazzo');
      }

      if (!member.permissions.has('KICK_MEMBERS'))
      {
        message.channel.send('EH VOLLLEVI, non sei nessuno. Accetta il tuo ruolo di Pleb e rivolgiti ad uno dei tuoi Dei o alle Bambinaie u.u');
      } else if (!taggedUser.kickable)
      {
        message.reply('Stai provando a toccare un intoccabile, vai via prima che sia troppo tardi');
      } 
      message.channel.send(`You wanted to kick: ${taggedUser.user.username}`);
    },
};
