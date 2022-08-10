module.exports = {
	logQuit(...arg){
		console.log.apply(console, arg);
		process.exit(0);
	},
	errorQuit(...arg){
		console.error.apply(console, arg);
		process.exit(0);
	},
	log(...arg){
		console.log.apply(console, arg);
	}
}