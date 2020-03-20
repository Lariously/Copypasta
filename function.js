module.exports = {
    getMember(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind)
        
        if (!target && message.mentions.members)
        target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.cache.get(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target)
        target = message.member;

         return target;
    },

    formatDate: function(date) {
        const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options1).format(date);
    }
}