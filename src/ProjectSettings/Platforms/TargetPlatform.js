"use strict";
exports.__esModule = true;
exports.getPlatform = void 0;
var Android_1 = require("./Android");
var iOS_1 = require("./iOS");
var StandaloneWindows64_1 = require("./StandaloneWindows64");
var targetPlatform;
function getPlatform(platform) {
    switch (platform) {
        case 'Android':
            targetPlatform = new Android_1.Android();
            break;
        case 'StandaloneWindows64':
            targetPlatform = new StandaloneWindows64_1.StandaloneWindows64();
            break;
        case 'iOS':
            targetPlatform = new iOS_1.iOS();
            break;
    }
    return targetPlatform;
}
exports.getPlatform = getPlatform;
