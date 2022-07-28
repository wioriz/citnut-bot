//nên require modules ở trên này

module.exports = {
	command: [""],//từ khoá của plugin
	author: "",//tên tác giả
	description: "",//mô tả
	guide: "",//tóm tắt hướng dẫn sử dụng
    permission: false,// admin | adminsv | false
    allowInteraction: false,//tương tăc khác, vd: các nút ấn
	allowListening: false,//luôn lắng nghe (noprefix)
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
