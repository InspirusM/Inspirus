const { get } = require('node-superfetch');

exports.run = async (client, message, args, color, prefix) => {
  
  const { body } = await get(`https://nekos.life/api/v2/img/${message.channel.nsfw || message.channel.name.startsWith("nsfw-") || message.channel.name.startsWith("nsfw_") ? "nsfw_" : ""}avatar`);
    await message.channel.send({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.url,
        "color": 6192321,
        "image": {
          "url": body.url
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL,
          "text": `Requested by ${message.author.tag} | Powered by Nekos.life API`
        }
      }
    });
  }

exports.conf = {
    aliases: ['aav'],
    cooldown: "3"
}

exports.help = {
    name: "aavatar",
    description: "This command will give you a random anime avatar",
    usage: "aavatar"
}
