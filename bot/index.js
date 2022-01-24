const recursive = require("recursive-readdir")
const colors = require("colors")
const axios = require("axios")
const tools = require("./tools.js")
const config = require("../config.json")
const Discord = require("discord.js")
const bot = new Discord.Client()
//console.table(config);

bot.on("warn", console.warn)
bot.on("error", console.error)
bot.on("ready", function(){
	console.log(` [CITNUT] đăng nhập thành công:`.green, `${bot.user.tag}\n`.magenta, `[CITNUT] prefix: ${citnut.config.prefix}`.green);
})

globalThis.citnut = {
	config,
	tools,
	send: async function (replyMSG, message) {
		try { message.channel.send(replyMSG) } catch (e) { console.error(e) }
	},
	plugin: async function () {
		let data = []
		let allcommand = []
		const list = await recursive("./plugins", ["data"])
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
	"getapi": async function (apiname, bot, options) {
		if (!citnut.config.api[apiname][0]) { return false }
		try {
			if (!options) { 
				let {data} = await axios.get(citnut.config.api[apiname][0])
				return citnut.tools.accesapi(citnut.config.api[apiname][1],data)
			} else {				
				let {data} = await axios.get(citnut.config.api[apiname][0]+options)
				return citnut.tools.accesapi(citnut.config.api[apiname][1],data)
			}
		} catch (e) {
			console.error(e)
			citnut.send("`"+`api ${apiname} đã bị lỗi`+"`", bot)
		}
	}
};

async function run () {
	try {
		console.log(
			`	 ██ █ ███ █  █ █ █ ███\n`.green+
			`	█   █  █  ██ █ █ █  █\n`.green+
			`	█   █  █  █ ██ █ █  █\n`.green+
			`	 ██ █  █  █  █ ███  █\n`.green
		);
		let files = await citnut.plugin()
		let table = []
		let load = files.data
		for (const file of load) {
			table.push({"tệp": file.path.slice(8), "từ khóa": file.item.command, "tác giả": file.item.author, "luôn lắng nghe": (file.item.allowListening ? "có" : "không")});
		};

		console.log(` [CITNUT] danh sách plugin:`.yellow)
		console.table(table)
		citnut.tools.checkupdate(require("../package.json").version)
		//console.log(files.allcommand);
		let errmsg = "```"+`Lệnh bạn sử dụng không tồn tại!\n(╯°□°）╯︵ ┻━┻\nĐể hiển thị danh sách lệnh sử dụng ${citnut.config.prefix}help`+"```";

		bot.login(citnut.config.token)
		bot.on("message", async message => {
			if (!message.author.bot && message.content.indexOf(citnut.config.prefix) == 0) {
				console.log(`${message.author.tag}`.yellow,`đã sử dụng lệnh tại`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
			} else {
				console.log(`${message.author.tag}`.yellow,`đã gửi tin nhắn đến`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
			}

			let keyword = citnut.tools.getKeyword(message.content)
			let checkkeyw = []
			for (const index of load) {
				if (message.content.indexOf(citnut.config.prefix) == 0 && index.item.command.includes(keyword)) {
					checkkeyw.push(true)			
					await index.item.call(message)
				} else { checkkeyw.push(false) }
									
				if (index.item.allowListening) {
					await index.item.listen(message)
				}
			}
			if (message.content == citnut.config.prefix) { return citnut.send(errmsg, message) }
			if (!checkkeyw.includes(true) && message.content.indexOf(citnut.config.prefix) == 0) { return citnut.send(errmsg, message)}
		})
	} catch (e) { console.error(e) }
}

run()