import * as core from '@actions/core'
import path from 'path'
import fs from 'fs'
import {getStoredVersionNo, getStoredVersionCode} from './exportProperties'

export function updateBuildPath(buildPath: string, platform: string): void {
  const date = new Date()
  const formattedDate = date
    .toLocaleString('en-GB')
    .split(':')
    .join('-')
    .split(',')
    .join('')
    .split('/')
    .join('-')
    .split(' ')
    .join('_')
  const seperator = '_'

  const updatedBuildPath = buildPath.concat(seperator, formattedDate)
  fs.renameSync(buildPath, updatedBuildPath)
  updateBuildName(platform, updatedBuildPath)
}

export function updateBuildName(platform: string, buildPath: string): void {
  let destinationPath = buildPath
  let binaryExt: string
  let binaryPath: string
  switch (platform) {
    case 'Android':
      binaryExt = '.apk'
      binaryPath = path.join(buildPath, platform).concat(binaryExt)
      destinationPath = path
        .join(buildPath, platform)
        .concat('_', getFormattedVersionNo(), binaryExt)
      fs.renameSync(binaryPath, destinationPath)
      break
    case 'StandaloneWindows64':
      break
    case 'StandaloneLinux64':
      break
    case 'iOS':
      break
    default:
      break
  }

  const buildURLSuffix = destinationPath.replace('build', '')
  const buildURLPrefix = 'https://'.concat(
    core.getInput('s3BucketName'),
    '.s3.ap-south-1.amazonaws.com/'
  )
  const buildURL = buildURLPrefix.concat(platform, buildURLSuffix)
  core.setOutput('buildLink', buildURL) //Set build URL as output parameter
  core.info(buildURL)
}

export function getFormattedVersionNo(): string {
  const versionNoId = 'V'
  const seperator = '_'
  const versionCodeId = 'VC'
  return versionNoId.concat(
    getStoredVersionNo(),
    seperator,
    versionCodeId,
    getStoredVersionCode()
  )
}
