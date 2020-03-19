module.exports = {
    name: "8ball",
    aliases: ["8b"],
    category: "Fun",
    description: "Ask the bot a question and get a reply",
    run: async (bot, message, args) => {

        if (!args[0]) return message.channel.send(`**Please ask a question. e.g. **\`,8ball <question>\``)
      
        let answers = [
            "**it is certain**",
            "**Without a doubt**",
            "**You may rely on it**",
            "**Yes definitely**",
            "**It is decidedly so**",
            "**As I see it, yes**",
            "**Most likely**",
            "**Yes**",
            "**Outlook good**",
            "**Signs point to yes**",
            "**Neutral Answers**",
            "**Reply hazy try again**",
            "**Better not tell you now**",
            "**Ask again later**",
            "**Cannot predict now**",
            "**Concentrate and ask again**",
            "**Negative Answers**",
            "**Don’t count on it**",
            "**Outlook not so good**",
            "**My sources say no**",
            "**Very doubtful**",
            "**My reply is no**"
        ]
    
        let answer = Math.floor((Math.random() * answers.length));
        message.channel.send(answers[answer])

    }
}