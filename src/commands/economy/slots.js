const fs = require('fs');
let bal = require('../../database/balance.json');

exports.run = async (client, message, args, color) => {
  
  if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  } 
  
  let slots = ['🍇', '🍐', '🍒', '🍋', '🍊', '🥑', '🍉']
  const { shuffle } = client.util  
  let amount = (args[0]);
  
    if (!amount) amount = 1;
    if (isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (amount > 500) amount = 500;
  
      let random = Math.floor(Math.random() * 500);
    if(bal[message.author.id].balance < amount) return message.channel.send(`**${message.author.username}**, You not have insufficient balance yet, Keep active and don't forget to take your daily everyday!`);
  
      const arr1 = shuffle(slots);
      const arr2 = shuffle(slots);
      const arr3 = shuffle(slots);
      const thisMes = await message.channel.send(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
`);

    for(let i = 0; i < 5; i++){
  	arr1.push(arr1.shift());
	  arr2.push(arr2.shift());
   	arr3.push(arr3.shift());
    
    await setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[0]} : ${arr2[1]} : ${arr3[0]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
	`), 1000)
    
  setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[1]} : ${arr3[2]}

${arr1[0]} : ${arr2[1]} : ${arr3[2]} **«**

${arr1[2]} : ${arr2[0]} : ${arr3[1]}
**-----------------**
	`), 1500);
    
	  if(arr1[1] === arr2[1] && arr1[1] === arr3[1] || arr1[2] === arr2[0] && arr1[0] === arr3[2] || arr1[2] === arr2[2] && arr1[0] === arr3[0] || arr1[0] === arr2[2] === arr1[2] && arr3[0] || arr1[2] && arr2[0] === arr1[2] === arr3[2]) {
       let curBal = bal[message.author.id].balance;
      bal[message.author.id].balance = curBal + random;
      fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        if(err) console.log(err);
      });
    return setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
| : : : **WIN** : : : |

**${message.author.username}** used **¥ ${amount}** and won **${random}**
	`), 2500);
  }
      let curbal = bal[message.author.id].balance;
      bal[message.author.id].balance = curbal - amount;
      fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        if(err) console.log(err);
      });
    
	    return setTimeout(() => thisMes.edit(`
**[ 🎰 | SLOTS ]**
**-----------------**
${arr1[2]} : ${arr2[0]} : ${arr3[2]}

${arr1[1]} : ${arr2[1]} : ${arr3[1]} **«**

${arr1[0]} : ${arr2[2]} : ${arr3[0]}
**-----------------**
| : : : **LOST** : : : |

**${message.author.username}** used ¥ **${amount}** and lost everything.
	`),2500)
  }

}

exports.conf = {
    aliases: ['slot'],
    cooldown: "12"
}

exports.help = {
    name: "slots",
    description: "Play the slot machine",
    usage: "slots [amount]"
}