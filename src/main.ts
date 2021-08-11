import * as core from '@actions/core'
import fs from 'fs'
import yaml from 'yaml'
import {exportProperties} from './exportProperties'
import {updateBuildPath} from './updateBuildPath'

export const playerSettingsKey = 'PlayerSettings'
export const scriptingBackendKey = 'scriptingBackend'
export const scriptingDefineSymbolsKey = 'scriptingDefineSymbols'
export const architectureKey = 'architecture'
export const versionKey = 'versionNo'
export const bundleVersionKey = 'bundleVersion'
export const buildNumberKey = 'buildNumber'
export const undefined = 'Undefined'

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform') //Get input parameter from YAML file(Actions workflow file)
    const projectSettingsPath: string = core.getInput('projectSettingsPath') //Get project settings file path
    const buildPath: string = core.getInput('buildPath') //Get build path
    const yamlFile = fs.readFileSync(projectSettingsPath, 'utf8') //Load the project settings file
    const yamlObject = yaml.parse(yamlFile) //Parse using YAML library
    exportProperties(yamlObject, platform)
    updateBuildPath(buildPath, platform)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run() //Execute the action
