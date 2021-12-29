require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.BOTTOKEN);

client.once('ready', () => {
    console.log('Ready!');
});

const commandHandler = require('./commands.js');

client.on('messageCreate', commandHandler);