const { SlashCommandBuilder } = require("@discordjs/builders")
const command = ["source", "src"], description = "xem srouce gốc của bot"
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
		data.reply({content:"https://github.com/Citnut/citnut-bot",allowedMentions:citnut.allowedMentions})		
		
	}
}
