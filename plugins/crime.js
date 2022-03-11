const {round,random} = citnut.tools
module.exports = {
	command: ["crime"],
	author: "Citnut",
	description: "kiếm tiền :>",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async crimefunc (data,id,avt) {
		const {crime,cooldown} = await citnut.tools.getapi("eco",data,false)
        let {get,write} =  citnut.tools.db
        const time = new Date
        const rate = [true,false]
        if (time.getTime() < get.eco.crime[id] + (cooldown.crime * 1000)) {
            let cd = (get.eco.crime[id] + (cooldown.crime * 1000)) - time.getTime()
            return {embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
        }else {
            get.eco.crime[id] = time.getTime()
            if(rate[round(random(0,1),0)]) {
                let payout = round(random(crime.min, crime.max), 0)
                get.user[id].money += payout
                await write(get)
                return {embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
            }else {
                let payout = round(random(crime.lose.min, crime.lose.max), 0)
                get.user[id].money -= payout
                await write(get)
                return {embeds:[citnut.defaultemb(`| -${payout} 💵 | ví của bạn có: ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
            }
        }
	},
    async call (data, db) {       
        data.reply(await this.crimefunc(data,data.author.id,(data.author).displayAvatarURL({size: 1024, dynamic: true})))
    }
}