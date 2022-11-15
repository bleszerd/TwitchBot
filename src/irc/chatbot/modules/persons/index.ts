import { NestedCommands } from "../../../core/types";
import { PersonCommand } from "./types";

const generalCommands: string[] = [];

const supreminhaaCommands = [PersonCommand.KADUHATER];
const bleszerdCommands = [PersonCommand.KADUHATER];

const nestedCommands: NestedCommands = {
  general: generalCommands,
  supreminhaa: supreminhaaCommands,
  bleszerd: bleszerdCommands,
};

export default nestedCommands;
