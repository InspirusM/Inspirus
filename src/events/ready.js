module.exports = async client => {
  //setTimeout(async () => {
    
      let guildsEval = await client.shard.broadcastEval('this.guilds.size')
      let channelsEval = await client.shard.broadcastEval('this.channels.size')
      let usersEval = await client.shard.broadcastEval('this.users.size')

     var botGuilds = guildsEval.reduce((prev, val) => prev + val)
     var botChannels = channelsEval.reduce((prev, val) => prev + val)
     var botUsers = usersEval.reduce((prev, val) => prev + val)
    
         var clientonmessage = `
| > Logging in...                       |
|                                       |
| Logged in as ${client.user.tag}      |
| Working on ${botGuilds} servers!                |
| ${botChannels} channels and ${botUsers} users cached!   |
|                                       |
        
-----------------Bot's commands logs------------------`
      
  console.log(clientonmessage) 
  function randStatus() {
    let status = [
      `${botGuilds}`,
      `My prefix: v!`
     ];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'WATCHING' });
  };
  // update stats
  setInterval(() => client.updateStats(), 1000 * 60);
  
  //random status 
setInterval(randStatus, 20000);
  setInterval(() => client.updateStats(), 1000 * 60);
  /*
  client.setInterval(() => {
  	for(const guild of client.guilds.array()){
	  	const channel = guild.channels.filter(x => x.name === 'neko-present' || x.name === 'bot-spam').first();
	  	if(!channel) continue;
		client.commands.get('neko').getNeko(channel, 'Neko minutes present');
  	}
  }, 10000 * 60);
  */
//}, 10000)
}