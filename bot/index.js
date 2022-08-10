const colors = require("colors")
const axios = require("axios")
const tools = require("./tools.js")
tools.checkfile("./config.json",JSON.stringify(require("./defaultconfig.json"),null,2))
const config = require("../config.json")
const {Client, Intents, MessageEmbed} = require("discord.js")
const bot = new Client({partials: ["CHANNEL"],intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES]})
const fakesv = require("./fakesv.js")
const recursive = require("recursive-readdir")
const {writeFileSync} = require("fs")

bot.on("warn", console.warn)
bot.on("error", console.error)
bot.on("ready", async () =>{
	bot.user.setActivity((config.prefix+"help"),{type:2})
	const slashplugin = await citnut.plugin()
	let available = []
	for (const data of slashplugin.data) {
		if (data.item.slashmode) available.push((data.item.slashconfig).toJSON())
	}
	bot.application.commands.set(available)
	console.log(` [CITNUT] đăng nhập thành công:`.green, `${bot.user.tag}\n`.magenta, `[CITNUT] prefix: ${citnut.config.prefix}`.green)
	fakesv()
    console.log(" [CITNUT] đã tạo thành công trang web giả của bot".green)
})


globalThis.citnut = {
	config,
	tools,
	send: function (replyMSG, message) {return message.reply({embeds:[citnut.defaultemb(replyMSG)], allowedMentions:citnut.allowedMentions})},
	plugin: async function () {
		let data = []
		let allcommand = []
		const list = await recursive(config.pluginsDir, ["data"])
		try {
			for (const files of list) {
				const item = require(`../${files}`)
				data.push({item, path: files})
			}
			for (const all of data) {
				allcommand.push(all.item.command[0])
			}
		} catch (e) { console.error(e) }
		return {
			list,
			allcommand,
			data
		}
	},
	"defaultemb": (msg) => {
		const emb = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(msg)
			.setAuthor({name:"Citnut bot",iconURL:"https://i.imgur.com/wtcUCqn_d.webp?maxwidth=760&fidelity=grand",url:"https://discord.com/api/oauth2/authorize?client_id=896023318690402395&permissions=0&scope=bot"})
		return emb
	},
	"allowedMentions": { repliedUser: false }
}

async function run () {
	try {
		console.log(
			`	 ██ █ ███ █  █ █ █ ███\n`.green+
			`	█   █  █  ██ █ █ █  █\n`.green+
			`	█   █  █  █ ██ █ █  █\n`.green+
			`	 ██ █  █  █  █ ███  █\n`.green
		)
		let files = await citnut.plugin()
		let load = files.data

		console.log(` [CITNUT]`.yellow,`plugin loading:`.green)
		for (const file of load) { console.log(" [CITNUT] plugin".green,`${file.item.command[0]}(${file.item.description})`.yellow,"by".green,`${file.item.author}`.yellow) }
		console.log(` [CITNUT]`.yellow,`plugin loaded!`.green)
		
		citnut.tools.checkupdate(require("../package.json").version)
		let errmsg = `Lệnh bạn sử dụng không tồn tại!\n> sử dụng ${citnut.config.prefix}help\n> để hiển thị danh sách lệnh `
		const emb = citnut.defaultemb(errmsg)
		bot.login(citnut.config.token)
		bot.on("interactionCreate", async interaction => { 
			if (!db.user[interaction.user.id] || typeof db.user[interaction.user.id] != "object") {
				db.user[interaction.user.id] = {
					tag: interaction.user.username,
					money: 0
				}
			}
			if (db.user[interaction.user.id].mutesv || db.user[interaction.user.id].mute) return
			for (const index of load) {
				if (index.item.allowInteraction) await index.item.interaction(interaction, db)
				if (index.item.slashmode && interaction.isCommand() && interaction.commandName == index.item.command[0]) await index.item.slashHandle(interaction, db)
			}

		})
		bot.on("messageCreate", async message => {
			if (!message.author.bot && message.content.indexOf(citnut.config.prefix) == 0) {
				console.log(" [CITNUT]".green,`${message.author.tag}`.yellow,`>use cmd>`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
			} else {
				console.log(" [CITNUT]".green,`${message.author.tag}`.yellow,`>send msg>`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
			}
			if (!db.user[message.author.id] || typeof db.user[message.author.id] != "object") {
				db.user[message.author.id] = {
					tag: message.author.tag,
					money: 0
				}
			}
			if (db.user[message.author.id].mutesv || db.user[message.author.id].mute) return

			let keyword = citnut.tools.getKeyword(message.content)
			for (const index of load) {
				if (index.item.allowListening) {
					await index.item.listen (message,db)
				}
			}
			if (message.content == citnut.config.prefix) { return message.reply({embeds:[emb], allowedMentions: citnut.allowedMentions}) }
			if (message.content.startsWith(citnut.config.prefix)) {
				let findcmd = load.find(index => index.item.command.includes(keyword))
				if (findcmd) {await findcmd.item.call(message,db)}
				else {return message.reply({embeds:[emb], allowedMentions: citnut.allowedMentions})}
			}
		
		})

	} catch (e) { console.error(e) }
}

let db = tools.db()
let save = () => writeFileSync("./data.json", JSON.stringify(db))
run()
setInterval(save, 5000)

globalThis.bot = bot
