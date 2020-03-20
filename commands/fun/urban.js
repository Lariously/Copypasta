const { MessageEmbed } = require("discord.js")
const urban = require("urban")

module.exports = {
    name: "urban",
    aliases: [],
    category: "Fun",
    description: "Search the urban dictionary",
    run: async (bot, message, args) => {
        let search = args[0] ? urban(args.slice(' ')) : urban.random();
        let image = "https://cdn.discordapp.com/attachments/614584702921080857/668312045002948621/urban.png"
        // if (!search) return message.channel.send("**What are you searching**")
        try{
            search.first(res => {
                
                if(!res) return message.channel.send("**There are no results found**");
                let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res;

                // if (definition > 1800) {
                //     let mess = definition.substr(0, 1800)
                //     mess += `...`
                //     definition = mess
            
                let embed = new MessageEmbed()
                .setColor("Random")
                .setAuthor(`Urban Dictionary | "${word}"`, image)
                .setDescription(`**Definition:** ${definition || "No definition"}\n\n**Example:** ${example || "No example"}\n[Click here!](${permalink || "https://urbandictionary.com/"})`)
                .setThumbnail(image)
                .setFooter(`👍 ${thumbs_up || "0"} | 👎 ${thumbs_down || "0"} | Made by: ${author || "unkown"}`);

                message.channel.send(embed)
                // }
            })

        } catch(e) {
            console.log(e)
            return message.channel.send("broke")

        }
    }
}
    