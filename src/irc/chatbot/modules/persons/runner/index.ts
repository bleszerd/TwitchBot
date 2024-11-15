import { Streamer } from "../../../../core/types";
import { PersonCommand } from "../types";

class PersonsCommandRunner {
  static kaduHaterCount = 0;
  static kaduCount = 0;

  public async runCommand(command: string, args: string[], streamer: Streamer) {
    switch (command) {
      case PersonCommand.KADUHATER:
        return this.kaduHater(command, args, streamer);
      case PersonCommand.KADU:
        return this.kadu(command, args, streamer);
    }
  }

  private async kaduHater(command: string, args: string[], streamer: Streamer) {
    const response = `Essa é a ${PersonsCommandRunner.kaduHaterCount}ª vez que o kadu fala que não gosta de algo!`;

    PersonsCommandRunner.kaduHaterCount++;

    return response;
  }

  private async kadu(command: string, args: string[], streamer: Streamer) {
    const response = `Essa é a ${PersonsCommandRunner.kaduCount}ª vez que o kadu polui uma cidade tentando fazer churrasco`;

    PersonsCommandRunner.kaduCount++;

    return response;
  }
}

export default PersonsCommandRunner;
