# Binus discord bot

![Logo](./.github/assets/banner.png)

> **🛑 DISCLAIMER: This bot is not affiliated with or endorsed by Binus University. The purpose of this bot is to assist the students of Binus University to get information about classes.**

## 🌟 Features

- **📝 Class schedule search**
- **🔔 Upcoming class reminder**
- **& More to come...**

## 📊 Requirements

- Node.js >= 16.6.0

## 🛠 Setup

Install the dependencies:

```bash
npm install
# Or
yarn
```

Setup the bot's configuration by creating a `.env` file in the root directory of the project by copying the `.env.example` file and filling in the required values.

```text
TOKEN=xxx
MONGODB_URL=mongodb://127.0.0.1:27017/sunib_companion

CLIENT_ID=xxx
GUILD_ID=xxx

PREFIX=b!

BINUS_BEARER_TOKEN=secret
```

> For more information about the `BINUS_BEARER_TOKEN` read [here](BEARER_TOKEN.md)

## 🔌 Running the bot

Once you've installed the dependencies and configured the bot, you can run the bot by running the following command:

```bash
npm run dev
# Or
yarn dev
```

## 📗 Contributing

Please feel free to fork this bot and make it your own!

## License

This bot is licensed under the [GNU General Public License v3.0.](https://www.gnu.org/licenses/gpl-3.0.en.html)

You may copy, distribute and modify the software under to the conditions of the GNU General Public License version 3.0.
