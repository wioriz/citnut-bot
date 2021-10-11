const axios = require("axios");
const fetch = require("node-fetch");
module.exports = {
	command: ["cosplay"],
	author: "Citnut",
	description: "plugin này dùng api của Mai Huy Bảo",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const res = await axios.get(`https://api.vangbanlanhat.tk/image?type=cosplay`);

		let r = await fetch(res.data.data);
		let attachment = await r.buffer();
		return citnut.send({
			files: [{
				name: "cosplay.jpg",
				attachment
			}]
		}, data)
	}
}