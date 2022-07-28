const {MessageActionRow, MessageButton} = citnut.Discord
const {round} = citnut.tools
const {allowedMentions} = citnut

let config = require("../config.json")
if (!config.cd) {
    config.cd = {}
}
if (!config.cd["dovui"]) {
    config.cd["dovui"] = 30
}
if (!config.api.dovui) {
    config.api.dovui = ["https://manhict.tech/api/dovui1?apikey=H8ew2W6e", ["result"]]
}

const row = (a,b,c,d) => {
    return new MessageActionRow().addComponents(
    new MessageButton().setCustomId('aa').setLabel(a).setStyle('PRIMARY'),
    new MessageButton().setCustomId('bb').setLabel(b).setStyle('PRIMARY'),
    new MessageButton().setCustomId('cc').setLabel(c).setStyle('PRIMARY'),
    new MessageButton().setCustomId('dd').setLabel(d).setStyle('PRIMARY')
    )
}
module.exports = {
	command: ["dovui"],
	author: "Citnut",
	description: "test",
	guide: "",
	allowListening: true,
    allowInteraction: true,
    async interaction (data, db) {
        let {customId} = data
        if (!data.isButton()||!["aa","bb","cc","dd"].includes(customId)) return
        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})

        const checkdapan = (luachon,datagame) => {
            let {questions,a,b,c,d,dapan} = datagame

            if (datagame[luachon] == dapan) {
		        data.update({embeds:[citnut.defaultemb(questions).setThumbnail(avt).setFooter({text:data.user.tag+" đã trả lời chính xác "+"("+luachon+")",iconURL:avt})], components:[]})
            }else {
		        data.update({embeds:[citnut.defaultemb(questions).setThumbnail(avt).setFooter({text:data.user.tag+" đã trả lời sai "+"("+luachon+")",iconURL:avt})]})
            }
        }
        let {dapan,thoigian} = db.game.dovui[data.message.channelId]
        let time = new Date
        let now = time.getTime()
        let cd = round((thoigian-now)/1000,0)
        if (cd<=0) return data.update({embeds:[citnut.defaultemb("Đã hết thời gian chờ câu trả lời").setTitle("Đáp án là "+dapan)], components:[]})
     

        switch (customId) {
            case "aa":
                checkdapan("A",db.game.dovui[data.message.channelId])
            break
            case "bb":
                checkdapan("B",db.game.dovui[data.message.channelId])
            break
            case "cc":
                checkdapan("C",db.game.dovui[data.message.channelId])
            break
            case "dd":
                checkdapan("D",db.game.dovui[data.message.channelId])
            break
            default:
            break
        }
    },
	async listen (data,db) {
        if (!db.game) {
            db.game = {}
            
        }
        if (!db.game.dovui){
            db.game.dovui = {}
            
        }
        if (!db.game.dovui[data.channel.id]){
            db.game.dovui[data.channel.id] = {
                thoigian:0
            }
            
        }

	},
	async call (data,db) {
        const {questions,a,b,c,d,dapan} = await citnut.tools.getapi("dovui",data,false)
        let time = new Date
        let now = time.getTime()
        let cd = round((db.game.dovui[data.channel.id].thoigian-now)/1000,0)
        if (cd>0) return data.reply({embeds:[citnut.defaultemb("Thời gian chờ câu trả lời").setTitle("Còn "+cd+"s!")],allowedMentions})
		data.reply({embeds:[citnut.defaultemb(questions)], allowedMentions, components: [row(a,b,c,d)]})
        db.game.dovui[data.channel.id] = {
            questions,"A":a,"B":b,"C":c,"D":d,dapan,
            thoigian:now+(citnut.config.cd.dovui*1000)
        }
	}
}