const {SlashCommandBuilder} = require('discord.js');
const MessageGenerator = require('../MessageGenerator.js');

const fetching_mg = new MessageGenerator(process.env.WAIT_MESSAGES, ['Getting IP...']);
const display_mg = new MessageGenerator(process.env.DISPLAY_MESSAGES, ['Good day to you Sir!']);
const enable_ipv4 = process.env.ENABLE_IPV4 || "true";
const enable_ipv6 = process.env.ENABLE_IPV6 || "false";

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

    let output = display_mg.get();

    if (enable_ipv4 === "true") {
        let v4 = await getIPv4();
        console.log(`ipv4: ${v4}`);
        if ("IPv4 Unavailable" !== v4) {
            output += `\nIPv4: ${v4}`;
            output = addVersion(output, v4);
        }
    }
    if (enable_ipv6 === "true") {
        let v6 = await getIPv6();
        console.log(`ipv6: ${v6}`);
        if ("IPv6 Unavailable" !== v6) {
            output += `\nIPv6: ${v6}`;
            output = addVersion(output, "[" + v6 + "]");
        }
    }

    await interaction.editReply(output);
}

function addVersion(output, ip) {
    if (!(process.env.SERVER_PORT == undefined || process.env.SERVER_PORT == "")) {
        output += `\nServer: ${ip}:${process.env.SERVER_PORT}`
    }
    if (!(process.env.MAP_PORT == undefined || process.env.MAP_PORT == "")) {
        let s = "";
        if (!(process.env.MAP_HTTPS == undefined || process.env.MAP_HTTPS == "") && process.env.MAP_HTTPS == "true") {
            s = "s";
        }
        output += `\nMap: http${s}://${ip}:${process.env.MAP_PORT}`
    }

    return output;
}

async function getIPv4() {
    return fetch("https://api.ipify.org")
        .then(response => response.text())
        .catch(error_ => {
            console.log(`Failed to get IPv4: ${error_}`);
            return "IPv4 Unavailable";
        });
}

async function getIPv6() {
    return fetch("https://api6.ipify.org")
        .then(response => response.text())
        .catch(error_ => {
            console.log(`Failed to get IPv6: ${error_}`);
            return "IPv6 Unavailable";
        });
}
