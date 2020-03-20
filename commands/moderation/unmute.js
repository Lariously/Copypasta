const { getMember, formatDate } = require("../../function.js");

module.exports = {
    name: "unmute",
    aliases: [],
    category: "Moderation",
    description: "Unmute a specified user in the server",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send("**You do not have permission to run this command**")
        }
        
        const member = getMember(message, args[0]) || message.guild.members.get(args[0])
        
        if (args.length < 1)
            return message.channel.send((`**Please specify the user you want to unmute. e.g.** \`-unmute <user>\``));
        
        if (member.id === message.author.id) {
            return message.channel.send("**You are unable to unmute yourself**")
        }
        
        let muterole = message.guild.roles.cache.find(n => n.name === 'Muted');
        
        if(!muterole) {
            return message.channel.send("**This user is not muted**")
        }
        
        member.roles.remove(muterole.id).then(() => {
            return message.channel.send(`**${member.user.tag} has been successfully Unmuted.**`)
   
    })
}
}



