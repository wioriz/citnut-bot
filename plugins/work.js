const {round,random} = citnut.tools
module.exports = {
	command: ["work"],
	author: "Citnut",
	description: "kiếm tiền",
	guide: "",
	allowListening: false,
    async workfunc (data,id, avt, db) {
        const {work,cooldown} = await citnut.tools.getapi("eco",data,false)
        const time = new Date
        
        if (time.getTime() < db.eco.work[id] + (cooldown.work * 1000)) {
            let cd = (db.eco.work[id] + (cooldown.work * 1000)) - time.getTime()
            return {embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
        }else {
            db.eco.work[id] = time.getTime()
            let payout = round(random(work.min, work.max), 0)
            db.user[id].money += payout
            
            return {embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${db.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions}
        }
    },
	async listen (data,db) {
	},
	async call (data,db) {
		return data.reply(await this.workfunc(data, data.author.id, (data.author).displayAvatarURL({size: 1024, dynamic: true}), db))
	}
}