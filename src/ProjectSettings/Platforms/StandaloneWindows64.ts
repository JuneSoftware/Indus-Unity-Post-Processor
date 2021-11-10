import {PlatformInterface} from './TargetPlatform'

export class StandaloneWindows64 implements PlatformInterface {
  getScriptDefineSymbols(symbols: any): string {
    return symbols['1']
  }
  getCombinedVersionNo(projectSettings: any): string {
    const version = this.getVersionNo(projectSettings)
    const build = this.getBuildNo(projectSettings)
    return version.concat(' #', build)
  }
  getScriptingBackend(backend: any): number {
    return backend['Standalone']
  }
  getArchitectures(architecture: any): number {
    void architecture
    return 0
  }
  getVersionNo(projectSettings: any): string {
    return projectSettings['bundleVersion'].toString()
  }
  getBuildNo(projectSettings: any): string {
    return projectSettings['AndroidBundleVersionCode'].toString()
  }
}
