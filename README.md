## Bosops Slack Hubot


### Task List

* `@hubot What groups do you know about?`

Return a list of groups that the bot knows about

* `@hubot When is the next X meetup?

X is equal to the name of a group from the first list.  This will return details on the next meetup scheduled for the group


### Adding New Groups

To add a new group for the bot to be aware of add the `name`, `url_name`, and `id` to `lib/group_list.json` and submit a pull request using the [CONTRIBUTING][1] guidelines.

[1]: CONTRIBUTING.md
