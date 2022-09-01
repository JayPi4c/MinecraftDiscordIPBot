const ip = require('./commands/ip.js');

const commands = { ip };

const serverID = process.env.SERVER_ID;
const channelID = process.env.CHANNEL_ID;

module.exports = async function (msg) {
    console.log("reveived message: " + msg);
    if (msg.guild.id === serverID && msg.channel.id === channelID) {
        console.log("server and channel match");
        let tokens = msg.content.split(' ');
        let command = tokens.shift();
        if (command.charAt(0) === '!') {
            console.log("message is a command");
            command = command.substring(1);
            commands[command](msg, tokens);
        }
    }
}