let xp = require('../../database/xp');
let bal = require('../../database/balance');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {
  
  if(!args[0]) {
    let misEmbed = new RichEmbed() 
    .setColor(color) 
    .setDescription(`
**Proper usage:**

\`${prefix}leaderboard balance\` - **Returns the balance leaderboard**
\`${prefix}leaderboard level\` - **Returns the level leaderboard**
`) 
    .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`)
    message.channel.send(misEmbed);
  } 
  
  if(args[0] === 'level') {
  let board = [];
  for(let key of Object.keys(xp)){
    let value = Object.assign({user: client.users.get(key)}, xp[key]);
    board.push(value);
  }
  
  board = board.filter(x => x.user);
  board = board.sort((a,b) => b.xp-a.xp).splice(0, 10);
  top = board.map((x, i) => `[${i+1}]  ➢ #${x.user.username}\n     Level: ${x.level.toLocaleString()} XP: ${x.xp.toLocaleString()}`).join('\n\n');
  let embed = new RichEmbed() 
  .setColor(color) 
  .setDescription(`**🆙 | Top 10 Global XP\n\n**\`\`\`📋 Rank | Name\n\n${top}\`\`\``);
  
  return message.channel.send(embed);
 }
 
  if(args[0] === 'balance') {
      let board = [];
  for(let key of Object.keys(bal)){
    let value = Object.assign({user: client.users.get(key)}, bal[key]);
    board.push(value);
  }
  
  board = board.filter(x => x.user);
  board = board.sort((a,b) => b.balance-a.balance).splice(0, 10);
  top = board.map((x, i) => `[${i+1}]  ➢ #${x.user.username}\n     Balance: ${x.balance.toLocaleString()}`).join('\n\n');
  let embed = new RichEmbed() 
  .setColor(color) 
  .setDescription(`**💴 | Top 10 Global Rich User\n\n**\`\`\`📋 Rank | Name\n\n${top}\`\`\``);
  
  return message.channel.send(embed);
    
  }
  
  
} 

exports.conf = {
    aliases: ['lb'],
    cooldown: "5"
}

exports.help = {
    name: "leaderboard",
    description: "See the top 10 highest user",
    usage: "leaderboard"
}