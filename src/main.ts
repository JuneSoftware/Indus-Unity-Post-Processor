import * as core from '@actions/core'
import fs from 'fs'
import yaml from 'yaml'

const playerSettingsKey = 'PlayerSettings'
const scriptingBackendKey = 'scriptingBackend'
const scriptingDefineSymbolsKey = 'scriptingDefineSymbols'
const architectureKey = 'architecture'
const versionKey = 'versionNo'
const bundleVersionKey = 'bundleVersion'
const buildNumberKey = 'buildNumber'
const undefined = 'Undefined'

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform') //Get input parameter from YAML file(Actions workflow file)
    const path: string = core.getInput('path') //Get project settings file path
    const yamlFile = fs.readFileSync(path, 'utf8') //Load the project settings file
    const yamlObject = yaml.parse(yamlFile) //Parse using YAML library
    exportProperties(yamlObject, platform)
    updateBuildPath(platform)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run() //Execute the action

function updateBuildPath(platform: string): void {
  const date = new Date()
  const formattedDate = date
    .toLocaleString('en-GB')
    .split(':')
    .join('-')
    .split(',')
    .join('')
  const buildFolder = 'build'
  const folderSeperator = '/'
  const seperator = ' '
  // fs.renameSync(
  //   buildFolder.concat(folderSeperator, platform),
  //   buildFolder.concat(folderSeperator, platform, seperator, formattedDate)
  // )

  fs.renameSync(
    'build/Android',
    'build/Android_3'
  )

  const textFile = fs.readFileSync(
    'build/Android_3/TestingObject.txt',
    'utf8'
  )
  console.log(textFile)
}

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
  return version.concat(seperator, build)
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
