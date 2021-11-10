"use strict";
exports.__esModule = true;
exports.Android = void 0;
var Android = /** @class */ (function () {
    function Android() {
    }
    Android.prototype.getScriptDefineSymbols = function (symbols) {
        return symbols['7'];
    };
    Android.prototype.getCombinedVersionNo = function (projectSettings) {
        var version = this.getVersionNo(projectSettings);
        var build = this.getBuildNo(projectSettings);
        return version.concat(' #', build);
    };
    Android.prototype.getScriptingBackend = function (backend) {
        return backend['Android'];
    };
    Android.prototype.getArchitectures = function (architecture) {
        return architecture['AndroidTargetArchitectures'];
    };
    Android.prototype.getVersionNo = function (projectSettings) {
        return projectSettings['bundleVersion'].toString();
    };
    Android.prototype.getBuildNo = function (projectSettings) {
        return projectSettings['AndroidBundleVersionCode'].toString();
    };
    return Android;
}());
exports.Android = Android;
