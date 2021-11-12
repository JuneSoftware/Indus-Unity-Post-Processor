import {Android} from './Android'
import {iOS} from './iOS'
import {StandaloneWindows64} from './StandaloneWindows64'

export interface PlatformInterface {
  getScriptDefineSymbols(yamlObject: any): string
  getCombinedVersionNo(yamlObject: any): string
  getScriptingBackend(yamlObject: any): number
  getArchitectures(yamlObject: any): number
  getVersionNo(yamlObject: any): string
  getBuildNo(yamlObject: any): string
}

let targetPlatform: PlatformInterface

export function getPlatform(platform: string): PlatformInterface {
  switch (platform) {
    case 'Android':
      targetPlatform = new Android()
      break
    case 'StandaloneWindows64':
      targetPlatform = new StandaloneWindows64()
      break
    case 'iOS':
      targetPlatform = new iOS()
      break
  }

  return targetPlatform
}
