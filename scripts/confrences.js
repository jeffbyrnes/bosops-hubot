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

  robot.respond(/What are the details of the (.*) conference\?/i, function(res) {
    var fs = require('fs');
    var conf;
    conf = res.match[1];

    function IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false
      }
      return true
    }

    file_text = fs.readFileSync('lib/conf_list.json').toString();
    this.exec = require('child_process').exec;
    confs = JSON.parse(file_text);
    var arrayLength = confs.length;
    for (var i = 0; i < arrayLength; i++) {
      if (confs[i]['name'] == conf) {
        res.send("Looking up details for the " + conf + " conference")
        var conf_url = confs[i]['url']
        var cmd = "curl " +  conf_url + "/hubot_spec.json";
        this.exec(cmd, function(error, stdout, stderror) {
          //var out = IsJsonString(stdout)
          if ( IsJsonString(stdout) ) {
            out = JSON.parse(stdout)
            res.send(out['conference']['name']);
            res.send("Conference dates: " + out['conference']['dates']['conf start'] + " - " +  out['conference']['dates']['conf end']);
            res.send("Call for papers: " + out['conference']['dates']['cfp start'] + " - " +  out['conference']['dates']['cfp end']);
          }
          else {
            res.send(" There is no information available for this conference");
          }
        });
      };
    };
    if (typeof conf_url === 'undefined') {
      res.send("I don't know anything about that conference.")
      res.send("I know of the following conferences:")
      for (var i = 0; i < arrayLength; i++) {
        res.send(confs[i]['name'])
      };
    }
  });
};
