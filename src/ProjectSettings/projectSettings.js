"use strict";
exports.__esModule = true;
exports.getTargetArchitectures = exports.getScriptingBackend = exports.getBuildNo = exports.getVersionNo = exports.getCombinedVersionNo = exports.getScriptDefineSymbols = exports.parse = void 0;
var yaml_1 = require("yaml");
var TargetPlatform_1 = require("./Platforms/TargetPlatform");
var playerSettingsKey = 'PlayerSettings';
var scriptingBackendKey = 'scriptingBackend';
var scriptingDefineSymbolsKey = 'scriptingDefineSymbols';
var undefined = 'Undefined';
var yamlObject;
var targetPlatform;
function parse(yamlFile, platform) {
    yamlObject = yaml_1["default"].parse(yamlFile);
    targetPlatform = TargetPlatform_1.getPlatform(platform);
}
exports.parse = parse;
function getScriptDefineSymbols() {
    return targetPlatform.getScriptDefineSymbols(yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]);
}
exports.getScriptDefineSymbols = getScriptDefineSymbols;
function getCombinedVersionNo() {
    return targetPlatform.getCombinedVersionNo(yamlObject[playerSettingsKey]);
}
exports.getCombinedVersionNo = getCombinedVersionNo;
function getVersionNo() {
    return targetPlatform.getVersionNo(yamlObject[playerSettingsKey]);
}
exports.getVersionNo = getVersionNo;
function getBuildNo() {
    return targetPlatform.getBuildNo(yamlObject[playerSettingsKey]);
}
exports.getBuildNo = getBuildNo;
function getScriptingBackend() {
    var id = targetPlatform.getScriptingBackend(yamlObject[playerSettingsKey][scriptingBackendKey]);
    if (id === 0)
        return 'Mono';
    else if (id === 1)
        return 'IL2CPP';
    else
        return undefined;
}
exports.getScriptingBackend = getScriptingBackend;
function getTargetArchitectures() {
    var id = targetPlatform.getArchitectures(yamlObject[playerSettingsKey]);
    if (id === 1)
        return 'ARMv7';
    else if (id === 2)
        return 'ARM64';
    else if (id === 3)
        return 'ARMv7, ARM64';
    else if (id === 0)
        return '64Bit';
    else
        return undefined;
}
exports.getTargetArchitectures = getTargetArchitectures;
