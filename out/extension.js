"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectConfig = getProjectConfig;
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const backend_1 = __importDefault(require("./backend"));
const frontend_1 = __importDefault(require("./frontend"));
const metafox_project_json_1 = __importDefault(require("./metafox.project.json"));
const CONFIG_FILE_NAME = "metafox.project.json";
async function getProjectConfig() {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) {
        vscode.window.showErrorMessage("No workspace folder open");
        return metafox_project_json_1.default;
    }
    // Create URI for .vscode/config.json
    const fileUri = vscode.Uri.joinPath(folder.uri, CONFIG_FILE_NAME);
    try {
        // Check if file exists
        await vscode.workspace.fs.stat(fileUri);
    }
    catch {
        // File not found → create it
        const content = JSON.stringify(metafox_project_json_1.default, null, 2);
        const encoder = new TextEncoder();
        await vscode.workspace.fs.writeFile(fileUri, encoder.encode(content));
    }
    try {
        return (await vscode.workspace.fs
            .readFile(fileUri)
            .then((contentBytes) => new TextDecoder("utf-8").decode(contentBytes))
            .then((content) => JSON.parse(content)));
    }
    catch (error) {
        vscode.window.showErrorMessage(`❌ Failed to read ./metafox.project.json: ${error.message}`);
    }
    return metafox_project_json_1.default;
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "metafox-ext" is now active!');
    const registerCommand = (name, commands) => {
        const dispose = vscode.commands.registerCommand(name, async () => {
            const config = await getProjectConfig();
            const choice = await vscode.window.showQuickPick(backend_1.default, {
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
    registerCommand("metafox-ext.backend", backend_1.default);
    registerCommand("metafox-ext.frontend", frontend_1.default);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map