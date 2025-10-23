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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const utils = __importStar(require("../utils"));
const commandList = [
    {
        label: "optimize",
        description: "Optimize the application",
        handler: async (config) => {
            utils.sendCommands("php artisan optimize");
        },
    },
    {
        label: "about",
        description: "Show information about the application",
        handler: async () => {
            utils.sendCommands(`php artisan about`);
        },
    },
    {
        label: "permission:show",
        description: "Show the permissions",
        handler: async () => {
            utils.sendCommands(`php artisan permission:show`);
        },
    },
    {
        label: "permission:list",
        description: "List the permissions",
        handler: async () => {
            utils.sendCommands(`php artisan permission:list`);
        },
    },
    {
        label: "queue:clear",
        description: "Clear the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:clear`);
        },
    },
    {
        label: "queue:failed",
        description: "Show the failed queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:failed`);
        },
    },
    {
        label: "queue:flush",
        description: "Flush the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:flush`);
        },
    },
    {
        label: "queue:forget",
        description: "Forget the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:forget`);
        },
    },
    {
        label: "queue:listen",
        description: "Listen to the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:listen`);
        },
    },
    {
        label: "queue:restart",
        description: "Restart the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:restart`);
        },
    },
    {
        label: "queue:retry",
        description: "Retry the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:retry`);
        },
    },
    {
        label: "queue:work",
        description: "Work the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:work`);
        },
    },
    {
        label: "queue:monitor",
        description: "Monitor the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:monitor`);
        },
    },
    {
        label: "queue:prune",
        description: "Prune the queue",
        handler: async () => {
            utils.sendCommands(`php artisan queue:prune`);
        },
    },
    {
        label: "composer:install",
        description: "Install the composer dependencies",
        handler: async (config) => {
            utils.sendCommands(`rm -f ./composer.lock`, `./composer install`);
        },
    },
    {
        label: "metafox:upgrade",
        description: "Upgrade the Metafox application",
        handler: async (config) => {
            utils.sendCommands(`php artisan metafox:upgrade`);
        },
    },
    {
        label: "metafox:install --force",
        description: "Install the Metafox application",
        handler: async (config) => {
            utils.sendCommands(`rm -f ./composer.lock && ./composer install`, `(test -f .env && php artisan db:wipe --force)`, `(test -f .env && sed -in '/MFOX_APP_INSTALLED=true/d' .env)`, `php artisan optimize:clear`, `./composer metafox:install`);
        },
    },
    {
        label: "schedule:clear-cache",
        description: "Clear the schedule cache",
        handler: async () => {
            utils.sendCommands(`php artisan schedule:clear-cache`);
        },
    },
    {
        label: "schedule:list",
        description: "List the schedules",
        handler: async () => {
            utils.sendCommands(`php artisan schedule:list`);
        },
    },
    {
        label: "schedule:run",
        description: "Run the schedules",
        handler: async () => {
            utils.sendCommands(`php artisan schedule:run`);
        },
    },
    {
        label: "schedule:work",
        description: "Work the schedules",
        handler: async () => {
            utils.sendCommands(`php artisan schedule:work`);
        },
    },
    {
        label: "schedule:test",
        description: "Test the schedules",
        handler: async () => {
            utils.sendCommands(`php artisan schedule:test`);
        },
    },
    {
        label: "route:clear",
        description: "Clear the routes",
        handler: async () => {
            utils.sendCommands(`php artisan route:clear`);
        },
    },
    {
        label: "route:cache",
        description: "Cache the routes",
        handler: async () => {
            utils.sendCommands(`php artisan route:clear`);
        },
    },
    {
        label: "route:list",
        description: "List the routes",
        handler: async (config) => {
            utils.sendCommands("php artisan route:list");
        },
    },
    {
        label: "db:seed",
        description: "Seed the database",
        handler: async (config) => {
            utils.sendCommands("php artisan db:seed");
        },
    },
    {
        label: "db:table",
        description: "Show the database tables",
        handler: async (config) => {
            utils.sendCommands("php artisan db:table");
        },
    },
    {
        label: "db:show",
        description: "Show the database",
        handler: async (config) => {
            utils.sendCommands("php artisan db:show");
        },
    },
    {
        label: "db:monitor",
        description: "Monitor the database",
        handler: async (config) => {
            utils.sendCommands("php artisan db:monitor");
        },
    },
    {
        label: "db:wipe",
        description: "Wipe the database",
        handler: async (config) => {
            utils.sendCommands("php artisan db:wipe --force");
        },
    },
    {
        label: "optimize:clear",
        description: "Clear the optimization cache",
        handler: async (config) => {
            utils.sendCommands("php artisan optimize:clear");
        },
    },
    {
        label: "frontend:build",
        description: "Build the frontend",
        handler: async (config) => {
            utils.sendCommands("php artisan frontend:build");
        },
    },
    {
        label: "frontend:env",
        description: "Set the frontend environment",
        handler: async (config) => {
            utils.sendCommands("php artisan frontend:env");
        },
    },
    {
        label: "ide:fix",
        description: "Fix the IDE",
        handler: async (config) => {
            utils.sendCommands("php artisan ide:fix");
        },
    },
    {
        label: "metafox:dump",
        description: "Dump the Metafox application",
        handler: async (config) => {
            utils.sendCommands("php artisan metafox:dump");
        },
    },
    {
        label: "metafox:stats",
        description: "Show the Metafox statistics",
        handler: async (config) => {
            utils.sendCommands("php artisan metafox:stats");
        },
    },
    {
        label: "scribe:generate",
        description: "Generate the API documentation",
        handler: async (config) => {
            utils.sendCommands("php artisan scribe:generate");
        },
    },
    {
        label: "event:cache",
        description: "Cache the events",
        handler: async (config) => {
            utils.sendCommands("php artisan event:cache");
        },
    },
    {
        label: "event:clear",
        description: "Clear the events",
        handler: async (config) => {
            utils.sendCommands("php artisan event:clear");
        },
    },
    {
        label: "backup:clean",
        description: "Clean the backups",
        handler: async (config) => {
            utils.sendCommands("php artisan backup:clean");
        },
    },
    {
        label: "backup:run",
        description: "Run the backups",
        handler: async (config) => {
            utils.sendCommands("php artisan backup:run");
        },
    },
    {
        label: "backup:monitor",
        description: "Monitor the backups",
        handler: async (config) => {
            utils.sendCommands("php artisan backup:monitor");
        },
    },
    {
        label: "backup:list",
        description: "List the backups",
        handler: async (config) => {
            utils.sendCommands("php artisan backup:list");
        },
    },
    {
        label: "cache:clear",
        description: "Clear the cache",
        handler: async (config) => {
            utils.sendCommands("php artisan cache:clear");
        },
    },
    {
        label: "cache:forget",
        description: "Forget the cache",
        handler: async (config) => {
            utils.sendCommands("php artisan cache:forget");
        },
    },
    {
        label: "cache:prune-stale-tags",
        description: "Prune the stale tags",
        handler: async (config) => {
            utils.sendCommands("php artisan cache:prune-stale-tags");
        },
    },
    {
        label: "cache:reset",
        description: "Reset the cache",
        handler: async (config) => {
            utils.sendCommands("php artisan cache:reset");
        },
    },
    {
        label: "cache:forget",
        description: "Forget the cache",
        handler: async (config) => {
            utils.sendCommands("php artisan cache:forget");
        },
    },
    {
        label: "config:cache",
        description: "Cache the config",
        handler: async (config) => {
            utils.sendCommands("php artisan config:cache");
        },
    },
    {
        label: "config:clear",
        description: "Clear the config",
        handler: async (config) => {
            utils.sendCommands("php artisan config:clear");
        },
    },
    {
        label: "package:activate",
        description: "Activate the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:activate ${pkg.name}`);
        },
    },
    {
        label: "package:discover",
        description: "Discover the packages",
        handler: async (config) => {
            utils.sendCommands(`php artisan package:discover`);
        },
    },
    {
        label: "package:fix",
        description: "Fix the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:fix ${pkg.name}`);
        },
    },
    {
        label: "package:factory",
        description: "Create a factory for the package",
        handler: async (config) => {
            const entities = [];
            config.packages.forEach((pkg) => {
                pkg.models.forEach((model) => {
                    entities.push(model.entity ?? model.name);
                });
            });
            const entity = await vscode.window.showQuickPick(entities, {
                placeHolder: "Select the entity to create a factory for",
            });
            const count = await utils.pickNumber(1, "Number of items to factory");
            utils.sendCommands(`php artisan package:factory ${entity} --count=${count}`);
        },
    },
    {
        label: "package:list",
        description: "List the packages",
        handler: async (config) => {
            utils.sendCommands(`php artisan package:list`);
        },
    },
    {
        label: "package:install",
        description: "Install the packages",
        handler: async (config) => {
            await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:install --fast`);
        },
    },
    {
        label: "package:make-api-controller",
        description: "Create a API controller for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const model = await utils.pickModel(pkg);
            utils.sendCommands(`php artisan package:make-api-controller ${pkg.name} --name=${model.name}`);
        },
    },
    {
        label: "package:make-datagrid",
        description: "Create a datagrid for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:make-datagrid ${pkg.name} --help`);
        },
    },
    {
        label: "package:make-form",
        description: "Create a form for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:make-form ${pkg.name} --help`);
        },
    },
    {
        label: "package:make-importer",
        description: "Create a importer for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:make-importer ${pkg.name} --help`);
        },
    },
    {
        label: "package:make-job",
        description: "Create a job for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const jobName = await utils.pickName("", "Enter your job name");
            utils.sendCommands(`php artisan package:make-job ${pkg.name} --name=${jobName}`);
        },
    },
    {
        label: "package:make-listener",
        description: "Create a listener for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const listenerName = await utils.pickName("", "Enter your listener name");
            utils.sendCommands(`php artisan package:make-listener ${pkg.name} --name=${listenerName}`);
        },
    },
    {
        label: "package:make-mail",
        description: "Create a mail for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const mailName = await utils.pickName("", "Enter your mail name");
            utils.sendCommands(`php artisan package:make-mail ${pkg.name} --name=${mailName}`);
        },
    },
    {
        label: "package:make-migration",
        description: "Create a migration for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const name = await utils.pickName("", "Enter your table name");
            utils.sendCommands(`php artisan package:make-migration ${pkg.name} --name=${name}`);
        },
    },
    {
        label: "package:make-notification",
        description: "Create a notification for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const name = await utils.pickName("", "Enter your migration name");
            utils.sendCommands(`php artisan package:make-notification ${pkg.name} --name=${name}`);
        },
    },
    {
        label: "package:make-policy",
        description: "Create a policy for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const model = await utils.pickModel(pkg);
            utils.sendCommands(`php artisan package:make-policy ${pkg.name} --name=${model.name}`);
        },
    },
    {
        label: "package:make-request",
        description: "Create a request for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:make-request ${pkg.name} --help`);
        },
    },
    {
        label: "package:make-rule",
        description: "Create a rule for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const name = await utils.pickName("", "Enter rule name");
            utils.sendCommands(`php artisan package:make-rule ${pkg.name} --name=${name}`);
        },
    },
    {
        label: "package:make-seeder",
        description: "Create a seeder for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const model = await utils.pickModel(pkg);
            utils.sendCommands(`php artisan package:make-seeder ${pkg.name} --name=${model.name}`);
        },
    },
    {
        label: "package:migrate-reset --path",
        description: "Migrate reset for single migration file",
        handler: async (config) => {
            const filename = await utils.pickFilename("", "Enter the migration refresh filename");
            utils.sendCommands(`php artisan package:migrate-reset --path=${filename}`);
        },
    },
    {
        label: "package:migrate-reset {package}",
        description: "Migrate reset for a package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            if (pkg) {
                utils.sendCommands(`php artisan package:migrate-reset ${pkg.name}`);
            }
        },
    },
    {
        label: "package:postinstall",
        description: "Postinstall the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:postinstall ${pkg.name}`);
        },
    },
    {
        label: "package:publish",
        description: "Publish the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:publish ${pkg.name} --help`);
        },
    },
    {
        label: "package:review",
        description: "Review the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:review ${pkg.name} --help`);
        },
    },
    {
        label: "package:uninstall",
        description: "Uninstall the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:uninstall ${pkg.name} --help`);
        },
    },
    {
        label: "package:make",
        description: "Make the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:make ${pkg.name} --help`);
        },
    },
    {
        label: "package:make-model",
        description: "Create a model for the package",
        handler: async (config) => {
            const models = [];
            config.packages.forEach((pkg) => {
                pkg.models.forEach((model) => {
                    models.push({
                        label: model.name,
                        description: `Create a model ${model.name}`,
                        model,
                        package: pkg,
                    });
                });
            });
            const choice = await vscode.window.showQuickPick(models, {
                placeHolder: "Select the model to create",
            });
            if (choice) {
                utils.sendCommands([
                    `php artisan package:make-model ${choice.package.name}`,
                    `--name=${choice.model.name}`,
                    choice.model.factory && "--has-factory",
                    choice.model.policy && "--has-policy",
                    choice.model.repository && "--has-repository",
                ]
                    .filter(Boolean)
                    .join(" "));
            }
        },
    },
    {
        label: "package:make-policy",
        description: "Create a policy for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const model = await utils.pickModel(pkg);
            utils.sendCommands(`php artisan package:make-policy ${pkg.name} --name=${model.name}`);
        },
    },
    {
        label: "package:make-rule",
        description: "Create a rule for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const name = await utils.pickName("", "Enter rule name");
            utils.sendCommands(`php artisan package:make-rule ${pkg.name} --name=${name}`);
        },
    },
    {
        label: "package:make-seeder",
        description: "Create a seeder for the package",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            const model = await utils.pickModel(pkg);
            utils.sendCommands(`php artisan package:make-seeder ${pkg.name} --name=${model.name}`);
        },
    },
    {
        label: "package:postinstall",
        description: "Postinstall the packages",
        handler: async (config) => {
            const pkg = await utils.pickPackage(config);
            utils.sendCommands(`php artisan package:postinstall ${pkg.name}`);
        },
    },
];
exports.default = commandList;
//# sourceMappingURL=packageCommands.js.map