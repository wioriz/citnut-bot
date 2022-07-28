const {tools, config, defaultemb} = citnut
const {getParam} = tools

module.exports = {
	command: ["unmute"],//từ khoá của plugin
	author: "Citnut",//tên tác giả
	description: "bỏ mute một ai đó",//mô tả
	guide: "",//tóm tắt hướng dẫn sử dụng
    permission: "adminsv",// admin | adminsv | false
    allowInteraction: false,//tương tăc khác, vd: các nút ấn
	allowListening: false,//luôn lắng nghe (noprefix)
    async interaction (data) {
        let {customId} = data
        if (!data.isButton()) return
		//code
	},
	async listen (data,db) {
        //code (noprefix)
	},
	async call (data,db) {
		let {id} = data.author
		let muteId = getParam(data.content)		
		const checkId = () => {
			if (!db.user[muteId]) {
				if (!db.user[muteId.slice(3,-1)]) return false
				return muteId.slice(3,-1)
			}else return muteId
		}
		const mute = checkId()
		if (data.guild) {
			if (id == data.guild.ownerId || config.admin.includes(id)) {
				if (!mute) return data.channel.send("sai id")
				if (!db.user[mute].mutesv) return data.channel.send({embeds:[defaultemb(`người dùng ${db.user[mute].tag} được sử dụng bot tại máy chủ này`)]})
				db.user[mute].mutesv = false
				 
				return data.channel.send({embeds: [defaultemb(`người dùng: ${db.user[mute].tag}\nđã được gỡ mute và có thể sử dụng bot tại máy chủ này`).setThumbnail((data.author).displayAvatarURL({size: 1024, dynamic: true}))]})
			}else return data.channel.send("bạn không đủ quyền sử dụng lệnh này!")
		}else {
			if (!config.admin.includes(id)) return data.channel.send("bạn không đủ quyền sử dụng lệnh này!")
			if (!mute) return data.channel.send("sai id")
			if (!db.user[mute].mute) return data.channel.send({embeds:[defaultemb(`người dùng ${db.user[mute].tag} hiện được sử dụng bot này`)]})
			db.user[mute].mute = false
			 
			return data.channel.send({embeds: [defaultemb(`người dùng: ${db.user[mute].tag}\nđã được gỡ mute và có thể sử dụng bot`)]})
		}
	
    }
}