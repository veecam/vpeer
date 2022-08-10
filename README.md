# vpeer
爬网页统计词频的小工具

---
## config.js配置相关属性
```
module.exports = {
	entry: '', //入口，一般为首页：https://sub.dumain.com
	domain: '', //域名，避免爬到其他站点：domain.com，考虑是否约束子域名，不做仁和约束请留空
	headless: true, //是否无头
	maxPages: 5, //同时开启多少标签，需要根据电脑性能判断
	maxLinks: 10000000, //爬行深度，与性能无关
	checkLink: /\.(jpe?g|gif|png|svg|tiff|bmp|exe|css|apk|zip|rar)/, //由于检查a标签的href属性，这里需要排除资源
	proxy: 'socket5://127.0.0.1:10808' //请科学，不需要请留空
}
```

## 输出 - out/frequency.txt

**根据每次爬行结果按空格分词统计，并非语法分词，降序排列**

**每次运行会清除该文件，须提前做备份**
