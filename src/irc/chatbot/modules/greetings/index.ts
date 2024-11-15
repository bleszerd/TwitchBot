import { NestedCommands } from "../../../core/types";
import { GreetingsCommand } from "./types";

const generalCommands = [GreetingsCommand.BOMDIA];

const supreminhaaCommands: string[] = [];
const bleszerdCommands: string[] = [];

const nestedCommands: NestedCommands = {
  general: generalCommands,
  supreminhaa: supreminhaaCommands,
  bleszerd: bleszerdCommands,
};

export default nestedCommands;
