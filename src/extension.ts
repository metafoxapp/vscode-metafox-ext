// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import backendCommands from "./backend";
import frontendCommands from "./frontend";
import { CommandList, ProjectConfig } from "./typings";
import defaultProjectConfig from "./metafox.project.json";

const CONFIG_FILE_NAME = "metafox.project.json";

export async function getProjectConfig() {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) {
    vscode.window.showErrorMessage("No workspace folder open");
    return defaultProjectConfig;
  }

  // Create URI for .vscode/config.json
  const fileUri = vscode.Uri.joinPath(folder.uri, CONFIG_FILE_NAME);

  try {
    // Check if file exists
    await vscode.workspace.fs.stat(fileUri);
  } catch {
    // File not found → create it
    const content = JSON.stringify(defaultProjectConfig, null, 2);
    const encoder = new TextEncoder();
    await vscode.workspace.fs.writeFile(fileUri, encoder.encode(content));
  }

  try {
    return (await vscode.workspace.fs
      .readFile(fileUri)
      .then((contentBytes) => new TextDecoder("utf-8").decode(contentBytes))
      .then((content) => JSON.parse(content))) as ProjectConfig;
  } catch (error: any) {
    vscode.window.showErrorMessage(
      `❌ Failed to read ./metafox.project.json: ${error.message}`
    );
  }
  return defaultProjectConfig;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "metafox-ext" is now active!');

  const registerCommand = (name: string, commands: CommandList) => {
    const dispose = vscode.commands.registerCommand(name, async () => {
      const config = await getProjectConfig();
      const choice = await vscode.window.showQuickPick(backendCommands, {
        placeHolder: "Choose the command",
      });
      if (!choice) {
        return;
      }

      await choice.handler(config);
      // vscode.window.showInformationMessage("Done");
    });
    context.subscriptions.push(dispose);
  };

  registerCommand("metafox-ext.backend", backendCommands);
  registerCommand("metafox-ext.frontend", frontendCommands);
}

// This method is called when your extension is deactivated
export function deactivate() {}
