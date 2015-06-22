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

  // This will take a known meeting from the list and search for the latest
  // event and give revelent details
  robot.respond(/When is the next (.*) meetup\?/i, function(res) {
    var fs = require('fs');
    var meetup, api_call, api_key, meetup_id;
    api_key = process.env['MEETUP_TOKEN'];
    api_key = "241a7624282f51133b6ca7236c4d43"
    meetup = res.match[1];

    file_text = fs.readFileSync('lib/group_list.json').toString()
    groups = JSON.parse(file_text)
    var arrayLength = groups.length;
    for (var i = 0; i < arrayLength; i++) {
      if (groups[i]['name'] == meetup) {
        res.send("Looking up details for the latest " + meetup + " meetup")
        meetup_id = groups[i]['id']
      }
    }
    if (meetup_id == '') {
      res.send("I don't know anything about that group")
    }

    this.exec = require('child_process').exec;

    api_call = "curl " + "\"https://api.meetup.com/2/events?key=" + api_key + "&sign=true&photo-host=public&group_id=" + meetup_id + "&page=20\"";
    this.exec(api_call, function(error, stdout, stderror) {
      var out = JSON.parse(stdout);
      if (typeof out['results'][0] != 'undefined') {
        var con_date = new Date(out['results'][0]['time']);
        res.send("Meetup: " + meetup);
        res.send("Location: " + out['results'][0]['venue']['name']);
        res.send("Address: " + out['results'][0]['venue']['address_1']);
        res.send("City: " + out['results'][0]['venue']['city']);
        res.send("Date: " + con_date);
        res.send("Url: " + out['results'][0]['event_url']);
      } else {
        res.send("There are no events currently scheduled for this group")
      }
    });
  });
};
