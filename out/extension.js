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
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const backend_1 = __importDefault(require("./backend"));
const frontend_1 = __importDefault(require("./frontend"));
const fs_1 = __importDefault(require("fs"));
const metafox_project_json_1 = __importDefault(require("./metafox.project.json"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "metafox-ext" is now active!');
    const getProjectConfig = () => {
        const workspaceConfig = vscode.workspace.getConfiguration("metafox-ext");
        const filename = workspaceConfig.get("projectConfigFile");
        if (filename && fs_1.default.existsSync(filename)) {
            const project = JSON.parse(fs_1.default.readFileSync(filename, { encoding: "utf8" }));
            project.paths.projectConfigFile = filename;
            return project;
        }
        return metafox_project_json_1.default;
    };
    const project = getProjectConfig();
    const registerCommand = (name, commands) => {
        const dispose = vscode.commands.registerCommand(name, async () => {
            const command = await vscode.window.showQuickPick(Object.keys(commands).sort(), {
                placeHolder: "Choose the command",
            });
            if (!command || !commands[command]) {
                return;
            }
            const callback = commands[command];
            await callback(project);
            vscode.window.showInformationMessage("Done");
        });
        context.subscriptions.push(dispose);
    };
    registerCommand("metafox-ext.backend", backend_1.default);
    registerCommand("metafox-ext.frontend", frontend_1.default);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map