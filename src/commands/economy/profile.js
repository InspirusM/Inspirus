const { Canvas } = require('canvas-constructor');
const Discord = require('discord.js');
const { get } = require('node-superfetch');

let lepel = require('../../database/xp.json');
let coin = require('../../database/balance.json');
//let bg1 = require('../../database/badge.json');

exports.run = async (client, message, args, color) => {
  
  //if(message.author.id !== '444454206800396309') return message.channel.send('Profile command is currently in maintenance for fix blur 🙃, try again later!!');
  
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(`**${message.author.username}**, Bot not have a profile!`);
  
  
  if(!coin[user.id]){
    coin[user.id] = {
      balance: 0
    };
  }
  if(!lepel[user.id]){
    lepel[user.id] = {
      xp: 0,
      level: 1
    };
  }
  
  let xp = lepel[user.id].xp;
  let uLevel = lepel[user.id].level;
  let balance = coin[user.id].balance;
  let background = '';
  
 /* ini misal kek uang 1000 jadi 1k */
 var ccm = `${balance}`;
  if (ccm.length > 3) {
      var cc = ccm.length > 3 ? ccm.substring(0,1  ) + 'k' : ccm; 
  } else {
     var cc = ccm 
  } 
  
  if (ccm.length > 4) var cc = ccm.length > 4 ? ccm.substring(0,2  ) + 'k' : ccm;
  if (ccm.length > 5) var cc = ccm.length > 5 ? ccm.substring(0,3  ) + 'k' : ccm;
    
  if (ccm.length > 6) var cc = ccm.length > 6 ? ccm.substring(0,1  ) + 'm' : ccm;
  if (ccm.length > 7) var cc = ccm.length > 7 ? ccm.substring(0,2  ) + 'm' : ccm;
  if (ccm.length > 8) var cc = ccm.length > 8 ? ccm.substring(0,3  ) + 'm' : ccm;
    
  if (ccm.length > 9) var cc = ccm.length > 9 ? ccm.substring(0,1  ) + 'b' : ccm;
  if (ccm.length > 10) var cc = ccm.length > 10 ? ccm.substring(0,2  ) + 'b' : ccm;
  if (ccm.length > 11) var cc = ccm.length > 11 ? ccm.substring(0,3  ) + 'b' : ccm;
    
  if (ccm.length > 12) var cc = ccm.length > 12 ? ccm.substring(0,1  ) + 't' : ccm;    
  if (ccm.length > 13) var cc = ccm.length > 13 ? ccm.substring(0,2  ) + 't' : ccm;    
  if (ccm.length > 14) var cc = ccm.length > 14 ? ccm.substring(0,3  ) + 't' : ccm;
  
/* ini kalo fish 1000 jadi 1k */
  var ttm = `${fish}`
  if (ttm.length > 3) {
    var tt = ttm.length > 3 ? ttm.substring(0,1 ) + 'k' : ttm;
  } else {
    var tt = ttm;
  } 
  if (ttm.length > 4) var tt = ttm.length > 4 ? ttm.substring(0,2  ) + 'k' : ttm;
  if (ttm.length > 5) var tt = ttm.length > 5 ? ttm.substring(0,3  ) + 'k' : ttm;
  
  /* Create Canvas function */
    try {
      
  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = user.username;
    var jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
    var {body: avatar} = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size128"));
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/492914262482878485/493210917488558111/1537660968355.png');
    var {body: dIcon} = await get('https://orig00.deviantart.net/2133/f/2016/200/f/a/discord_token_icon_dark_by_flexo013-daaj71i.png')
    var {body: FiSh} = await get('https://twemoji.maxcdn.com/2/72x72/1f3a3.png')
    var {body: cIcon} = await get('https://cdn.discordapp.com/attachments/492914262482878485/494027120557817866/chat-message-text-bubble-chatbubble-comment-speech-6-14759.png');
/*  var {body: badge1} = await get('https://cdn.discordapp.com/attachments/492914262482878485/492914296330780672/IMG_20180922_122436.png');
    var {body: badge2} = await get('https://cdn.discordapp.com/attachments/492914262482878485/492943084338806795/Watermark2_zpsbb9014ca.png');
    var {body: blank1} = await get(blank);
*/
  return new Canvas(600, 600)
    .setColor('#000000')
    .addImage(background1, 0,0,600,600)
    .addBeveledImage(background2, 0,0,600,600)
    .addImage(dIcon, 190,250,55,55)
    .addImage(FiSh, 530,370,40,40)
/*  .addImage(badge1,23, 215,20,20)
    .addImage(badge2, 43,215,22,22)
    .addImage(blank1, 0,0,300,300)
*/  .setTextFont('30px Kids') 
    .addText(`Name: ${jadim}`, 250, 285)
    .setTextFont('30px Impact')
    .addText('|', 280,380)
    .addText('|', 280,400)
    .addText('|', 280,420)
    .addText('|', 280,450)
    .addText('|', 280,470)
    .addText('|', 280,495)
    .addText('__   ___', 495,420) 
    .addText('_______', 495,470) 
    .addText('_______________________', 150,500)
    .setTextFont('bold 28px Courier New')
    .addImage(cIcon, 300,355,40,40)
    .setTextFont('bold 30px Courier New')
    .addText('Level', 172,390)
    .setTextFont('bold 30px Courier New') 
    .addText('Total XP', 160, 540)
    .addText('Balance', 160, 580)
    .addText(`${xp.toLocaleString()}`, 370, 540)
    .addText(`¥${cc}`, 370, 580)
    .setTextAlign('center')
    .setTextFont('bold 20px Courier New')
    .addText(`${tt}`,540,455)
    .setTextFont('bold 40px Courier New')
    .addText(`${uLevel}`, 220,450)
    .addRoundImage(avatar, 10, 190, 168, 168, 168/2)
    /*.setColor('violet')
    .addRect(0,0,300,200)
    .setColor('white')
    .addRect(10,10,(1/100)*500, 200)
    .setTextFont('12px Bold') 
   // .addText('xp: 1280', 100,30)
   */
    .toBufferAsync();
  }
  
  let m = await message.channel.send('*Please Wait...*');
  const gumen = `
**User profile card for ${user.tag}**
`; message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'profile.png')}).then(() => {m.delete()})
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later.`);
  } 
  

}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "profile",
    description: "See your/someone profile",
    usage: "profile [@mention]"
}