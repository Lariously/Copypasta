const { MessageEmbed } = require("discord.js");
const { getMember, formatDate } = require("../../function.js");


module.exports = {
    name: "avatar",
    aliases: ["av"],
    category: "Info",
    description: "Get a user's avatar picture",
    run: async (bot, message, args) => {

        const member = getMember(message, args.join(" "));
        const embedColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        const embed = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor(`${member.user.username}'s Avatar`, member.user.displayAvatarURL())
        .setImage(member.user.displayAvatarURL({ size: 2048, dynamic: true}))

        message.channel.send(embed)

    }
}
