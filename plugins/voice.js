const { getParam } = citnut.tools
const fetch = require("node-fetch")
const { SlashCommandBuilder } = require("@discordjs/builders")


const command = ["say", "voice"], description = "giọng nói google"
module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "<string>",
	allowListening: false,
	slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
		.addStringOption(string => string
			.setName("string")
			.setDescription("tin nhắn")
			.setRequired(true)
		)
	,
	async slashHandle (data, db) {return await this.call(data,db,data.options._hoistedOptions[0].value)},
	async listen (data,db) {
	},
	async call (data,db,string) {
		try {
			let text = string?string:await getParam(content)
			let url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi_VN&client=tw-ob`
			let r = await fetch(url)
			let attachment = await r.buffer()
			return data.channel.send({
				files: [{
					name: "tts.mp3",
					attachment
				}]
			}, data)
		} catch (e) { 
			console.error(e)
			return citnut.send(`đã xảy ra lỗi`, data)
		}
	}
}