# Horst development information API
The Horst DI-API is a tool used to gather recent informations on the current Horst development state for the [Horst website](https://horstlang.org)
The API is made with node.js and mainly uses discord.js. 
Link to api: https://horst-infos.herokuapp.com

## Dependencies

- [Recent node.js version](https://nodejs.org/en/download/)
- A text editor such as VS Code or Notepad++
- git

## Installation

- Open your terminal and navigate to your directory location by doing `cd PATH`. Replace `PATH` with your folder's path.
- Run `git clone https://github.com/horst-lang/info-api.git` to clone this repository.
- Run `npm i` to install the required npm packages.
- Create a new Discord developer portal application. Here's a tutorial: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
- Create a `config.json` file in the repositories directory.
- In the `config.json` file, write: ```{"token": "YOUR TOKEN"}```. Replace YOUR TOKEN with your Discord Developer portal application's bot token.
- To start the app, run `node .`

### If there are any problems, feel free to open a new issue!
