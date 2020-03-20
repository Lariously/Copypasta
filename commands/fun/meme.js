const { MessageEmbed } = require("discord.js")
const request = require("snekfetch")

module.exports = {
    name: "meme",
    aliases: [],
    category: "Fun",
    description: "Gives you a random meme",
    run: async (bot, message, args) => {
        try {
            const {
                body
            } = await request
                .get('https://www.reddit.com/r/memes.json?sort=top&t=week')
                .query({
                    limit: 800
                });

            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('**It seems we are out of fresh memes!, Try again later.**');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            let title = `${allowed[randomnumber].data.title} ${allowed[randomnumber].data.selftext}`
            if (title.length > 256) {
                let title1 = title.substr(0, 253)
                title1 += `...`
                title = title1
            }

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(title)
                .setURL(allowed[randomnumber].data.url)
                .setImage(allowed[randomnumber].data.url)
                .setFooter(`👍 ${allowed[randomnumber].data.ups} | r/${allowed[randomnumber].data.subreddit}`)
            message.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }

    }
}