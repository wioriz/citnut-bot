const {MessageActionRow, MessageButton} = citnut.Discord
const {allowedMentions} = citnut

module.exports = {
	command: ["cmd"],
	author: "Citnut",
	description: "test",
	guide: "",
	allowListening: true,
    allowInteraction: true,
    async interaction (data) {
        let {customId} = data
        if (!data.isButton()) return
        const {get} = citnut.tools.db
        let {id} = data.user

        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})

        switch (customId) {
            case "a":
                data.update({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của bạn là ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions})
            break
            case "b":
                data.update(await require("./work.js").workfunc(data,id,avt))
            break
            case "c":
                data.update(await require("./crime.js").crimefunc(data,id,avt))
            break
            default:
            break
        }
    },
	async listen (data,db) {
	},
	async call (data,db) {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('a')
				.setLabel('ví')
				.setStyle('PRIMARY'),
            new MessageButton()
				.setCustomId('b')
				.setLabel('work')
				.setStyle('PRIMARY'),
            new MessageButton()
				.setCustomId('c')
				.setLabel('crime')
				.setStyle('PRIMARY')
			)
        const embeds = [citnut.defaultemb("short cmd của bạn")]
		return data.reply({embeds, allowedMentions, components: [row]})
        
	}
}