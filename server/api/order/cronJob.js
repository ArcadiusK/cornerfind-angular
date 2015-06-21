var CronJob = require('cron').CronJob;
var Order = require('./order.model.js');

var checkTimeStamps = new CronJob({
	cronTime: '00 00 00 * * 1-7',
	onTick: Order.checkAllTimeStamps(),
	start:true,
	timeZone: "America/Los_Angeles"
});

module.exports = checkTimeStamps;