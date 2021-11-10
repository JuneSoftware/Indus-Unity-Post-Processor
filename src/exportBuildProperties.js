"use strict";
exports.__esModule = true;
exports.exportProperties = void 0;
var core = require("@actions/core");
var projectSettings_1 = require("./ProjectSettings/projectSettings");
var scriptingBackendKey = 'scriptingBackend';
var scriptingDefineSymbolsKey = 'scriptingDefineSymbols';
var architectureKey = 'architecture';
var versionKey = 'versionNo';
function exportProperties(yamlObject, platform) {
    projectSettings_1.parse(yamlObject, platform);
    core.setOutput(scriptingDefineSymbolsKey, projectSettings_1.getScriptDefineSymbols());
    core.setOutput(scriptingBackendKey, projectSettings_1.getScriptingBackend());
    core.setOutput(architectureKey, projectSettings_1.getTargetArchitectures());
    core.setOutput(versionKey, projectSettings_1.getCombinedVersionNo());
}
exports.exportProperties = exportProperties;
