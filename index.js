const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

require('dotenv').config()

require("./handler/command")(client);

client.on("ready", () => {
    console.log(`${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "for new copypastas",
            type: "Watching",
            url:"https://www.twitch.tv/WesternCucks"
        }
    });
})

client.on("message", async message => {
    const prefix = "-";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN);