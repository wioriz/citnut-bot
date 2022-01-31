const {round,random} = citnut.tools
module.exports = {
	command: ["crime"],
	author: "Citnut",
	description: "kiếm tiền :>",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		const {crime,cooldown} = await citnut.tools.getapi("eco",data,false)
		if (!crime) return citnut.send("`"+"chưa có api này trong config"+"`", data)
        let {get,write} = db
        const time = new Date
        const rate = [true,false]
        
        if (time.getTime() < get.eco.crime[data.author.id] + (cooldown.crime * 1000)) {
            let cd = (get.eco.crime[data.author.id] + (cooldown.crime * 1000)) - time.getTime()
            data.reply({embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`)],allowedMentions:citnut.allowedMentions})
        }else {
            get.eco.crime[data.author.id] = time.getTime()
            if(rate[round(random(0,1),0)]) {
                let payout = round(random(crime.min, crime.max), 0)
                get.user[data.author.id].money += payout
                await write(get)
                await data.reply({embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${get.user[data.author.id].money} 💵`)],allowedMentions:citnut.allowedMentions})
            }else {
                let payout = round(random(crime.lose.min, crime.lose.max), 0)
                get.user[data.author.id].money -= payout
                await write(get)
                await data.reply({embeds:[citnut.defaultemb(`| -${payout} 💵 | ví của bạn có: ${get.user[data.author.id].money} 💵`)],allowedMentions:citnut.allowedMentions})
            }
        }
	}
}