module.exports = {
    name: 'add',
    description: 'Inserisce il tuo nominativo all\'interno dell\' db',
    usage: '<User> <BattleTag> <Region> <Platform>',
    aliases: ['insert'],
    async run (client, message, [mention, battletag, region, platform]) {
      let db = new client.sqlite3.Database('./battletag.db', (err) => {
          if (err)
              return client.logger.error(err.message);
          client.logger.log("Connected to the battletag SQlite database.");
      });

      if (message.mentions.members.size === 0)
          return message.reply("Perfavore menziona un utente del server!");

      let member = message.mentions.members.first();
      
      if (member.id != message.member.id && !message.member.roles.has(client.config.db_master_id)) 
        return message.reply("Non puoi modificare i dati altrui plebreo! Solo un moderatore ha questo potere");
    
      if (battletag == undefined)
        return message.reply("Non è stato inserito il Battletag!");
      
      if (region == undefined)
        return message.reply("Non è stato inserito la regione!");
      
      if (platform == undefined)
        return message.reply("Non è stata inserito la piattaforma!");
      
      db.get("SELECT * FROM battletags WHERE user_id = ?", member.id, (err, row) => {
        if (err) return client.logger.error(err.message);
        
        if (row != undefined) {
            client.logger.log(row.battletag + row.region + row.platform + "returned for " + row.user_id);
        }

        db.run(`UPDATE battletags SET battletag = ?, region = ?, platform = ? WHERE user_id = ${member.id}`, battletag, region, platform, function (err) {
            client.logger.log("Row(s) updated " + this.changes);
          
            if (this.changes === 0) {
                db.run("INSERT INTO battletags (user_id, region, platform, battletag) VALUES (?, ?, ?, ?)", [member.id, region, platform, battletag]);
                message.channel.send(member + "è stato aggiunto correttamente al db");
                client.logger.log("Inserted 1 battletag for user_id: " + member.id);
                return;
            }
            else {
                message.channel.send("Aggiornato il battletag di " + member);
            }
        });
      });
    
    
      db.close((err) => {
          if (err)
              return client.logger.error(err.message);
          client.logger.log("Closed the battletag database connection.");
      });
    
    },
};
