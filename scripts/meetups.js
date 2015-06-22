module.exports = function(robot) {

  // Write out a list of groups that the bot knows about.
  // To add a new group add it to group_list.json.  This
  // file is used to pull all event and group info from
  //
  robot.respond(/What groups do you know about\?/i, function(res) {
    var fs = require('fs');
    var meetup, api_call, api_key;
    api_key = process.env['MEETUP_TOKEN'];
    api_key = "241a7624282f51133b6ca7236c4d43"
    meetup = res.match[1];

    file_text = fs.readFileSync('lib/group_list.json').toString()
    groups = JSON.parse(file_text)
    var arrayLength = groups.length;
    for (var i = 0; i < arrayLength; i++) {
      res.send(groups[i]['name'])
    }
  });

  robot.respond(/When is the next (.*) meetup\?/i, function(res) {
    var meetup, api_call, api_key;
    api_key = process.env['MEETUP_TOKEN'];
    api_key = "241a7624282f51133b6ca7236c4d43"
    meetup = res.match[1];

    var known_meetups = new Array();
    known_meetups["name"] = "Boston Devops";
    known_meetups["id"] = "223338062";

    this.exec = require('child_process').exec;

    api_call = "curl " + "\"https://api.meetup.com/2/223338062?key=" + api_key + "&sign=true&photo-host=public&page=20\"";
    res.send("Looking for the next " + meetup + "...");
    this.exec(api_call, function(error, stdout, stderror) {
      var out;
      out = JSON.parse(stdout);
      var con_date = new Date(out['time']);
      res.send("Meetup: " + meetup);
      res.send("Location: " + out['venue']['name']);
      res.send("Address: " + out['venue']['address_1']);
      res.send("City: " + out['venue']['city']);
      res.send("Date: " + con_date);
      res.send("Url: " + out['event_url']);
    });
  });
};

//https://api.meetup.com/2/groups?&sign=true&photo-host=public&group_urlname=Boston-Devops&page=20
