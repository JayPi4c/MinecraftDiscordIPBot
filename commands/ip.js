const { SlashCommandBuilder } = require('discord.js');
const http = require('http');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Replies with the current ip of the minecraft server!'),
    async execute(interaction) {
        console.log('ip command executed');
        // https://stackoverflow.com/a/68774492
        await interaction.reply('Getting ip...');
        await getIP(interaction);
    },
};

async function getIP(interaction) {
    console.log('getting ip');
    http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
        resp.on('data', async ip => {
            console.log(`ip: ${ip}`);
            await interaction.editReply(`The current ip is: ${ip}`);
        });
    });
}

