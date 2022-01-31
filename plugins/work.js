const {round,random} = citnut.tools
module.exports = {
	command: ["work"],
	author: "Citnut",
	description: "kiếm tiền",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		const {work,cooldown} = await citnut.tools.getapi("eco",data,false)
		if (!work) return citnut.send("`"+"chưa có api này trong config"+"`", data)
        let {get,write} = db
        const time = new Date
        
        if (time.getTime() < get.eco.work[data.author.id] + (cooldown.work * 1000)) {
            let cd = (get.eco.work[data.author.id] + (cooldown.work * 1000)) - time.getTime()
            data.reply({embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`)],allowedMentions:citnut.allowedMentions})
        }else {
            get.eco.work[data.author.id] = time.getTime()
            let payout = round(random(work.min, work.max), 0)
            get.user[data.author.id].money += payout
            await write(get)
            await data.reply({embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${get.user[data.author.id].money} 💵`)],allowedMentions:citnut.allowedMentions})
        }
	}
}