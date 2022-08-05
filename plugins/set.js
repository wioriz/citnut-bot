const { SlashCommandBuilder } = require("@discordjs/builders")
const command = ["set"], description = "chỉnh sửa số dư trong ví"
module.exports = {
	command,
	author: "Citnut",
    permission: "admin",// admin | adminsv | false
	description,
	guide: "<+|-|=> <value> [@mention]",
	allowListening: false,
    slashmode: true,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
        .addStringOption(options => options
            .setName("method")   
            .setDescription("lựa chọn 1 trong những kí tự sau: + - =")
            .addChoices(
                {name: "+ (cộng tiền)", value: "+"},
                {name: "- (trừ tiền)", value: "-"},
                {name: "= (đặt giá trị mới cho ví)", value: "="}
            )
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName("value")   
            .setDescription("số tiền bạn muốn")
            .setRequired(true)
        )
        .addUserOption(options => options
            .setName("tag")   
            .setDescription("tag 1 người")
            .setRequired(true)
        )
	,
	async slashHandle (data, db) {
        const options = data.options._hoistedOptions
        const _args = ["", options.find(e => e.name == "method").value, options.find(e => e.name == "value").value, options.find(e => e.name == "tag").value]
        return await this.call(data,db,data.user.id,_args,(data.user).displayAvatarURL({size: 1024, dynamic: true}))
    },
	async listen (data,db) {},
	async call (data,db,_uid,_args,_avt) {
        let uid = _uid || data.author.id
        let allowedMentions = citnut.allowedMentions
        if (!citnut.config.admin.includes(uid)) return data.reply({embeds:[citnut.defaultemb("bạn không đủ quyền sử dụng lệnh này")],allowedMentions})
      
        let errmsg = {embeds:[citnut.defaultemb("vui lòng xem hướng dẫn tại "+citnut.config.prefix+"help set").setTitle("Sai phương thức!")],allowedMentions}
        let args =  _args?_args:data.content.split(" ")
       
        let method = ["+","-","="]
        let _method = args[1].toString()
        let value = Number(args[2])
        if (!method.includes(_method) || !_method) return data.reply(errmsg)
        if (!value) return data.reply(errmsg)
        let mention = args[3]
        if (mention.startsWith("<@") && mention.endsWith(">")) {mention.slice(3,-1)} else
        if (mention.startsWith("!")) mention.slice(1)
        if (!mention || !db.user[mention]) return data.reply(errmsg)
        let avt = _avt?_avt:(data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        
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
