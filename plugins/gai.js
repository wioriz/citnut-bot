const fetch = require("node-fetch")

module.exports = {
	command: ["girl", "gái"],
	author: "Citnut",
	description: "mlem",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const { send } = citnut;
		const res = await citnut.getapi("girl",data,false)
		if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)
		try {
			let r = await fetch(res);
			let attachment = await r.buffer();

			return send({
				files: [{
					name: "girl.jpg",
					attachment
				}]
			}, data)
		} catch (e) {			
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}