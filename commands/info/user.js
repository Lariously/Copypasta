const { MessageEmbed } = require("discord.js");
const { getMember, formatDate } = require("../../function.js");

module.exports = {
    name: "profile",
    aliases: ["whois", "user", "info", "profile"],
    description: "Returns user information",
    usage: "[username | id | mention]",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        const created = formatDate(member.user.createdAt);

        let none = "None"
        if (member.presence.status === "dnd") stat = "Do Not Disturb";
        if (member.presence.status === "idle") stat = "Idle";
        if (member.presence.status === "online") stat = "Online";
        if (member.presence.status === "offline") stat = "Offline";

        const embed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(`**Nickname:** ${member.displayName}\n **Discord Tag:** ${member.user.tag}\n **Discord ID:** ${member.user.id
            }\n **Status:** ${stat}\n **Satus Message:** *"${member.presence.game ? member.presence.game.state : none}"*\n **Roles:** ${roles
            }\n\n **Joined at:** ${joined}\n **Created at**: ${created}`)

        message.channel.send(embed);
    }
}