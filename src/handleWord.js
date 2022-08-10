const fs = require('fs');
const path = require('path');

const wordFrequency = new Map;
const filePath = path.resolve(__dirname, 'out', 'frequency.txt');

module.exports = {
	analysis(content){

		let words = content.toLowerCase().split(/\s/);

		words.forEach(word => {
			if(!word.trim()){
				return;
			}

			if(word.length == 1){
				return
			}

			if(!/[\w\u4e00-\u9fa5]/g.test(word)){
				return;
			}

			if(wordFrequency.has(word)){
				wordFrequency.set(word, wordFrequency.get(word) + 1);
			}
			else{
				wordFrequency.set(word, 1);
			}
		});

		let fileContent = Array.from(wordFrequency);
		fileContent.sort((pre, next) => {
			return next[1] - pre[1];
		});

		fs.writeFileSync(filePath, fileContent.map(line => line.join(':   ')).join('\r\n'));
	}
}