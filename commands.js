const ip = require('./commands/ip.js');

const commands = { ip };

const serverID = process.env.SERVER_ID;
const channelID = process.env.CHANNEL_ID;

module.exports = async function (msg) {
    if (msg.guild.id === serverID && msg.channel.id === channelID) {
        let tokens = msg.content.split(' ');
        let command = tokens.shift();
        if (command.charAt(0) === '!') {
            command = command.substring(1);
            commands[command](msg, tokens);
        }
    }
}