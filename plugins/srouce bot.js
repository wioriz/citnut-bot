module.exports = {
	command: ["srouce", "src"],
	author: "Citnut",
	description: "xem srouce gốc của bot",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		citnut.send("https://github.com/Citnut/demoProject",data)
	}
}