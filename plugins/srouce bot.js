module.exports = {
	command: ["srouce", "src"],
	author: "Citnut",
	description: "xem srouce gốc của bot",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		citnut.send("https://github.com/Citnut/demoProject",data)
	}
}