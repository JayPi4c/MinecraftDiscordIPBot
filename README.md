# Discord IP Bot

This bot is used to obtain the public ip address of the host machine on which this bot is deployed. This is useful if a service is hosted in a private network and you want to access it from outside the network. In particular, this bot is used to obtain the public ip address of a Raspberry Pi that is hosting a Minecraft server.


## Usage

This bot can be used in two ways. The first way is the plain usage of node js. The second way is to use docker. 

### Plain node usage

In order to successfully run the bot with plain node js, you need to have node and npm installed in the first place. Specifically, the node version must be v16.9.0 or higher.

Install the dependencies with `npm install`.

It is necessary to create a file called `.env` in the root directory of the project, similar to the `.envSample` file. 

Register the Slash-Commands:
```bash
$ node deploy-commands.js
```

Start the bot:
```bash
$ node index.js
```

It es recommended to use a process manager like [pm2](https://pm2.keymetrics.io/) to run the bot in the background.

### Docker usage

The bot can easily be started in a docker container. The docker image is available on [Docker Hub](https://hub.docker.com/r/jaypi4c/discord-ip-bot).

```bash
$ docker run -d --name discord-ip-bot -e BOTTOKEN=<your-token> -e GUILD_ID=<guild-id> -e CLIENT-ID=<client-id>  jaypi4c/discord-ip-bot
```
(The container does not run the `deploy-commands.js` script. Therefore, the commands have to be registered manually. Maybe in the future I will add a script that registers the commands automatically.)

## ENV variables

The `GUILD_ID` is the server's ID, which can be obtained directly from discord. For the `BOTTOKEN` and the `CLIENT_ID` you must visit the [Discord Developer Portal](https://discord.com/developers/applications).

Furthermort, it is possible to clear all registered commands with the `CLEAR_COMMANDS` variable. This is useful if you want to change the commands. The default value is `false`. (But in all honesty, the docker version does not run the `deploy-commands.js` script, so you have to clear the commands manually.)

## Deploy Minecraft Server and Discord IP Bot on Raspberry Pi with docker

It is requiered to have docker and docker-compose installed on the Raspberry Pi.
To run the bot and the Minecraft server on the same Raspberry Pi, you can create a `docker-compose.yml` file with the following content: 
```yaml
version: "3.9"
services:
  minecraft:
    image: itzg/minecraft-server:java17-alpine
    container_name: minecraft
    ports:
      - "12345:25565"
    environment:
      EULA: "FALSE"
      VERSION: "1.7.10"
    restart: unless-stopped
    volumes:
      - ./minecraft-data:/data
  ip-bot:
    image: jaypi4c/discord-ip-bot:1.2.0
    container_name: discord-ip-bot
    restart: unless-stopped
    environment:
      BOTTOKEN: <your-token>
      CLIENT_ID: <client-id>
      GUILD_ID: <guild-id>
      CLEAR_COMMANDS: "false"
      SERVER_PORT: 12345
      MAP_PORT: 12345
      MAP_HTTPS: false
```
The tokens and IDs must be changed respectivly. The `minecraft-data` folder is used to store the world data of the Minecraft server. Also it is necessary to accept the EULA of the Minecraft server. This can be done by setting the `EULA` variable to `TRUE`. For more information about the minecraft server image, visit the [GitHub repository](https://github.com/itzg/docker-minecraft-server) of the image.

You can run the bot and the Minecraft server with the following command in the same directory as the `docker-compose.yml` file:
```bash
$ docker-compose up -d
```

## Further information

This bot is based on the [Guide](https://discordjs.guide/) of the [Discord.js](https://discord.js.org/#/) library.
Additionally, the [Video series](https://youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4) of Daniel Shiffman is very helpful.