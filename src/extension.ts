// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import backendCommands from "./backend";
import frontendCommands from "./frontend";
import { CommandList, ProjectConfig } from "./typings";
import fs from "fs";
import defaultProjectConfig from "./metafox.project.json";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "metafox-ext" is now active!');

  const getProjectConfig = (): ProjectConfig => {
    const workspaceConfig = vscode.workspace.getConfiguration("metafox-ext");

    const filename = workspaceConfig.get<string>("projectConfigFile");

    if (filename && fs.existsSync(filename)) {
      const project = JSON.parse(
        fs.readFileSync(filename, { encoding: "utf8" })
      ) as ProjectConfig;

      project.paths.projectConfigFile = filename;

      return project;
    }

    return defaultProjectConfig as unknown as ProjectConfig;
  };

  const project = getProjectConfig();

  const registerCommand = (name: string, commands: CommandList) => {
    const dispose = vscode.commands.registerCommand(name, async () => {
      const command = await vscode.window.showQuickPick(
        Object.keys(commands).sort(),
        {
          placeHolder: "Choose the command",
        }
      );
      if (!command || !commands[command]) {
        return;
      }
      const callback = commands[command];

      await callback(project);
      vscode.window.showInformationMessage("Done");
    });
    context.subscriptions.push(dispose);
  };

  registerCommand("metafox-ext.backend", backendCommands);
  registerCommand("metafox-ext.frontend", frontendCommands);
}

// This method is called when your extension is deactivated
export function deactivate() {}
