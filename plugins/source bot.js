module.exports = {
	command: ["srouce", "src"],
	author: "Citnut",
	description: "xem srouce gốc của bot",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		return data.reply({content:"https://github.com/Citnut/demoProject",allowedMentions:citnut.allowedMentions})		
	}
}