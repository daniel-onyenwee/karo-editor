"use strict";
var fs_1 = require("fs");
var path_1 = require("path");
var mineDb = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "content-type-db.json"), { encoding: "utf8" }));
module.exports = function (filePath) {
    return (0, path_1.extname)(filePath) in mineDb ? mineDb[(0, path_1.extname)(filePath)] : "text/plain";
};
