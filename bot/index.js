const colors = require("colors")
const axios = require("axios")
const tools = require("./tools.js")
tools.checkfile("./config.json",JSON.stringify(require("./defaultconfig.json"),null,2))
const config = require("../config.json")
const Discord = require("discord.js")
const bot = new Discord.Client()
const fakesv = require("./fakesv.js")
const recursive = require("recursive-readdir")

bot.on("warn", console.warn)
bot.on("error", console.error)
bot.on("ready", function(){
	console.log(` [CITNUT] đăng nhập thành công:`.green, `${bot.user.tag}\n`.magenta, `[CITNUT] prefix: ${citnut.config.prefix}`.green)
	fakesv()
    console.log(" [CITNUT] đã tạo thành công trang web giả của bot".green)
})


globalThis.citnut = {
	config,
	tools,
	send: function (replyMSG, message) {
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
	}
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
		//console.log(citnut.config
		
		console.log(` [CITNUT]`.yellow,`plugin loading:`.green)
		for (const file of load) { console.log(" [CITNUT] plugin".green,`${file.item.command[0]}(${file.item.description})`.yellow,"by".green,`${file.item.author}`.yellow) }
		console.log(` [CITNUT]`.yellow,`plugin loaded!`.green)
		
		citnut.tools.checkupdate(require("../package.json").version)
		let errmsg = "```"+`Lệnh bạn sử dụng không tồn tại!\n(╯°□°）╯︵ ┻━┻\nĐể hiển thị danh sách lệnh sử dụng ${citnut.config.prefix}help`+"```"

		bot.login(citnut.config.token)
		bot.on("message", async message => {
			if (!message.author.bot && message.content.indexOf(citnut.config.prefix) == 0) {
				console.log(" [CITNUT]".green,`${message.author.tag}`.yellow,`>use cmd>`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
			} else {
				console.log(" [CITNUT]".green,`${message.author.tag}`.yellow,`>send msg>`.green,`${message.channel.name}`.yellow,`: ${message.content}${(message.attachments.size > 0) ? message.attachments : ""}`.green)
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