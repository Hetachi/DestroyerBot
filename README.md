# Discord BOT
A Discord bot I made for my community
I was unable to find a simple yet elegant discord bot solution, for just moderating chat in my dicord server, so I made this discord bot to do just that, all it does it mute or unmute players.
# Requirements
Atleast `NodeJS 10.13.0 LTS` and `Yarn 1.10.1`

# Installation
Open terminal and redirect to projects folder
- Install yarn: `npm install yarn -g`
- Edit file [botToken.js](components/config/botToken.js)
- Edit file [ownerID.js](components/config/ownerID.js)

To start the bot run command `yarn start`

# Bot commands
- NOTE: "`@Username` must be a valid discord user tag, otherwise if not found bot will add an `undefined` user to the moderator list. `Undefined` can be removed via command `!unmod undefined`!"
- `!mod @Username` - Assigns user role moderator
- `!unmod @Username` - Removes user from moderator list
- `!actions` - List all available commands that bot has to offer
- `!mods` - Lists all current moderators
- `!mute @Username` - Mutes a player
- *Muted users will appear as writing when they are writing a message, yet their sent message will be deleted instantly. And the user will recieve notification that they have been muted and  should contact @Owner*
- `!unmute @Username` - removes user from the muted user list

- Note: *All mods can promote or demote other people as or from moderators, but they cannot demote Owner from this role*
