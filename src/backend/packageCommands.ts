// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { CommandList } from "../typings";
import * as utils from "../utils";

const commandList: CommandList = {
  optimize: async (config) => {
    utils.sendCommands("php artisan optimize");
  },
  about: async () => {
    utils.sendCommands(`php artisan about`);
  },
  "composer:install": async (config) => {
    utils.sendCommands(`rm -f ./composer.lock`, `./composer install`);
  },
  "metafox:install": async (config) => {
    utils.sendCommands(
      `rm -f ./composer.lock && ./composer install`,
      `(test -f .env && php artisan db:wipe --force)`,
      `(test -f .env && sed -in '/MFOX_APP_INSTALLED=true/d' .env)`,
      `./composer metafox:install`
    );
  },
  "db:wipe": async (config) => {
    utils.sendCommands("php artisan db:wipe --force");
  },
  "optimize:clear": async (config) => {
    utils.sendCommands("php artisan optimize:clear");
  },
  "frontend:build": async (config) => {
    utils.sendCommands("php artisan frontend:build");
  },
  "frontend:env": async (config) => {
    utils.sendCommands("php artisan frontend:env");
  },
  "ide:fix": async (config) => {
    utils.sendCommands("php artisan ide:fix");
  },
  "metafox:dump": async (config) => {
    utils.sendCommands("php artisan metafox:dump");
  },
  "metafox:seed": async (config) => {
    utils.sendCommands("php artisan metafox:seed");
  },
  "metafox:stats": async (config) => {
    utils.sendCommands("php artisan metafox:stats");
  },
  "metafox:update-admin-search": async (config) => {
    utils.sendCommands("php artisan metafox:update-admin-search");
  },
  "metafox:check-compatibility": async (config) => {
    utils.sendCommands("php artisan metafox:check-compatibility");
  },
  "scribe:generate": async (config) => {
    utils.sendCommands(
      `(test ! -z "$(./composer show -N |grep  knuckleswtf/scribe)" || ./composer require knuckleswtf/scribe)`,
      "php artisan scribe:generate"
    );
  },
  "config:clear": async (config) => {
    utils.sendCommands("php artisan config:clear");
  },
  "package:activate": async (config) => {
    const pkg = await utils.pickPackage(config);
    utils.sendCommands(`php artisan package:activate ${pkg.name}`);
  },
  "package:discover": async (config) => {
    utils.sendCommands(`php artisan package:discover`);
  },
  "package:fix": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:fix ${pkg.name}`);
  },
  "package:factory": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:factory ${pkg.name}`);
  },
  "package:list": async (config) => {
    utils.sendCommands(`php artisan package:list`);
  },
  "package:install": async (config) => {
    await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:install`);
  },
  "package:make-api-controller": async (config) => {
    const pkg = await utils.pickPackage(config);
    const model = await utils.pickModel(pkg);

    utils.sendCommands(
      `php artisan package:make-api-controller ${pkg.name} --name=${model.name}`
    );
  },
  "package:make-category": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-category ${pkg.name}`);
  },
  "package:make-datagrid": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-datagrid ${pkg.name}`);
  },
  "package:make-form": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-form ${pkg.name}`);
  },
  "package:make-importer": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-importer ${pkg.name}`);
  },
  "package:make-job": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-job ${pkg.name}`);
  },
  "package:make-listener": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-listener ${pkg.name}`);
  },
  "package:make-mail": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-mail ${pkg.name}`);
  },
  "package:make-migration": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-migration ${pkg.name}`);
  },
  "package:make-notification": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-notification ${pkg.name}`);
  },
  "package:make-policy": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-policy ${pkg.name}`);
  },
  "package:make-request": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-request ${pkg.name}`);
  },
  "package:make-rule": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-rule ${pkg.name}`);
  },
  "package:make-seeder": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:make-seeder ${pkg.name}`);
  },
  "package:migrate": async (config) => {
    await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:migrate`);
  },
  "package:postinstall": async (project) => {
    const pkg = await utils.pickPackage(project);

    utils.sendCommands(`php artisan package:postinstall ${pkg.name}`);
  },
  "package:publish": async (project) => {
    const pkg = await utils.pickPackage(project);

    utils.sendCommands(`php artisan package:publish ${pkg.name}`);
  },
  "package:review": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:review ${pkg.name}`);
  },
  "package:uninstall": async (config) => {
    const pkg = await utils.pickPackage(config);

    utils.sendCommands(`php artisan package:uninstall ${pkg.name}`);
  },
  "package:make": async (config) => {
    await utils.pickPackage(config);
    utils.sendCommands(`cd /app`);
  },
  "package:make-model": async (config) => {
    const pkg = await utils.pickPackage(config);
    const model = await utils.pickModel(pkg);

    utils.sendCommands(
      [
        `php artisan package:make-model ${pkg.name} --name=${model.name}`,
        model.factory && "--has-factory",
        model.policy && "--has-policy",
        model.repository && "--has-repository",
      ]
        .filter(Boolean)
        .join(" ")
    );
  },
};

export default commandList;
