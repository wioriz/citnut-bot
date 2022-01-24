
module.exports = {
	command: ["cadao"],
	author: "Citnut",
	description: "ca dao VN",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const res = await citnut.getapi("cadao",data,false)

		if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)
		return citnut.send("`"+res+"`", data)
	}
}