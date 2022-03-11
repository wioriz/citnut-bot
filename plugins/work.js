const {round,random} = citnut.tools
module.exports = {
	command: ["work"],
	author: "Citnut",
	description: "kiếm tiền",
	guide: "",
	allowListening: false,
    async workfunc (data,id, avt) {
        let {get,write} = citnut.tools.db
        const {work,cooldown} = await citnut.tools.getapi("eco",data,false)
        const time = new Date
        
        if (time.getTime() < get.eco.work[id] + (cooldown.work * 1000)) {
            let cd = (get.eco.work[id] + (cooldown.work * 1000)) - time.getTime()
            return {embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
        }else {
            get.eco.work[id] = time.getTime()
            let payout = round(random(work.min, work.max), 0)
            get.user[id].money += payout
            await write(get)
            return {embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
        }
    },
	async listen (data,db) {
	},
	async call (data,db) {
		return data.reply(await this.workfunc(data, data.author.id, (data.author).displayAvatarURL({size: 1024, dynamic: true})))
	}
}