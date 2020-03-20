const { MessageEmbed } = require('discord.js')

const { getMember, formatDate } = require("../../function.js");

module.exports = {
    name: "ban",
    aliases: [],
    category: "Moderation",
    description: "Ban a specified user from the server",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send("**You do not have permission to run this command**")
        }

        const member = getMember(message, args[0]) || message.guild.members.get(args[0])

        if (args.length < 1)
            return message.channel.send((`**Please specify the user you want to ban. e.g.** \`-ban <user> <reason>\``));

        if (member.id === message.author.id) {
            return message.channel.send("**You are unable to ban yourself**")
        }

        if (member.roles.highest.position >= message.member.roles.highest.position)
            return message.channel.send("**You are unable to ban this user**")

            let reason = args.slice(1).join(' ') || "No reason provided"

            if (!message.guild.member(member).bannable) return message.channel.send("**I do not have sufficient permissions to run this command**");
try{
            message.guild.member(member).ban(reason);
          
        } catch (e) {
            return message.channel.send(`**Could not ban ${member.user.username} because something failed.\n${e.stack}**`)
        }
        message.channel.send(`**${member.user.tag} has been successfully Banned.**`)
        try {
            await bUser.send(`**You have been banned for:** \`${reason}\``)
        } catch (e) {
            return;
        }

    }
}