import {PlatformInterface} from './TargetPlatform'

export class Android implements PlatformInterface {
  getScriptDefineSymbols(symbols: any): string {
    return symbols['7']
  }
  getCombinedVersionNo(projectSettings: any): string {
    const version = this.getVersionNo(projectSettings)
    const build = this.getBuildNo(projectSettings)
    return version.concat(' #', build)
  }
  getScriptingBackend(backend: any): number {
    return backend['Android']
  }
  getArchitectures(architecture: any): number {
    return architecture['AndroidTargetArchitectures']
  }
  getVersionNo(projectSettings: any): string {
    return projectSettings['bundleVersion'].toString()
  }
  getBuildNo(projectSettings: any): string {
    return projectSettings['AndroidBundleVersionCode'].toString()
  }
}
