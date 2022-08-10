const config = require('./config.js');
const utils = require('./utils.js');

let linkMap = new Map();
let stop = false;

function getNextUrl() {
	for (const [link, viewed] of linkMap) {
		if (!viewed) {
			linkMap.set(link, true);
			return link;
		}
	}

	return '';
}

const _do = (links) => {
	if (stop) {
		return;
	}
	if (linkMap.size >= config.maxLinks) {
		utils.log('limit to maxLinks : ', config.maxLinks);
		return;
	}

	links.forEach((link) => {
		//链接已存在，此处仅储存链接列表，不考虑是否已访问
		if (linkMap.has(link)) {
			return;
		}

		//不包含本站域名
		if (link.indexOf(config.domain) < 0) {
			return;
		}

		//链接为资源
		if (config.checkLink.test(link)) {
			return;
		}

		linkMap.set(link, false);

		if (linkMap.size >= config.maxLinks) {
			stop = true;
			utils.log('stop tracking, limit to maxLinks : ', config.maxLinks);
			return;
		}
	});
};

module.exports = {
	linkMap,
	getNextUrl,
	do: _do
};

const handlePages = require('./handlePages.js');
