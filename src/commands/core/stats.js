const { RichEmbed, version } = require('discord.js');
const fs = require('fs')

exports.run = async (client, message, args, color) => {
  
  let uptime = client.util.parseDur(client.uptime);
  let botVersion = require('../../../package.json').version;
  
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')

     var botGuilds = guildsEval.reduce((prev, val) => prev + val)
     var botChannels = channelsEval.reduce((prev, val) => prev + val)
     var botUsers = usersEval.reduce((prev, val) => prev + val)
     let m = await message.channel.send('*Please Wait...*');
     try {
  let embed = new RichEmbed() 
  .setColor(color) 
  .setDescription(`
**__General Stats:__**\`\`\`
Shard    :: #[${client.shard.id}/${client.shard.count}]
Guilds   :: ${botGuilds}
Channels :: ${botChannels}
Users    :: ${botUsers}\`\`\`
**__Bot Stats__:**\`\`\`
Uptime         :: ${uptime} 
Mem usage      :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
Ws ping        :: ${client.ping.toFixed(2)}ms
${client.user.username}    :: v${botVersion}
Commands       :: ${client.commands.size} 
Discord.js     :: v${version}
Node.js        :: ${process.version}\`\`\`
`).setTimestamp() 
  .setFooter(`Request by: ${message.author.tag}`, client.user.displayAvatarURL)
 return message.channel.send(embed).then(() => { m.delete();});
} catch (err) {
 return message.channel.send(err.stack, { code: 'ini' });
}
} 

exports.conf = {
  aliases: ['about', 'botinfo'], 
  cooldown: "" 
} 
exports.help = {
  name: "stats", 
  description: "Show bot statistic", 
  usage: "stats" 
} 