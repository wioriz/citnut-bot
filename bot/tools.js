const fs = require('fs')
const axios = require("axios")

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

const checkupdate = (version) => {
	const {data} = await axios.get('https://raw.githubusercontent.com/Citnut/demoProject/main/package.json');
		
	if (data.version != version) {
		const {data: info} = await axios.get('https://api.github.com/repos/Citnut/demoProject/git/refs/heads/main');
		const {data: commit} = await axios.get(info.object.url);
			
		console.warn(`Da co phien ban moi: ${data.version}, phien ban hien tai: ${version}, go "npm run update" de cap nhat!`);
		console.warn(`Noi dung update: ${commit.message}`);
	}
}

const accesapi = (arr, obj) => {
	try {
		let res = ""
		for (all of arr) {
			if (obj[all]) { res = obj[all] } else { res = res[all]}
		}
		return res
	} catch (e) {console.error(e)}
}

module.exports = {
	getParam,
	getKeyword,
	getFile,
	execShellCommand,
	checkupdate,
	accesapi
}