const handleWord = require('./handleWord.js');

module.exports = {
	do: (page) => {
		return new Promise(async (resolve, reject) => {
			const content = await page.$$eval('body', bodies => bodies.map(body => body.innerText));

			handleWord.analysis(content[0]);
			resolve();
		})
	}
}