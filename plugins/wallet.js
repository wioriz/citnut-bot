
module.exports = {
	command: ["wallet"],
	author: "Citnut",
	description: "ví của bạn",
	guide: "",
	allowListening: true,
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
	async call (data,db) {
        let tag = citnut.tools.getParam(data.content)
        let avt = (data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        if(tag.includes("@")) {
            let id = tag.slice(3,-1)
            if(!db.user[id]) return data.reply({embeds:[citnut.defaultemb(`id: ${data.author.id}\n> chưa có thông tin về người dùng này`)],allowedMentions:citnut.allowedMentions})
            return data.reply({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của người dùng này là ${db.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})

        }else {
            return data.reply({embeds:[citnut.defaultemb(`id: ${data.author.id}\n> số dư của bạn là ${db.user[data.author.id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
	    }
    }
}
