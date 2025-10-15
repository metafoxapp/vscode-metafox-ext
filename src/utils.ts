// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Package, ProjectConfig } from "./typings";

export const getTerminal = (name: string): vscode.Terminal => {
  const existing = vscode.window.terminals.find((t) => t.name === name);
  if (existing) {
    return existing;
  }
  const terminal = vscode.window.createTerminal(name);

  terminal.sendText("cd ~/Sites/vshare");
  terminal.sendText("docker-compose exec app bash");

  return terminal;
};

export const sendCommands = (...commands: string[]) => {
  const terminal = getTerminal("metafox-backend");
  terminal.show();
  terminal.sendText("cd /app");
  terminal.sendText(
    commands
      .filter(Boolean)
      .map((x) => x.trim())
      .filter(Boolean)
      .join(" && ")
  );
};

export const getDockerAppTerminal = (name: string): vscode.Terminal => {
  const existing = vscode.window.terminals.find((t) => t.name === name);
  if (existing) {
    return existing;
  }
  return vscode.window.createTerminal(name);
};

export const pickPackage = async (project: ProjectConfig) => {
  return await vscode.window
    .showQuickPick(
      project.packages.map((x) => x.name),
      {
        title: "package name",
        placeHolder: "Choose the package ...",
      }
    )
    .then((result) => project.packages.find((x) => x.name === result)!);
};

export const pickModel = async (pkg: Package) => {
  return await vscode.window
    .showQuickPick(pkg.models.map((x) => x.name) || [], {
      placeHolder: "Choose the model name",
    })
    .then((result) => pkg?.models.find((x) => x.name === result)!);
};
