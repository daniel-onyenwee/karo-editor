"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var karo_cli_1 = __importDefault(require("./libs/karo-cli"));
var cli = new karo_cli_1.default();
module.exports = cli.run.bind(cli);
