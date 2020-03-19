const { RichEmbed } = require("discord.js")
const request = require('snekfetch')
module.exports = {
    name: "fact",
    aliases: [],
    category: "Fun",
    description: "Gives you a fact",
    run: async (bot, message, args) => {
            try {
                const {
                    body
                } = await request
                    .get('https://uselessfacts.jsph.pl/random.json?language=en')
                    .query({
                        limit: 800
                    });

                    let res = Object.entries(body)
                    let text = ""

                    for(var [key, value] of res){
                        if (key == 'text'){
                            text = '**' + value.toString() + '**'
                        }
                    }
                const embed = new RichEmbed()
                    .setColor("RANDOM")
                    .setDescription(`${text}`)
                message.channel.send(embed)
            } catch (err) {
                return console.log(err);
            }
        }
    }