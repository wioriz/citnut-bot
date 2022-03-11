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
    config.api.dovui = ["https://manhict.tech/game/dovuiv1", ["data"]]
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
    async interaction (data) {
        let {customId} = data
        if (!data.isButton()||!["aa","bb","cc","dd"].includes(customId)) return
        const {get} = citnut.tools.db
        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})

        const checkdapan = (luachon,datagame) => {
            let {cauhoi,a,b,c,d,dapan} = datagame

            if (luachon == dapan) {
		        data.update({embeds:[citnut.defaultemb(cauhoi).setThumbnail(avt).setFooter({text:data.user.tag+" đã trả lời chính xác "+"("+luachon+")",iconURL:avt})], allowedMentions,components:[]})
            }else {
		        data.update({embeds:[citnut.defaultemb(cauhoi).setThumbnail(avt).setFooter({text:data.user.tag+" đã trả lời sai "+"("+luachon+")",iconURL:avt})], allowedMentions, components: [row(a,b,c,d)]})
            }
        }
        let {dapan,thoigian} = get.game.dovui[data.message.channelId]
        let time = new Date
        let now = time.getTime()
        let cd = round((thoigian-now)/1000,0)
        if (cd<=0) return data.update({embeds:[citnut.defaultemb("Đã hết thời gian chờ câu trả lời").setTitle("Đáp án là "+dapan)],allowedMentions, components:[]})
     

        switch (customId) {
            case "aa":
                checkdapan("A",get.game.dovui[data.message.channelId])
            break
            case "bb":
                checkdapan("B",get.game.dovui[data.message.channelId])
            break
            case "cc":
                checkdapan("C",get.game.dovui[data.message.channelId])
            break
            case "dd":
                checkdapan("D",get.game.dovui[data.message.channelId])
            break
            default:
            break
        }
    },
	async listen (data,db) {
        const {get,write} = db
        if (!get.game) {
            get.game = {}
            write(get)
        }
        if (!get.game.dovui){
            get.game.dovui = {}
            write(get)
        }
        if (!get.game.dovui[data.channel.id]){
            get.game.dovui[data.channel.id] = {
                thoigian:0
            }
            write(get)
        }

	},
	async call (data,db) {
        const {cauhoi,a,b,c,d,dapan1} = await citnut.tools.getapi("dovui",data,false)
        const {get,write} = db
        let time = new Date
        let now = time.getTime()
        let cd = round((get.game.dovui[data.channel.id].thoigian-now)/1000,0)
        if (cd>0) return data.reply({embeds:[citnut.defaultemb("Thời gian chờ câu trả lời").setTitle("Còn "+cd+"s!")],allowedMentions})
		data.reply({embeds:[citnut.defaultemb(cauhoi)], allowedMentions, components: [row(a,b,c,d)]})
        get.game.dovui[data.channel.id] = {
            cauhoi,a,b,c,d,dapan:dapan1,
            thoigian:now+(citnut.config.cd.dovui*1000)
        }
        write(get)
	}
}