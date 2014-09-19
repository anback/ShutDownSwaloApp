var mysql      = require('mysql');
var schedule = require('node-schedule');
var connection = mysql.createConnection({
  host     : 'aragorn.mrorange.local',
  user     : 'sa',
  password : 'homermad!'
});

var shutDownRule = new schedule.RecurrenceRule();
shutDownRule.hour = 23;
shutDownRule.minute = 25;

var shutDown = schedule.scheduleJob(shutDownRule, function(){
    ShutDown();
});

var startUpRule = new schedule.RecurrenceRule();
startUpRule.hour = 6;

var shutDown = schedule.scheduleJob(startUpRule, function(){
    StartUp();
});

function ShutDown() {
	var sql = "UPDATE tomtom.config SET ConfigValue = 0 where ConfigKey like 'crs.amadeus.enable' and Partnerid = 79";
	connection.query(sql, function(err, rows, fields) {
		if(err)
			console.log(err);
		console.log("Shutted down Swalo @ " + new Date());

	});	
}

function StartUp() {
	var sql = "UPDATE tomtom.config SET ConfigValue = 1 where ConfigKey like 'crs.amadeus.enable' and Partnerid = 79";
	connection.query(sql, function(err, rows, fields) {
		if(err)
			console.log(err);
		console.log("Started up   Swalo @ " + new Date());
	});	
}