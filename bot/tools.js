const fs = require('fs');

const getParam = text => {
	return text
		.split(' ')
		.slice(1)
		.join(' ');
};

const getKeyword = text => {
	return text
		.split(' ')
		.slice(0, 1)[0]
		.slice(1);
};

const getFile = filePath => {
	return fs.createReadStream(filePath)
};

module.exports = {
	getParam,
	getKeyword,
	getFile
}