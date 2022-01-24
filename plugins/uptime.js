const pidusage = require("pidusage");
const axios = require('axios');
const fetch = require("node-fetch");
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
	async listen (data) {
	},
	async call (data) {
		const { send } = citnut;
		let prefix = citnut.config.prefix,
			time = process.uptime(),
			day = Math.floor(time/(60*60*24)),
			hours = Math.floor((time / (60 * 60)) - (day*24)),
			minutes = Math.floor((time % (60 * 60)) / 60),
			seconds = Math.floor(time % 60),
			timeStart = Date.now(),
			cpuuu = await pidusage(process.pid);
		try {
			let res = await citnut.getapi("girl",data,false)
			if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)

			let r = await fetch(res),
				attachment = await r.buffer();
			send("```"+`bot đã hoạt động được ${day} ngày ${hours} giờ ${minutes} phút ${seconds} giây.\n🐳Prefix: ${prefix}\n🐳Cpu đang sử dụng: ${cpuuu.cpu.toFixed(1)}\n🐳Ram đang sử dụng: ${byte2mb(cpuuu.memory)}\n🐳Ping: ${Date.now() - timeStart}ms`+"```", data);
			send({
				files: [{
					name: `uptime.jpg`,
					attachment
				}]
			}, data)
		}catch (e) {
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}