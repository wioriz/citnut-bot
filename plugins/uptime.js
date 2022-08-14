const {totalmem, freemem} = require("os")
const { SlashCommandBuilder } = require("@discordjs/builders")


const command = ["uptime", "upt"], description = "xem uptime của bot"
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
	async slashHandle (data, db) {
		await data.reply({embeds: [citnut.defaultemb("đợi xíu nha")]})
		let res = await citnut.tools.getapi("girl",data,false)
		return data.editReply(await this.upt(db,data.user.id,res,data.createdTimestamp))
	},
	async listen (data,db) {
	},
	async call (data,db) {			
		let res = await citnut.tools.getapi("girl",data,false)
		return data.reply(await this.upt(db,data.author.id,res,data.createdTimestamp))
	},

	async upt (db,id,res,ping) {
		try {
			let price = citnut.config.price.uptime

			if(db.user[id].money<price) {
				let thieutien = "bạn còn thiếu "+(price-db.user[id].money)+" 💵 để sử dụng lệnh này"
				return {embeds:[citnut.defaultemb(thieutien)],allowedMentions:citnut.allowedMentions}
			}else {
				db.user[id].money-=price
			}

			let prefix = citnut.config.prefix,
				time = process.uptime(),
				day = Math.floor(time/(60*60*24)),
				hours = Math.floor((time / (60 * 60)) - (day*24)),
				minutes = Math.floor((time % (60 * 60)) / 60),
				seconds = Math.floor(time % 60),
				ram = (totalmem-freemem)/1024/1024,
				total = db.total,
				hoatdong = "";

			hoatdong+=(day>0)?`${day} ngày\n`:""
			hoatdong+=(hours>0)?`${hours} giờ\n`:""
			hoatdong+=(minutes>0)?`${minutes} phút\n`:""
			hoatdong+=seconds+" giây"
			db.total.user = Object.keys(db.user).length
			 
			const emb = citnut.defaultemb(`bot đã hoạt động được:\n${hoatdong}\n> Prefix: ${prefix}\n> Tổng số tin nhắn: ${total.msg}\n> Tổng số người dùng: ${total.user}\n> Ram đang sử dụng: ${ram.toFixed(1)}MB\n> Ping: ${Date.now() - ping}ms`)
	
			return {embeds:[!res?emb:emb.setThumbnail(res)],allowedMentions:citnut.allowedMentions}	
		}catch (e) {
			return `đã xảy ra lỗi`
		}
	}
}
