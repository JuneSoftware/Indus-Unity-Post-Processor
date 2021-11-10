"use strict";
exports.__esModule = true;
exports.getFormatterDateAndTime = exports.getFormattedVersionNoForPath = exports.getFormattedVersionNoForBinary = exports.updateBuildName = exports.updateBuildPath = void 0;
var core = require("@actions/core");
var path_1 = require("path");
var fs_1 = require("fs");
var projectSettings_1 = require("./ProjectSettings/projectSettings");
function updateBuildPath(buildPath, platform) {
    var updatedBuildPath = buildPath + "_Ver" + getFormattedVersionNoForPath() + "___Date" + getFormatterDateAndTime();
    fs_1["default"].renameSync(buildPath, updatedBuildPath);
    updateBuildName(platform, updatedBuildPath);
}
exports.updateBuildPath = updateBuildPath;
function updateBuildName(platform, buildPath) {
    var bucketName = core.getInput('s3BucketName');
    var buildName = core.getInput('buildName');
    var destinationPath = buildPath;
    var binaryExt;
    var binaryPath;
    var buildURLSuffix = destinationPath.replace('build', ''); //Fallback URL values
    var buildURLPrefix = "https://s3.console.aws.amazon.com/s3/buckets/" + bucketName + "?prefix="; //Fallback URL values
    switch (platform) {
        case 'Android':
            binaryExt = '.apk';
            binaryPath = path_1["default"].join(buildPath, buildName).concat(binaryExt);
            destinationPath = path_1["default"]
                .join(buildPath, buildName)
                .concat('_', getFormattedVersionNoForBinary(), binaryExt);
            fs_1["default"].renameSync(binaryPath, destinationPath);
            buildURLPrefix = "https://" + bucketName + ".s3.ap-south-1.amazonaws.com/";
            buildURLSuffix = destinationPath.replace('build', '');
            break;
        case 'StandaloneWindows64':
        case 'StandaloneLinux64':
            buildURLSuffix = buildURLSuffix + "/&region=ap-south-1";
            break;
        case 'iOS':
            //TODO: Need to add when required
            break;
        default:
            break;
    }
    var buildURL = buildURLPrefix.concat(platform, buildURLSuffix);
    core.info(buildURL);
    core.setOutput('buildLink', buildURL); //Set build URL as output parameter
}
exports.updateBuildName = updateBuildName;
function getFormattedVersionNoForBinary() {
    return "V" + projectSettings_1.getVersionNo() + "_VC" + projectSettings_1.getBuildNo();
}
exports.getFormattedVersionNoForBinary = getFormattedVersionNoForBinary;
function getFormattedVersionNoForPath() {
    var versionCode = projectSettings_1.getVersionNo();
    if (versionCode !== '')
        versionCode = "-" + versionCode;
    return "(" + projectSettings_1.getVersionNo() + versionCode + ")";
}
exports.getFormattedVersionNoForPath = getFormattedVersionNoForPath;
function getFormatterDateAndTime() {
    var date = new Date();
    return "(" + date
        .toLocaleString('en-GB', { timeZone: 'UTC' })
        .split(':')
        .join('-')
        .split(',')
        .join('')
        .split('/')
        .join('-')
        .split(' ')
        .join('_') + ")";
}
exports.getFormatterDateAndTime = getFormatterDateAndTime;
