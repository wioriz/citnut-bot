const {SlashCommandBuilder} = require("@discordjs/builders")
const command = ["girl", "gái"], description = "xem ảnh mlem"

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
		const res = await citnut.tools.getapi("girl",data,false)
		if (!res) return citnut.send("đã sảy ra lỗi", data)
		
		return data.reply({content:res,allowedMentions:citnut.allowedMentions})
		
	}
}