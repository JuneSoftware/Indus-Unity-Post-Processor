"use strict";
exports.__esModule = true;
exports.StandaloneWindows64 = void 0;
var StandaloneWindows64 = /** @class */ (function () {
    function StandaloneWindows64() {
    }
    StandaloneWindows64.prototype.getScriptDefineSymbols = function (symbols) {
        return symbols['1'];
    };
    StandaloneWindows64.prototype.getCombinedVersionNo = function (projectSettings) {
        var version = this.getVersionNo(projectSettings);
        var build = this.getBuildNo(projectSettings);
        return version.concat(' #', build);
    };
    StandaloneWindows64.prototype.getScriptingBackend = function (backend) {
        return backend['Standalone'];
    };
    StandaloneWindows64.prototype.getArchitectures = function (architecture) {
        void architecture;
        return 0;
    };
    StandaloneWindows64.prototype.getVersionNo = function (projectSettings) {
        return projectSettings['bundleVersion'].toString();
    };
    StandaloneWindows64.prototype.getBuildNo = function (projectSettings) {
        return projectSettings['AndroidBundleVersionCode'].toString();
    };
    return StandaloneWindows64;
}());
exports.StandaloneWindows64 = StandaloneWindows64;
