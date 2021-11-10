import * as core from '@actions/core'
import fs from 'fs'
import {exportProperties} from './exportBuildProperties'
import {updateBuildNo, updateBuildPath} from './buildPostProcessor'

const targetPlatformInput = 'platform'
const projectSettingsPathInput = 'projectSettingsPath'
const buildPathIput = 'buildPath'

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput(targetPlatformInput) //Get input parameter from YAML file(Actions workflow file)
    const projectSettingsPath: string = core.getInput(projectSettingsPathInput) //Get project settings file path
    const buildPath: string = core.getInput(buildPathIput) //Get build path
    const yamlFile = fs.readFileSync(projectSettingsPath, 'utf8') //Load the project settings file
    exportProperties(yamlFile, platform)
    updateBuildPath(buildPath, platform)
    updateBuildNo()
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run() //Execute the action
