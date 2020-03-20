const { getMember, formatDate } = require("../../function.js");
const ms = require("ms");

module.exports = {
    name: "mute",
    aliases: [],
    category: "Moderation",
    description: "Mute a specified user in the server",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send("**You do not have permission to run this command**")
        }
        
        const member = getMember(message, args[0]) || message.guild.members.get(args[0])

        if (args.length < 1)
            return message.channel.send((`**Please specify the user you want to mute. e.g.** \`-mute <user> <time> <reason>\``));

        if (member.id === message.author.id) {
            return message.channel.send("**You are unable to mute yourself**")
        }

        if (member.roles.highest.position >= message.member.roles.highest.position)
            return message.channel.send("**You are unable to mute this user**")

        let time = args[1]
        if (!time) return message.channel.send(`**Please provide an actual time. e.g.** \`,mute <user> <time> <reason>\``)
        let reason = args.slice(2).join(' ') || "No reason provided"

            let muterole = message.guild.roles.cache.find(n => n.name === 'Muted');
            if(!muterole){
                try{
                  muterole=await message.guild.createRole({
                    name: "Muted",
                    color:"##078de0",
                    permissions:[]
                  })
                  message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false,
                      CONNECT: false,
                    });
                  });
            }catch(e){
              console.log(e.stack);
             }
            }
            
            await (member.roles.add(muterole.id));{
            

        try {

                setTimeout(function(){
                    member.roles.remove(muterole.id)
                   },ms(time));
                 
        } catch (e) {
            return message.channel.send(`**Could not mute ${member.user.username} because something failed.\n${e.stack}**`)
        }
        message.channel.send(`**${member.user.tag} has been successfully Muted.**`)
        try {
            await member.send(`**You have been muted for:** \`${reason}\``)
        } catch (e) {
            return;
        }

    }
    }
}