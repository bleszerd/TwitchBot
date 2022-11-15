import { ChatUserstate } from "tmi.js";
import { greetingsCommands } from "./modules/greetings";

class TwitchChatbot {
  private enabledChatCommands = [...greetingsCommands];

  public parseCommand(
    channel: string,
    userstate: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const isCommand = this.checkForCommand(message, self);

    if (isCommand) {
      this.runCommand(channel, userstate, message, self);
    }
  }

  public checkForCommand(message: string, self: boolean) {
    if (self) return false;

    if (message.startsWith("!")) return true;

    return false;
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

    if (this.enabledChatCommands.includes(command)) {
      this.executeCommand(command, args);
    }
  }

  private executeCommand(command: string, args: string[]) {
    console.log(`Running command ${command} with args: ${args}`);
  }
}

export default TwitchChatbot;
