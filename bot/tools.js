const fs = require('fs')
const axios = require("axios")
const childProcess = require('child_process')
const colors = require("colors")

const getParam = text => {
	return text
		.split(' ')
		.slice(1)
		.join(' ')
}

const getKeyword = text => {
	return text
		.split(' ')
		.slice(0, 1)[0]
		.slice(1)
}

const getFile = filePath => {
	return fs.createReadStream(filePath)
}

const execShellCommand = (cmd) => {
    return new Promise((resolve) => {
        childProcess.exec(cmd, (error, stdout, stderr) =>
            resolve(stdout ? stdout : stderr)
        )
    })
}

const round = (number, amount) => {
    return parseFloat(Number(number).toFixed(amount))
}

const random = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1) + start)
}

const checkupdate = async (version) => {
	const {data} = await axios.get('https://raw.githubusercontent.com/Citnut/citnut-bot/main/package.json');
		
	if (data.version != version) {
		const {data: info} = await axios.get('https://api.github.com/repos/Citnut/demoProject/git/refs/heads/main');
		const {data: commit} = await axios.get(info.object.url);
			
		console.log(` [UPDATE] Đã có phiên bản mới: ${data.version}, phiên bản hiện tại: ${version}, go "npm run update" để cập nhật!`.yellow);
		console.log(` [UPDATE] Nội dung cập nhật: ${commit.message}`.yellow)
	}else { console.log(" [UPDATE] Bạn đang sử dụng phiên bản mới nhất".yellow) }
}

const accesobj = (arr, obj) => {
	try {
		if (!arr || arr[0] == "") return obj
		let res = ""
		for (all of arr) {
			if (obj[all]) { res = obj[all] } else { res = res[all]}
		}
		
		return res
	} catch (e) {console.error}
}
const getapi = async (apiname, bot, options) => {
	try {			
		const {data} = await axios.get(citnut.config.api[apiname][0]+(options?options:""))
		return accesobj(citnut.config.api[apiname][1],data)
	} catch (e) {
		console.log(" [API] error".red,(apiname+(options?options:"")+" "+e).yellow)

		return false
	}
	
}

const checkfile = (file, data) => {
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, data)
		console.log(" [CITNUT] đã khởi tạo thành công file".yellow,file)
	} else {console.log(" [CITNUT] đã phát hiện file".yellow,file)}
}
checkfile("./data.json", JSON.stringify(require("./defaultdata.json"),null,2))


const db = () => JSON.parse(fs.readFileSync("./data.json", {encoding: "utf-8"}))


module.exports = {
	getParam,
	getKeyword,
	getFile,
	execShellCommand,
	round,
	random,
	checkupdate,
	accesobj,
	getapi,
	checkfile,
	db
}
