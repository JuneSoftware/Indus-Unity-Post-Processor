import {PlatformInterface} from './TargetPlatform'

export class iOS implements PlatformInterface {
  getScriptDefineSymbols(symbols: any): string {
    return symbols['4']
  }
  getCombinedVersionNo(projectSettings: any): string {
    const version = this.getVersionNo(projectSettings)
    const build = this.getBuildNo(projectSettings)
    return version.concat(' #', build)
  }
  getScriptingBackend(backend: any): number {
    void backend
    return 1
  }
  getArchitectures(architecture: any): number {
    void architecture
    return 0
  }
  getVersionNo(projectSettings: any): string {
    return projectSettings['bundleVersion'].toString()
  }
  getBuildNo(projectSettings: any): string {
    return projectSettings['buildNumber'].toString()
  }
}
