module.exports = {
	command: ["source", "src"],
	author: "Citnut",
	description: "xem source của bot ở đâu",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		citnut.send("https://github.com/Citnut/demoProject",data)
	}
}