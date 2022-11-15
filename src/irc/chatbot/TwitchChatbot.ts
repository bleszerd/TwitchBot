import { ChatUserstate } from "tmi.js";
import { Streamer } from "../core/types";

import personCommands from "./modules/persons";
import greetingsCommands from "./modules/greetings";
import PersonsCommandRunner from "./modules/persons/runner";

const personCommandRunner = new PersonsCommandRunner();
// const greetingsCommandRunner = new GreetingsCommandRunner();

class TwitchChatbot {
  private availableCommands: string[] = [];
  private personCommands: string[] = [];
  private greetingsCommands: string[] = [];
  private streamer: Streamer;

  constructor(streamer: Streamer) {
    this.updateCommandList(streamer);

    this.streamer = streamer;
  }

  public parseCommand(
    channel: string,
    userstate: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const isCommand = this.checkForCommand(message, self);

    if (isCommand) {
      const response = this.runCommand(channel, userstate, message, self);

      return response;
    }
  }

  public checkForCommand(message: string, self: boolean) {
    if (self) return false;

    if (message.startsWith("!")) return true;

    return false;
  }

  private updateCommandList(streamer: Streamer) {
    const { nested, greetings, person } = this.mergeCommands(streamer);

    this.personCommands = person;
    this.greetingsCommands = greetings;

    this.availableCommands = nested;
  }

  private mergeCommands(streamer: Streamer) {
    return {
      nested: [
        ...personCommands[streamer],
        ...personCommands.general,

        ...greetingsCommands[streamer],
        ...greetingsCommands.general,
      ],
      person: [...personCommands[streamer], ...personCommands.general],
      greetings: [...greetingsCommands[streamer], ...greetingsCommands.general],
    };
  }

  private runCommand(
    channel: string,
    userstate: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const separatedMessage = message.split(" ");

    const command = separatedMessage[0];
    const args = separatedMessage.splice(1);

    if (this.availableCommands.includes(command)) {
      const response = this.executeCommand(command, args);

      return response;
    }
  }

  private executeCommand(command: string, args: string[]) {
    if (personCommands[this.streamer].includes(command)) {
      const response = personCommandRunner.runCommand(
        command,
        args,
        this.streamer
      );

      return response;
    }
  }
}

export default TwitchChatbot;
