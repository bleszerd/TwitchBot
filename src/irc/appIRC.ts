import TwitchChatbot from "./chatbot/TwitchChatbot";
import IRCConnector from "./connection/IRCConnector";
import process from "process";

import "dotenv/config";

const ircConnector = new IRCConnector();
const twitchChatbot = new TwitchChatbot();

ircConnector.setBotCredentials({
  twitchBearerToken: `${process.env.BEARER_TOKEN}`,
  twitchBotDatabaseUri: `${process.env.DATABASE_CONNECTION_URI}`,
  twitchChannel: `${process.env.TWITCH_CHANNEL}`,
  twitchClientId: `${process.env.CLIENT_ID}`,
  twitchOauth: `${process.env.TWITCH_OAUTH}`,
  twitchUserId: `${process.env.TWITCH_USER_ID}`,
  twitchUsername: `${process.env.TWITCH_USERNAME}`,
});

ircConnector.init((client) =>
  client.on("message", (channel, userState, message, self) => {
    twitchChatbot.parseCommand(channel, userState, message, self);
  })
);
