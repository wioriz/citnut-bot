
module.exports = {
	command: ["cadao"],
	author: "Citnut",
	description: "ca dao VN",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		const res = await citnut.tools.getapi("cadao",data,false)
		const emb = new citnut.Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(res)
			.setAuthor({name:"Citnut bot",iconURL:"https://i.imgur.com/wtcUCqn_d.webp?maxwidth=760&fidelity=grand",url:"https://discord.com/api/oauth2/authorize?client_id=896023318690402395&permissions=0&scope=bot"})
		if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)
		return citnut.send({embeds:[emb]}, data)
	}
}