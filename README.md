# Binus discord bot

![Logo](./.github/assets/logo.png)

> **🛑 DISCLAIMER: This bot is not affiliated with or endorsed by Binus University. The purpose of this bot is to assist the students of Binus University to get information about classes.**

## 🌟 Features

- **📝 Class schedule search**
- **🔔 Upcoming class reminder**
- **& More to come...**

## 📊 Requirements

- Node.js >= 16.6.0
- pm2 >= 3.0.0

## 🛠 Setup

Install `pm2` globally:

```bash
npm install -g pm2
# Or
yarn global add pm2
```

Install the dependencies:

```bash
npm install
# Or
yarn
```

Setup the bot's configuration by creating a `.env` file in the root directory of the project by copying the `.env.example` file and filling in the required values.

```text
TOKEN=xxx

CLIENT_ID=xxx
GUILD_ID=xxx

PREFIX=b!

BINUS_BEARER_TOKEN=secret
```

## 🔌 Running the bot

Once you've installed the dependencies and configured the bot, you can run the bot by running the following command:

```bash
npm run dev
# Or
yarn dev
```

To stop the bot, run the following command:

```bash
npm run stop
# Or
yarn stop
```

## 📗 Contributing

Please feel free to fork this bot and make it your own!

## License

This bot is licensed under the [GNU General Public License v3.0.](https://www.gnu.org/licenses/gpl-3.0.en.html)

You may copy, distribute and modify the software under to the conditions of the GNU General Public License version 3.0.
