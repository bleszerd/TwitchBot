import tmi from "tmi.js";

export type BotCredentials = {
  twitchUsername: string;
  twitchUserId: string;
  twitchOauth: string;
  twitchChannel: string;
  twitchClientId: string;
  twitchBearerToken: string;
  twitchBotDatabaseUri: string;
};

export type OnInitCallback = (client: tmi.Client) => void;
