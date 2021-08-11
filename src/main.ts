import * as core from '@actions/core'
import fs from 'fs'
import yaml from 'yaml'
import path from 'path'

const playerSettingsKey = 'PlayerSettings'
const scriptingBackendKey = 'scriptingBackend'
const scriptingDefineSymbolsKey = 'scriptingDefineSymbols'
const architectureKey = 'architecture'
const versionKey = 'versionNo'
const bundleVersionKey = 'bundleVersion'
const buildNumberKey = 'buildNumber'
const undefined = 'Undefined'

let versionNo = '0.0.0'

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform') //Get input parameter from YAML file(Actions workflow file)
    const projectSettingsPath: string = core.getInput('projectSettingsPath') //Get project settings file path
    const buildPath: string = core.getInput('buildPath') //Get build path
    const yamlFile = fs.readFileSync(projectSettingsPath, 'utf8') //Load the project settings file
    const yamlObject = yaml.parse(yamlFile) //Parse using YAML library
    exportProperties(yamlObject, platform)
    updateBuildPath(buildPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run() //Execute the action

function updateBuildPath(buildPath: string): void {
  // const date = new Date()
  // const formattedDate = date
  //   .toLocaleString('en-GB')
  //   .split(':')
  //   .join('-')
  //   .split(',')
  //   .join('')
  //   .split('/')
  //   .join('-')
  //   .split(' ')
  //   .join('_')
  // const buildFolder = 'build'
  // const folderSeperator = '/'
  // const seperator = '_'
  // const sourcePath = buildFolder.concat(folderSeperator, platform)
  // const destinationPath = buildFolder.concat(
  //   folderSeperator,
  //   platform,
  //   seperator,
  //   formattedDate
  // )
  //const buildURLPrefix = 'https://indus-builds.s3.ap-south-1.amazonaws.com/'
  //const buildURL = buildURLPrefix.concat()
  // fs.renameSync(sourcePath, destinationPath)

  // core.setOutput(buildPath, destinationPath)

  core.info(buildPath)
  core.info(path.dirname(buildPath))
  core.info(path.sep)
  core.info(path.basename(buildPath))
  core.info(path.extname(buildPath))
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
  versionNo = version.concat(seperator, build)
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
