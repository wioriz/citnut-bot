let {totalmem, freemem} = require("os")
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};

module.exports = {
	command: ["uptime", "upt"],
	author: "Citnut",
	description: "xem uptime của bot",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		let prefix = citnut.config.prefix,
			time = process.uptime(),
			day = Math.floor(time/(60*60*24)),
			hours = Math.floor((time / (60 * 60)) - (day*24)),
			minutes = Math.floor((time % (60 * 60)) / 60),
			seconds = Math.floor(time % 60),
			timeStart = Date.now(),
			ram = (totalmem-freemem)/1024/1024
		try {
			let res = await citnut.tools.getapi("girl",data,false)

			let hoatdong = ""
			hoatdong+=(day>0)?`${day} ngày\n`:""
			hoatdong+=(hours>0)?`${hours} giờ\n`:""
			hoatdong+=(minutes>0)?`${minutes} phút\n`:""
			hoatdong+=seconds+" giây"

			const emb = citnut.defaultemb(`bot đã hoạt động được:\n${hoatdong}\n> Prefix: ${prefix}\n> Ram đang sử dụng: ${ram.toFixed(1)}MB\n> Ping: ${Date.now() - timeStart}ms`)
	
			return data.reply({embeds:[!res?emb:emb.setThumbnail(res)],allowedMentions:citnut.allowedMentions})		
		}catch (e) {
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}