const { RichEmbed } = require("discord.js")
const { getMember, formatDate } = require("../../function.js");

module.exports = {
    name: "kick",
    aliases: [],
    category: "Moderation",
    description: "Kick a specified user from the server",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send("**You do not have permission to run this command**")
        }
         const member = getMember(message, args[0]) || message.guild.members.get(args[0])
        
        if (args.length < 1)
        return message.channel.send((`**Please specify the user you want to kick. e.g.** \`-kick <user> <reason>\``));
        
        if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send("**You are unable to kick this user**")

        if (member.id === message.author.id) {
            return message.channel.send("**You are unable to kick yourself**")
        }

        let reason = args.slice(1).join(' ') || "No reason provided"

        if (!message.guild.member(member).kickable) return message.channel.send("**I do not have sufficient permissions to run this command**");
        
try {
    message.guild.member(member).kick(reason);
} catch (e) {
    return message.channel.send(`**Could not kick ${member.user.username} because something failed.\n${e.stack}**`)
} message.channel.send(`**${member.user.tag} has been successfully Kicked.**`)

try {
    await member.send(`**You have been kicked for:** \`${reason}\``)
} catch (e) {
    return;
    }


    }
}

