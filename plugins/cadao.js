const axios = require("axios");
module.exports = {
	command: ["cadao", "tucngu"],
	author: "Citnut",
	description: "ca dao, tục ngữ, api của Mai Huy Bảo",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const res = await axios.get(`https://api.vangbanlanhat.tk/other?type=cadao`);
		return citnut.send("`"+res.data.data+"`", data)
	}
}