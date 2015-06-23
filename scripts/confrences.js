module.exports = function(robot) {

  // Write out a list of conferences that the bot knows about.
  // To add a new confrence add it to conf_list.json.
  //
  robot.respond(/What conferences do you know about\?/i, function(res) {
    var fs = require('fs');
    var conf;
    conf = res.match[1];

    file_text = fs.readFileSync('lib/conf_list.json').toString()
    confs = JSON.parse(file_text)
    var arrayLength = confs.length;
    res.send("I know of the following conferences:")
    for (var i = 0; i < arrayLength; i++) {
      res.send(confs[i]['name'] + "   " + confs[i]['url'])
    }
  });
};
