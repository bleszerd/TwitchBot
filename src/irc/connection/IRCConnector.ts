import tmi from "tmi.js";
import { BotCredentials, OnInitCallback } from "./types";

class IRCConnector {
  private client!: tmi.Client;
  private botCredentials?: BotCredentials;

  public setBotCredentials(credentials: BotCredentials) {
    this.botCredentials = credentials;
  }

  public init(callback: OnInitCallback) {
    const clientConfig = {
      channels: [this.botCredentials!.twitchChannel],
      identity: {
        username: this.botCredentials!.twitchUsername,
        password: `oauth:${this.botCredentials!.twitchOauth}`,
      },
      options: { debug: true },
    };

    this.client = new tmi.client(clientConfig);

    this.client.connect().then(() => {
      this.preventNodeExitLoop();
    });

    callback(this.client);
  }

  private preventNodeExitLoop() {
    process.stdin.resume();
  }
}

export default IRCConnector;
