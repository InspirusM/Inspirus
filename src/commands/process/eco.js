const fs = require('fs');
let bal = require('../../database/balance.json');
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args, color) => {
  
  owners_id.forEach(async function(owner){
    if(message.author.id !== owner) return;
  
  
  var user = message.mentions.users.first() || client.users.get(args[1]);
  if(!user) return message.channel.send(`**${message.author.username}**, Please mention the user or use the user id to set.`);
    
  if(!bal[user.id]){
    bal[user.id] = {
      balance: 0
    };
  }
    
    var money = parseInt(args[2]);
    
  if(args[0] === 'bal' || args[0] === 'balance'){
    if(!money) return message.channel.send(`**${message.author.username}**, Please enter the amount to set.`);
  if(isNaN(money)) return message.channel.send(`**${message.author.username}**, Please enter a valid number!`);
    let curBal = bal[user.id].balance;
    bal[user.id].balance = money;
    fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2),(err) => {
      message.channel.send(`Balance for **${user.username}** has been set to 💴 **${money}** \`😃\`!`);
      if(err) console.log(err);
    });
  }
 
  });
}

exports.conf = {
    aliases: ['seteco'],
    cooldown: ""
}

exports.help = {
    name: "eco",
    description: "Set the user economy",
    usage: "eco <key> <@user> <args>"
}
