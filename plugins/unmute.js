const {tools, config, defaultemb} = citnut
const {getParam} = tools
const {SlashCommandBuilder} = require("@discordjs/builders")
const command = ["unmute"], description = "unmute cho người dùng"

module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "<tag>",
	allowListening: false,
	permission: "adminsv",
	slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
		.addStringOption(option => option
			.setName("id")
			.setDescription("id người sẽ được unmute")
			.setRequired(true)
		)
	,
	async slashHandle (data, db) {return await this.call(data, db, data.user.id, data.options._hoistedOptions[0].value,data.user)},
	async listen (data,db) {},
	async call (data,db,author,victim,avt) {
		let id = author?author:data.author.id
		let muteId = victim?victim:getParam(data.content)		
		const checkId = () => {
			if (!db.user[muteId]) {
				if (muteId.startsWith("<@") && muteId.endsWith(">") && db.user[muteId.slice(2,-1)]) return muteId.slice(2,-1)
				if (muteId.startsWith("!") && db.user[muteId.slice(1)]) return muteId.slice(1)
				return false
			}else return muteId
		}
		const mute = checkId()
		if (data.guild) {
			if (id == data.guild.ownerId || config.admin.includes(id)) {
				if (!mute) return data.reply("sai id")
				if (!db.user[mute].mutesv) return data.reply({embeds:[defaultemb(`người dùng ${db.user[mute].tag} được sử dụng bot tại máy chủ này`)]})
				db.user[mute].mutesv = false
				 
				return data.reply({embeds: [defaultemb(`người dùng: ${db.user[mute].tag}\nđã được gỡ mute và có thể sử dụng bot tại máy chủ này`).setThumbnail((avt?avt:data.author).displayAvatarURL({size: 1024, dynamic: true}))]})
			}else return data.reply("bạn không đủ quyền sử dụng lệnh này!")
		}else {
			if (!config.admin.includes(id)) return data.reply("bạn không đủ quyền sử dụng lệnh này!")
			if (!mute) return data.reply("sai id")
			if (!db.user[mute].mute) return data.reply({embeds:[defaultemb(`người dùng ${db.user[mute].tag} hiện được sử dụng bot này`)]})
			db.user[mute].mute = false
			 
			return data.reply({embeds: [defaultemb(`người dùng: ${db.user[mute].tag}\nđã được gỡ mute và có thể sử dụng bot`)]})
		}
	
    }
}