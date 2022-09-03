const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Replies with infos about the ip bot!'),
    async execute(interaction) {
        await interaction.reply('This bot will return the ip of the server on which the bot is deployed.');
    },
};

