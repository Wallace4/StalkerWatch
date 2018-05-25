const snekfetch = require('snekfetch');
const Discord = require('discord.js');

module.exports = {
	name: 'rank',
	description: 'mostra il personaggio più giocato su Overwatch',
	usage: '<BattleTag>',
	args: true,
	async run(client, message, args) {
    
    let db = new client.sqlite3.Database('./battletag.db', (err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Connected to the battletag SQlite database.");
    });
  
    if (message.mentions.members.size === 0)
        return message.reply("Perfavore menziona un utente del server!");

    let member = message.mentions.members.first(); 
    
    db.get ("SELECT * FROM battletags where user_id = ?", member.id, async (err, row) => {
    
      if (err)
        return client.logger.error(err.message);
      
      if (row == undefined) {
        return message.channel.send("il tuo nominativo non risulta nel server, per favore contatta un moderatore per farti aggiungere");
      }
      
      const { body } = await snekfetch.get('https://ow-api.com/v1/stats/'+row.platform+'/'+row.region+'/'+row.battletag+'/profile');
      if (body.error === 'The requested player was not found') {
        return message.channel.send(`Nessun risultato per **${args[0]}**`);
      }
      var level = (body.level < 10) ? '0'+body.level : body.level;
      if (level === '100')
        level = '00';
      message.channel.send('Nome: '+body.name+'\r\n'+
                 'Level: '+body.prestige+level+'\r\n'+
                 'Rank: '+body.ratingName+' '+body.rating);
    });
    
    db.close((err) => {
        if (err)
            return client.logger.error(err.message);
        client.logger.log("Closed the battletag database connection.");
    });
            
    },
};
