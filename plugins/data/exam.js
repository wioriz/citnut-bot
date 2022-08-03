//nên require modules ở trên này

// const { SlashCommandBuilder } = require("@discordjs/builders")
// bật phần require SlashCommandBuilder nếu cần làm slash cmd

const command = [""], description = ""

module.exports = {
	command,//từ khoá của plugin
	author: "",//tên tác giả
	description,//mô tả
	guide: "",//tóm tắt hướng dẫn sử dụng
    permission: false,// admin | adminsv | false
    allowInteraction: false,//tương tác khác, vd: các nút ấn
	allowListening: false,//luôn lắng nghe (noprefix)
	/*dành cho slash command*/
	slashmode: false,
	slashconfig: new SlashCommandBuilder()
		.setName(command[0])
		.setDescription(description)
	,
	async slashHandle (data, db) {},
	/*=======================*/
    async interaction (data, db) {
        let {customId} = data
        if (!data.isButton()) return
		//code
	},
	async listen (data,db) {
        //code (noprefix)
	},
	async call (data,db) {
		
        //code khi được gọi đến
	}
}
