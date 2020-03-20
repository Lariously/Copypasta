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
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            .setDescription(`**Nickname/Tag:** ${member.displayName} | ${member.user.tag}\n **Discord ID:** ${member.user.id
            }\n **Status/Status Message:** ${stat} | *"${member.user.presence.game.name}"*\n **Roles:** ${roles, true
            }\n\n **Joined at:** ${joined}\n **Created at**: ${created, true}`)

        message.channel.send(embed);
    }
}