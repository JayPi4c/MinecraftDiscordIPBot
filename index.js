require('dotenv').config();

if(process.env.BOTTOKEN == "" || process.env.BOTTOKEN == undefined) {
    console.log("Please set BOTTOKEN as environment variable");
    process.exit(1);
}
if(process.env.SERVER_ID == "" || process.env.SERVER_ID == undefined) {
    console.log("Please set SERVER_ID as environment variable");
    process.exit(1);
}
if(process.env.CHANNEL_ID == "" || process.env.CHANNEL_ID == undefined) {
    console.log("Please set CHANNEL_ID as environment variable");
    process.exit(1);
}


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.BOTTOKEN);

client.once('ready', () => {
    console.log('Ready!');
});

const commandHandler = require('./commands.js');

client.on('messageCreate', commandHandler);