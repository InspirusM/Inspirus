const PREFIX = require('../config.json').bot_prefix;
const fs = require("fs");
let xp = require('../../src/database/xp.json');
let balance = require('../../src/database/balance.json');
let cooldown = new Set();
let cdseconds = 5;

module.exports = async (client, message) => {
  
  // - - - - - - - - - - - 
  if (message.author.bot || !message.guild) return;

    let prefix = PREFIX.toLowerCase();
    let prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    prefixMention = prefix;
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix) || msg.startsWith(`${client.user.toString()} `)) return require('../handle/command')(client, message);
  
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
        message.channel.send(`Hi ${message.author}, my prefix is \`${prefix}\``);
    }
  
  // balance
  let balanceAdd = Math.floor(Math.random() * 1) + 1;
  //wajib biar ga undefined .json
  if(!balance[message.author.id]){
    balance[message.author.id] = {
      balance: 0
    };
  }

  //read json 
  let curbalance = balance[message.author.id].balance;
  //untuk perubahan database json nya
  balance[message.author.id].balance =  curbalance + balanceAdd;
  //untuk write fs json
  
  fs.writeFile("./src/database/balance.json", JSON.stringify(balance, null, 2), (err) => {
    cooldown.add(message.author.id);
    if (err) console.log(err)
  });
setTimeout(() => {
    cooldown.delete(message.author.id)
  }, 11000)
  
  
  //leveling
  let xpAdd = Math.floor(Math.random() * 1) + 1;  
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    
     message.channel.send(`\🆙 | ${message.author} You've leveled up to **\`${curlvl + 1}\`**`).then(m => m.delete(7000));
  }
  
  fs.writeFile("./src/database/xp.json", JSON.stringify(xp, null, 2), (err) => {
    if (err) console.log(err)
  });
}