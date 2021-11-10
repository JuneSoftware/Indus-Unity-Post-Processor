import yaml from 'yaml'
import {PlatformInterface, getPlatform} from './Platforms/TargetPlatform'

const playerSettingsKey = 'PlayerSettings'
const scriptingBackendKey = 'scriptingBackend'
const scriptingDefineSymbolsKey = 'scriptingDefineSymbols'
const undefined = 'Undefined'

let yamlObject: any
let targetPlatform: PlatformInterface

export function parse(yamlFile: string, platform: string): void {
  yamlObject = yaml.parse(yamlFile)
  targetPlatform = getPlatform(platform)
}

export function updateBuildNumber(): void {
  const projectSettings = yamlObject[playerSettingsKey]
  projectSettings['AndroidBundleVersionCode'] =
    Number(projectSettings['AndroidBundleVersionCode']) + 1
  projectSettings['buildNumber'] = Number(projectSettings['buildNumber']) + 1
  yamlObject[playerSettingsKey] = projectSettings
}

export function getScriptDefineSymbols(): string {
  return targetPlatform.getScriptDefineSymbols(
    yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]
  )
}

export function getCombinedVersionNo(): string {
  return targetPlatform.getCombinedVersionNo(yamlObject[playerSettingsKey])
}

export function getVersionNo(): string {
  return targetPlatform.getVersionNo(yamlObject[playerSettingsKey])
}

export function getBuildNo(): string {
  return targetPlatform.getBuildNo(yamlObject[playerSettingsKey])
}

export function getScriptingBackend(): string {
  const id = targetPlatform.getScriptingBackend(
    yamlObject[playerSettingsKey][scriptingBackendKey]
  )
  if (id === 0) return 'Mono'
  else if (id === 1) return 'IL2CPP'
  else return undefined
}

export function getTargetArchitectures(): string {
  const id = targetPlatform.getArchitectures(yamlObject[playerSettingsKey])
  if (id === 1) return 'ARMv7'
  else if (id === 2) return 'ARM64'
  else if (id === 3) return 'ARMv7, ARM64'
  else if (id === 0) return '64Bit'
  else return undefined
}

export function printYamlFile(): string {
  return yaml.stringify(yamlObject)
}
