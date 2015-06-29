module.exports = function(robot) {
  var formatMessage, fs, logFileName, startLogging, util;
  util = require('util')
  fs = require('fs');
  fs.exists('./logs/', function(exists) {
    if (exists) {
      return startLogging();
    } else {
      return fs.mkdir('./logs/', function(error) {
        if (!error) {
          return startLogging();
        } else {
          return console.log("Could not create logs directory: " + error);
        }
      });
    }
  });
  startLogging = function() {
    console.log("Started logging");
      // msg.send util.inspect(strange_object)
    return Math.floor(robot.hear(/(.*)/i, function(msg) {
      return fs.appendFile(logFileName(msg), formatMessage(msg), function(error) {
        if (error) {
          return console.log("Could not log message: " + error);
        }
      });
    }));
  };
  logFileName = function(msg) {
    var safe_room_name;
    safe_room_name = ("" + msg.message.room).replace(/[^a-z0-9]/ig, '');
    return "./logs/" + safe_room_name + ".log";
  };
  return formatMessage = function(msg) {
    process.stdout.write("[" + (new Date()) + "] " + msg.message.user.name + ": " + msg.message.text + "\n");
    return "[" + (new Date()) + "] " + msg.message.user.name + ": " + msg.message.text + "\n";
  };
};