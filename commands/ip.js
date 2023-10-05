const { SlashCommandBuilder } = require('discord.js');
const http = require('http');
const MessageGenerator = require('../MessageGenerator.js');

const fetching_mg = new MessageGenerator(process.env.WAIT_MESSAGES, ['Getting IP...']);
const display_mg = new MessageGenerator(process.env.DISPLAY_MESSAGES, ['Good day to you Sir!']);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Replies with the current ip of the minecraft server!'),
    async execute(interaction) {
        console.log('ip command executed');
        // https://stackoverflow.com/a/68774492
        await interaction.reply(fetching_mg.get());
        await getIP(interaction);
    },
};

async function getIP(interaction) {
    console.log('getting ip');
    http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
        resp.on('data', async ip => {
            let output = display_mg.get() +`\nThe current ip is: ${ip}`;

            if (!(process.env.SERVER_PORT == undefined || process.env.SERVER_PORT == "")) {
                output += `\nServer: ${ip}:${process.env.SERVER_PORT}`
            }
            if (!(process.env.MAP_PORT == undefined || process.env.MAP_PORT == "")) {
                let s = "";
                if (!(process.env.MAP_HTTPS == undefined || process.env.MAPMAP_HTTPS_PORT == "") && process.env.MAP_HTTPS == "true") {
                    s = "s";
                }
                output += `\nMap: http${s}://${ip}:${process.env.MAP_PORT}`
            }

            console.log(`ip: ${ip}`);
            await interaction.editReply(output);
        });
    });
}

