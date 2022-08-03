const link = "https://drive.google.com/u/0/uc?id=1-lr1kQEWXRSrAjOghrhzwIAesi1JzktF&export=download"


const { SlashCommandBuilder } = require("@discordjs/builders")


const command = ["congngheloi"], description = "thật ko thể tin nổi :))"

module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "",
    permission: false,
    allowInteraction: false,
	allowListening: false,
	slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
	,
	async slashHandle (data, db) {return await this.call(data)},
    async interaction (data, db) {
        let {customId} = data
        if (!data.isButton()) return
	},
	async listen (data,db) {
	},
	async call (data,db) {
        data.reply(link)
	}
}
