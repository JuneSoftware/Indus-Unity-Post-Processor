import * as core from '@actions/core'
import {
  scriptingDefineSymbolsKey,
  playerSettingsKey,
  scriptingBackendKey,
  architectureKey,
  versionKey,
  bundleVersionKey,
  buildNumberKey,
  undefined
} from './main'

let versionNo = '0.0.0'

export function exportProperties(yamlObject: any, platform: string): void {
  switch (platform) {
    case 'Android':
      core.setOutput(
        scriptingDefineSymbolsKey,
        getScriptDefineSymbols(
          yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]['7']
        )
      )
      core.setOutput(
        scriptingBackendKey,
        getScriptingBackendName(
          yamlObject[playerSettingsKey][scriptingBackendKey]['Android']
        ).toString()
      )
      core.setOutput(
        architectureKey,
        getAndroidTargetArchitectures(
          yamlObject[playerSettingsKey]['AndroidTargetArchitectures']
        ).toString()
      )
      core.setOutput(
        versionKey,
        getVersionNo(
          yamlObject[playerSettingsKey][bundleVersionKey].toString(),
          yamlObject[playerSettingsKey]['AndroidBundleVersionCode'].toString(),
          ' #'
        )
      )
      break
    case 'StandaloneWindows64':
      core.setOutput(
        scriptingDefineSymbolsKey,
        getScriptDefineSymbols(
          yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]['1']
        )
      )
      core.setOutput(
        scriptingBackendKey,
        getScriptingBackendName(
          yamlObject[playerSettingsKey][scriptingBackendKey]['Standalone']
        ).toString()
      )
      core.setOutput(architectureKey, '64Bit')
      core.setOutput(
        versionKey,
        getVersionNo(
          yamlObject[playerSettingsKey][bundleVersionKey].toString(),
          '',
          ''
        )
      )
      break
    case 'StandaloneLinux64':
      core.setOutput(
        scriptingDefineSymbolsKey,
        getScriptDefineSymbols(
          yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]['1']
        )
      )
      core.setOutput(
        scriptingBackendKey,
        getScriptingBackendName(
          yamlObject[playerSettingsKey][scriptingBackendKey]['Standalone']
        ).toString()
      )
      core.setOutput(architectureKey, '64Bit')
      core.setOutput(
        versionKey,
        getVersionNo(
          yamlObject[playerSettingsKey][bundleVersionKey].toString(),
          '',
          ''
        )
      )
      break
    case 'iOS':
      core.setOutput(
        scriptingDefineSymbolsKey,
        getScriptDefineSymbols(
          yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]['4']
        )
      )
      core.setOutput(scriptingBackendKey, 'IL2CPP')
      core.setOutput(architectureKey, '64Bit')
      core.setOutput(
        versionKey,
        getVersionNo(
          yamlObject[playerSettingsKey][bundleVersionKey].toString(),
          yamlObject[playerSettingsKey][buildNumberKey]['iPhone'].toString(),
          ' #'
        )
      )
      break
    default:
      core.setOutput(scriptingDefineSymbolsKey, undefined)
      core.setOutput(scriptingBackendKey, undefined)
      core.setOutput(architectureKey, undefined)
      core.setOutput(versionKey, undefined)
      break
  }
}

export function getScriptDefineSymbols(symbols: string): string {
  return symbols.split(';').join(', ')
}

export function getVersionNo(
  version: string,
  build: string,
  seperator: string
): string {
  versionNo = version.concat(seperator, build)
  return versionNo
}

export function getStoredVersionNo(): string {
  return versionNo
}

export function getScriptingBackendName(id: number): string {
  if (id === 0) return 'Mono'
  else if (id === 1) return 'IL2CPP'
  else return undefined
}

export function getAndroidTargetArchitectures(id: number): string {
  if (id === 1) return 'ARMv7'
  else if (id === 2) return 'ARM64'
  else if (id === 3) return 'ARMv7, ARM64'
  else return undefined
}
