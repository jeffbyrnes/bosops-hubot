## Bosops Slack Hubot


### Task List

* `@hubot What groups do you know about?`

Return a list of groups that the bot knows about

* `@hubot When is the next X meetup?`

X is equal to the name of a group from the first list.  This will return details on the next meetup scheduled for the group

* `@hubot What conferences do you know about?`

Return a list of conferences and url's.  At some point it will do something more than that.

* `@hubot What are the details of the X conference?`

Return any details that have been published by the conference organizers.

### Adding New Groups

To add a new group for the bot to be aware of add the `name`, `url_name`, and `id` to `lib/group_list.json` and submit a pull request using the [CONTRIBUTING][1] guidelines.

### Adding New Conferences

To add a new conference for the bot to be aware of add the `name`, `url` to `lib/conf_list.json` and submit a pull request using the [CONTRIBUTING][1] guidelines.


[1]: CONTRIBUTING.md
