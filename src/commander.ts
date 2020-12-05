import {Args} from '../deps.ts';

export interface CommanderInfo {
  name: string,
  description: string,
  version: string,
  author: string,
}

export interface Command {
  name: string,
  action(...parms: any[]): void
}

//export interface ICommander {}
export class Commander {

  private listOfCommands: Command[] = [];
  private args: Args;

  constructor(args: Args) {
    this.args = args;
  }

  public define(command: Command): void {
    this.listOfCommands.push(command);
  }

  public async watch(): Promise<void> {
    this.listOfCommands.map(async (command) => {
      if(this.args[command.name] != undefined) {
        command.action(this.args, this.args[command.name], ...this.args._);
      }
    });
  }
}