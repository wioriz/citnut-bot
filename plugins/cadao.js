const {SlashCommandBuilder} = require("@discordjs/builders")
const command = ["cadao"], description = "ca dao lmao :))"

module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "",
	allowListening: false,
	slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
	,
	async slashHandle (data, db) {return await this.call(data)},
	async listen (data,db) {
	},
	async call (data,db) {
		const res = await citnut.tools.getapi("cadao",data,false)
		if (!res) return data.reply("đã xảy ra lỗi")
		const emb =  citnut.defaultemb(res)
		
		return data.reply({embeds:[emb], allowedMentions: citnut.allowedMentions})
	}
}