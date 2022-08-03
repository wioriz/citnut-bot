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
            .setName("tag")
            .setDescription("tag người dùng nào đó")
        )
	,
	async slashHandle (data, db) {const tag = data.options._hoistedOptions[0]?.value||false;return await this.call(data,db,tag,data.user,(data.user).displayAvatarURL({size: 1024, dynamic: true}))},
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
	async call (data,db,_tag,user,_avt) {
        let tag, id = null
        let avt = _avt?_avt:(data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        if(data.content) {tag = data.content.split(" ")[1]} else
        if(_tag) {tag = _tag} else
        if(!tag) return data.reply({embeds:[citnut.defaultemb(`id: ${user?user.id:data.author.id}\n> số dư của bạn là ${db.user[user?user.id:data.author.id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
        if(tag.startsWith("<@") && tag.endsWith(">")) {id = tag.slice(3,-1)} else
        if(tag.startsWith("!")){ id = tag.slice(1)} else id = tag.toString()

        if(!db.user[id]) return data.reply({embeds:[citnut.defaultemb(`id: ${_tag?_tag:id}\n> chưa có thông tin về người dùng này`)],allowedMentions:citnut.allowedMentions})
        return data.reply({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của người dùng này là ${db.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
      
    }
}
