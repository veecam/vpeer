const fs = require('fs');
const path = require('path');
const pp = require('puppeteer-core');
const chromePath = require('chrome-finder')();
const handleLinks = require('./handleLinks.js');
const handlePages = require('./handlePages.js');
const config = require('./config.js');

const main = async () => {
	console.log('清理环境');
	const dirPath = path.resolve(__dirname, 'out');
	const filePath = path.resolve(dirPath, 'frequency.txt');

	!fs.existsSync(dirPath) && fs.mkdirSync(dirPath);
	fs.existsSync(filePath) && fs.unlinkSync(filePath);

	let args = ['--no-sandbox', '--blink-settings=imagesEnabled=false', '--block-new-web-contents=true'];

	if(config.proxy){
		console.log('有代理设置');
		args = args.concat(['--proxy-server=' + config.proxy]);
	}

	console.log('创建浏览器');

	const browser = await pp.launch({
		headless: config.headless,
		executablePath: chromePath,
		defaultViewport: {
			width: 1920,
			height: 1080
		},
		args
	});

	console.log('加载入口：', config.entry);
	handleLinks.do([config.entry]);
	handlePages.setBrowser(browser);

	console.log('最大爬行距离：', config.maxLinks);
	console.log('最大爬虫数量', config.maxPages);
	
	console.log('开始爬虫');
	handlePages.do();
};

main();