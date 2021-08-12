import * as core from '@actions/core'
import path from 'path'
import fs from 'fs'
import {getStoredVersionNo, getStoredVersionCode} from './exportProperties'

export function updateBuildPath(buildPath: string, platform: string): void {
  const updatedBuildPath = `${buildPath}_Ver${getFormattedVersionNoForPath()}___Date${getFormatterDateAndTime()}`
  fs.renameSync(buildPath, updatedBuildPath)
  updateBuildName(platform, updatedBuildPath)
}

export function updateBuildName(platform: string, buildPath: string): void {
  let destinationPath = buildPath
  let binaryExt: string
  let binaryPath: string
  const buildName = core.getInput('buildName')
  switch (platform) {
    case 'Android':
      binaryExt = '.apk'
      binaryPath = path.join(buildPath, buildName).concat(binaryExt)
      destinationPath = path
        .join(buildPath, buildName)
        .concat('_', getFormattedVersionNoForBinary(), binaryExt)
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
  const bucketName = core.getInput('s3BucketName')
  const buildURLPrefix = `https://${bucketName}.s3.ap-south-1.amazonaws.com/`
  const buildURL = buildURLPrefix.concat(platform, buildURLSuffix)
  core.setOutput('buildLink', buildURL) //Set build URL as output parameter
}

export function getFormattedVersionNoForBinary(): string {
  return `V${getStoredVersionNo()}_VC${getStoredVersionCode()}`
}

export function getFormattedVersionNoForPath(): string {
  return `(${getStoredVersionNo()}-${getStoredVersionCode()})`
}

export function getFormatterDateAndTime(): string {
  const date = new Date()
  return `(${date
    .toUTCString()
    .split(':')
    .join('-')
    .split(',')
    .join('')
    .split('/')
    .join('-')
    .split(' ')
    .join('_')})`
}
