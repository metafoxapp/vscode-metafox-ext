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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickFilename = exports.pickName = exports.pickNumber = exports.pickModel = exports.pickPackage = exports.getDockerAppTerminal = exports.sendCommands = exports.getTerminal = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const getTerminal = (name) => {
    const existing = vscode.window.terminals.find((t) => t.name === name);
    if (existing) {
        return existing;
    }
    const terminal = vscode.window.createTerminal(name);
    terminal.sendText("cd ~/Sites/vshare");
    terminal.sendText("docker-compose exec -udaemon app bash");
    return terminal;
};
exports.getTerminal = getTerminal;
const sendCommands = (...commands) => {
    const terminal = (0, exports.getTerminal)("metafox-backend");
    terminal.show();
    terminal.sendText(commands
        .filter(Boolean)
        .map((x) => x.trim())
        .filter(Boolean)
        .join(" && "));
};
exports.sendCommands = sendCommands;
const getDockerAppTerminal = (name) => {
    const existing = vscode.window.terminals.find((t) => t.name === name);
    if (existing) {
        return existing;
    }
    return vscode.window.createTerminal(name);
};
exports.getDockerAppTerminal = getDockerAppTerminal;
const pickPackage = async (project) => {
    return await vscode.window
        .showQuickPick(project.packages.map((x) => x.name), {
        title: "package name",
        placeHolder: "Choose the package ...",
    })
        .then((result) => project.packages.find((x) => x.name === result));
};
exports.pickPackage = pickPackage;
const pickModel = async (pkg) => {
    return await vscode.window
        .showQuickPick(pkg.models.map((x) => x.name) || [], {
        placeHolder: "Choose the model name",
    })
        .then((result) => pkg?.models.find((x) => x.name === result));
};
exports.pickModel = pickModel;
const pickNumber = async (value, placeHolder) => {
    const txt = await vscode.window.showInputBox({
        placeHolder,
        value: value.toString(),
        validateInput: (x) => (Number.isSafeInteger(x) ? x : undefined),
    });
    return Number(txt);
};
exports.pickNumber = pickNumber;
const pickName = async (value, placeHolder) => {
    let txt;
    do {
        txt = await vscode.window.showInputBox({
            placeHolder,
            value: value,
            validateInput: (x) => (/^\w+$/.test(x) ? null : "Invalid name"),
        });
    } while (!txt);
    return txt;
};
exports.pickName = pickName;
const pickFilename = async (value, placeHolder) => {
    let txt;
    do {
        txt = await vscode.window.showInputBox({
            placeHolder,
            value: value,
        });
    } while (!txt);
    return txt;
};
exports.pickFilename = pickFilename;
//# sourceMappingURL=utils.js.map