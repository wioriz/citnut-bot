module.exports = {
	command: ["set","let"],
	author: "Citnut",
    permission: "admin",// admin | adminsv | false
	description: "chỉnh sửa tiền",
	guide: "<+|-|=> <value> [@mention]",
	allowListening: false,
	async listen (data,db) {
        
	},
	async call (data,db) {
        let allowedMentions = citnut.allowedMentions
        if (!citnut.config.admin.includes(data.author.id)) return data.reply({embeds:[citnut.defaultemb("bạn không đủ quyền sử dụng lệnh này")],allowedMentions})
      
        let errmsg = {embeds:[citnut.defaultemb("vui lòng xem hướng dẫn tại "+citnut.config.prefix+"help set").setTitle("Sai phương thức!")],allowedMentions}
        let args =  data.content.split(" ")
       
        let method = ["+","-","="]
        let _method = args[1]
        let value = Number(args[2])
        if (!method.includes(_method) || !_method) return data.reply(errmsg)
        if (!value) return data.reply(errmsg)
        let mention = args[3].slice(3,-1)
        if (!mention || !db.user[mention]) return data.reply(errmsg)
        let avt = (data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        
        switch (_method) {
            case "+":
                db.user[mention].money += value
            break
            case "-":
                db.user[mention].money -= value
            break
            case "=":
                db.user[mention].money = value
            break
            default:
            break
        }

        data.reply({embeds:[citnut.defaultemb("số dư của "+args[3]+" "+_method+" "+value).setThumbnail(avt)],allowedMentions})
    }
}
