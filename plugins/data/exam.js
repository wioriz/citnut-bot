//nên require modules ở trên này

module.exports = {
	command: [""],//từ khoá của plugin
	author: "",//tên tác giả
	description: "",//mô tả
	guide: "",//tóm tắt hướng dẫn sử dụng
	allowListening: false,//luôn lắng nghe (noprefix)
	async listen (data,db) {
        //code (noprefix)
	},
	async call (data,db) {
        //code khi được gọi đến
	}
}