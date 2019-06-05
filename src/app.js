const InspirusClient = require('./handle/InspirusClient');
const client = new InspirusClient({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true
});

require('./handle/events')(client);
require('./handle/module')(client);

client.login(process.env.TOKEN);
