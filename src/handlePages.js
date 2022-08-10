const config = require('./config.js');
const utils = require('./utils.js');
const handleContent = require('./handleContent.js');
let browser;

let pageSize = 0;

function* _do() {
	while (1) {
		yield step();
	}
}

const handle = _do();

function go(page){
	page.close();
	pageSize--;

	handle.next();
}

async function visit(link) {
	pageSize++;
	const page = await browser.newPage();

	try{
		const tip = `${link} 分析完毕: `;

		console.time(tip);
		page.goto(link).then(async () => {
			const links = await page.$$eval('a', (aTags) => aTags.map((aTag) => aTag.href));
			handleLinks.do(links);
			await handleContent.do(page);
			console.timeEnd(tip);
			
			go(page);
		}).catch(() => {
			go(page);
		});
	}
	catch(e){
		go(page);
	}
	
	setTimeout(() => {
		handle.next();
	}, 0)
}

async function step() {
	if (!browser) {
		return utils.errorQuit('There is no browser Object');
	}

	if (pageSize >= config.maxPages) {
		return;
	}

	const link = handleLinks.getNextUrl();

	if (!link) {
		const pages = await browser.pages();
		if(pages.length < 2){
			return utils.logQuit('爬行完毕');
		}
		return;
	}

	setTimeout(() => {
		visit(link);
	}, 0)
}

module.exports = {
	setBrowser: (_browser) => {
		browser = _browser;
	},
	do: () => {
		handle.next();
	}
};

const handleLinks = require('./handleLinks.js');
