module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "Moderation",
    description: "Clear messages in bulk",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send("**You do not have permission to run this command**")
        }
        if (!args[0]) return message.channel.send(`**Please specify an amount of messages to clear. e.g.** \`,clear <amount> <reason>\``)
        let cleared = args[0]

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("**That's not a number? I also can't delete 0 messages by the way**");
        }
       
        let reason = args.slice(1).join(' ') || "No reason provided"

        if (message.deletable) {
            message.delete();
        }

        let hundo = "100"
        if (Number(args[0]) > Number(hundo)) args[0] = "100";
        const fetched = await message.channel.messages.fetch({
            limit: args[0]
        })

            message.channel.bulkDelete(fetched, true)
            .catch(error => message.channel.send(`Error: ${error}`))

        message.channel.send(`**${cleared} messages have been successfully Cleared**`).then(m => m.delete({timeout: 5000}));
        message.delete().catch(() => {});
       

    }
}