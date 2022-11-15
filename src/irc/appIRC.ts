import TwitchChatbot from "./chatbot/TwitchChatbot";
import IRCConnector from "./connection/IRCConnector";
import process from "process";

import "dotenv/config";
import { Streamer } from "./core/types";

const botCredentials = {
  twitchBearerToken: `${process.env.BEARER_TOKEN}`,
  twitchBotDatabaseUri: `${process.env.DATABASE_CONNECTION_URI}`,
  twitchChannel: `${process.env.TWITCH_CHANNEL}`,
  twitchClientId: `${process.env.CLIENT_ID}`,
  twitchOauth: `${process.env.TWITCH_OAUTH}`,
  twitchUserId: `${process.env.TWITCH_USER_ID}`,
  twitchUsername: `${process.env.TWITCH_USERNAME}`,
};

const ircConnector = new IRCConnector();
const twitchChatbot = new TwitchChatbot(
  botCredentials.twitchChannel.toLowerCase() as Streamer
);

ircConnector.setBotCredentials(botCredentials);

ircConnector.init((client) =>
  client.on("message", async (channel, userState, message, self) => {
    const response = await twitchChatbot.parseCommand(
      channel,
      userState,
      message,
      self
    );

    if (response) {
      client.say(channel, response);
    }
  })
);
