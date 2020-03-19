const { MessageEmbed } = require('discord.js')
const request = require('snekfetch')

module.exports = {
    name: "copypasta",
    aliases: ["pasta", "copy" ],
    category: "Fun",
    description: "Recieve a random Copypasta",
    
run: async (bot, message, args) => {

        try {
            const {
                body
            } = await request
                .get('http://www.reddit.com/r/copypasta/top.json?sort=top')
                .query({
                    limit: 800
                });

            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('**This isnt a nsfw channel.**');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            let title = `${allowed[randomnumber].data.selftext}`
            if (title.length > 2048) {
                let title1 = title.substr(0, 2040)
                title1 += `...`
                title = title1
            } //${allowed[randomnumber].data.title} 
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${title}`)
                // .setURL(allowed[randomnumber].data.url)
                .setImage(allowed[randomnumber].data.url)

            message.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }
    }
}