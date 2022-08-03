const {MessageActionRow, MessageButton} = citnut.Discord
const {allowedMentions} = citnut
const {SlashCommandBuilder} = require("@discordjs/builders")
const command = ["eco"], description = "trang eco cmd"

module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "",
	allowListening: false,
    allowInteraction: true,
    slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
	,
	async slashHandle (data, db) {return await this.call(data)},
    async interaction (data, db) {
        let {customId} = data
        if (!data.isButton()) return
        let {id} = data.user

        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})

        switch (customId) {
            case "a":
                data.update({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của bạn là ${db.user[id].money} 💵`).setThumbnail(avt)],allowedMentions})
            break
            case "b":
                data.update(await require("./work.js").workfunc(data,id,avt,db))
            break
            case "c":
                data.update(await require("./crime.js").crimefunc(data,id,avt,db))
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