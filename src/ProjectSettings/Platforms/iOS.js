"use strict";
exports.__esModule = true;
exports.iOS = void 0;
var iOS = /** @class */ (function () {
    function iOS() {
    }
    iOS.prototype.getScriptDefineSymbols = function (symbols) {
        return symbols['4'];
    };
    iOS.prototype.getCombinedVersionNo = function (projectSettings) {
        var version = this.getVersionNo(projectSettings);
        var build = this.getBuildNo(projectSettings);
        return version.concat(' #', build);
    };
    iOS.prototype.getScriptingBackend = function (backend) {
        void backend;
        return 1;
    };
    iOS.prototype.getArchitectures = function (architecture) {
        void architecture;
        return 0;
    };
    iOS.prototype.getVersionNo = function (projectSettings) {
        return projectSettings['bundleVersion'].toString();
    };
    iOS.prototype.getBuildNo = function (projectSettings) {
        return projectSettings['buildNumber'].toString();
    };
    return iOS;
}());
exports.iOS = iOS;
