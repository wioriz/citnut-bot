

const { SlashCommandBuilder } = require("@discordjs/builders")


const command = [""], description = ""

module.exports = {
	command,
	author: "",
	description,
	guide: "",
    permission: false,
    allowInteraction: false,
	allowListening: false,
	slashmode: false,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
	,
	async slashHandle (data, db) {},
    async interaction (data, db) {
        let {customId} = data
        if (!data.isButton()) return
	},
	async listen (data,db) {
	},
	async call (data,db) {
	}
}
