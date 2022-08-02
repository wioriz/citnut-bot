const { getParam } = citnut.tools
const { config, allowedMentions, plugin, defaultemb } = citnut
const {SlashCommandBuilder} = require("@discordjs/builders")

async function helpCmd (cmd) {
	let _msg = ``
		_msg += `Lệnh: ${(cmd.command.length > 1) ? cmd.command.join(', ') : cmd.command[0]}\n`
		_msg += `Tác giả: ${cmd.author}\n`
		_msg += `> Mô tả: ${cmd.description}\n`
		_msg += `> Sử dụng: ${config.prefix}${cmd.command[0]} ${cmd.guide}\n`
	return _msg
}
async function checkHelp (body, index) {
	let cache = []
	let cmd = ""
	for (const i of index.data) {
		if (i.item.command.includes(body)) {
			cache.push(true)
			cmd = i.item
		} else { cache.push(false) }
	}
	let result = cache.includes(true) ? true : false
	return { 
		result,
		cmd
	}
}

const command = ["help", "h"], description = "hiển thị trang hướng dẫn"

module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "",
	allowListening: true,
	slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
		.addStringOption(options => options
			.setName("string")
			.setDescription("tên lệnh")
			.setRequired(false)
		)
	,
	async slashHandle (data, db) {
		const content = data.options._hoistedOptions[0]?data.options._hoistedOptions[0].value:false
		return await this.helpFunc(data, content, data.user.id)
	}
	,
	async listen (data,db) {
		if (data.author.bot) return
		let { content } = data
		if (content == "prefix") {
			return data.reply({embeds:[defaultemb("prefix là: "+config.prefix)],allowedMentions})
		}
	},
	async call (data, db) {return await this.helpFunc(data, await getParam(data.content), data.author.id)},
	async helpFunc (data, body, id) {
		let index = await plugin()

		if (body) {
			let check = await checkHelp(body, index)
			if (check.result) {
				let helpMsg = await helpCmd(check.cmd)	
				return data.reply({embeds:[defaultemb(helpMsg)],allowedMentions})
			}
			return data.reply({embeds:[defaultemb("không tìm thấy lệnh: "+body)],allowedMentions})
		} else {
			let msg = `Danh sách lệnh:`
			let arrCmd = {
				user: [],
				admin: [],
				ownersv: []
			}
			for (i of index.data) {
				if (!i.item.permission) arrCmd.user.push(i.item.command[0])
				if (i.item.permission == "admin") arrCmd.admin.push(i.item.command[0])
				if (i.item.permission == "adminsv") arrCmd.ownersv.push(i.item.command[0])
			}
			msg += "\n> "
			msg += arrCmd.user.join(", ")
			msg += "\n"
			if (config.admin.includes(id)) msg += `admin:\n> ${arrCmd.admin.join(", ")}\n`
			if (data.guild?( data.guild.ownerId.includes(id)):false) msg += `owner sv:\n> ${arrCmd.ownersv.join(", ")}`
			
			return data.reply({embeds:[defaultemb(msg)],allowedMentions})
			
		}
	}
}