const { SlashCommandBuilder } = require("@discordjs/builders")
const command = ["wallet"], description = "ví của bạn"
module.exports = {
	command,
	author: "Citnut",
	description,
	guide: "",
	allowListening: true,
    slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
        .addStringOption(str => str
            .setName("id")
            .setDescription("id người nào đó")
        )
        .addUserOption(options => options
            .setName("mention")
            .setDescription("mention người dùng nào đó")
        )
	,
	async slashHandle (data, db) {
        const mention = data.options._hoistedOptions[0]?.value||false
        return await this.call(data,db,mention,data.user,(data.user).displayAvatarURL({size: 1024, dynamic: true}))
    },
	async listen (data,db) {
        if (data.author.bot) return
        if(data.content){
            db.total.msg+=1
             
        }
        if (!db.eco) {
            db.eco = {}
             
        }
        if (!db.eco.work) {
            db.eco.work = {}
             
        }
        if (!db.eco.work[data.author.id]) {
            db.eco.work[data.author.id] = 0
             
        }
        if (!db.eco.crime) {
            db.eco.crime = {}
             
        }
        if(!db.eco.crime[data.author.id]) {
            db.eco.crime[data.author.id] = 0
             
        }
	},
	async call (data,db,_mention,user,_avt) {
        let mention, id = null
        let avt = _avt?_avt:(data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        mention = (() => {try {return data.mentions.users.first() ? data.mentions.users.first().id : _mention}catch {return _mention}})()
        
        if(!mention) return data.reply({embeds:[citnut.defaultemb(`id: ${user?user.id:data.author.id}\n> số dư của bạn là ${db.user[user?user.id:data.author.id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
        if(mention.startsWith("<@") && mention.endsWith(">")) {id = mention.slice(3,-1)} else
        if(mention.startsWith("!")){ id = mention.slice(1)} else id = mention.toString()

        if(!db.user[id]) return data.reply({embeds:[citnut.defaultemb(`id: ${_mention?_mention:id}\n> chưa có thông tin về người dùng này`)],allowedMentions:citnut.allowedMentions})
        return data.reply({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của người dùng này là ${db.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
      
    }
}
