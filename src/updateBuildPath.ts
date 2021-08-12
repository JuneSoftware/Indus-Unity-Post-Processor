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
  const bucketName = core.getInput('s3BucketName')
  const buildName = core.getInput('buildName')

  let destinationPath = buildPath
  let binaryExt: string
  let binaryPath: string
  let buildURLSuffix = destinationPath.replace('build', '')
  let buildURLPrefix = `https://s3.console.aws.amazon.com/s3/buckets/${bucketName}?prefix=`

  switch (platform) {
    case 'Android':
      binaryExt = '.apk'
      binaryPath = path.join(buildPath, buildName).concat(binaryExt)
      destinationPath = path
        .join(buildPath, buildName)
        .concat('_', getFormattedVersionNoForBinary(), binaryExt)
      fs.renameSync(binaryPath, destinationPath)

      buildURLPrefix = `https://${bucketName}.s3.ap-south-1.amazonaws.com/`
      break
    case 'StandaloneWindows64':
    case 'StandaloneLinux64':
      buildURLSuffix = `${buildURLSuffix}/&region=ap-south-1`
      break
    case 'iOS':
      //TODO: Need to add when required
      break
    default:
      break
  }

  const buildURL = buildURLPrefix.concat(platform, buildURLSuffix)
  core.info(buildURL)
  core.setOutput('buildLink', buildURL) //Set build URL as output parameter
}

export function getFormattedVersionNoForBinary(): string {
  return `V${getStoredVersionNo()}_VC${getStoredVersionCode()}`
}

export function getFormattedVersionNoForPath(): string {
  let versionCode = getStoredVersionCode()
  if (versionCode !== '') versionCode = `-${versionCode}`
  return `(${getStoredVersionNo()}${versionCode})`
}

export function getFormatterDateAndTime(): string {
  const date = new Date()
  return `(${date
    .toLocaleString('en-GB', {timeZone: 'UTC'})
    .split(':')
    .join('-')
    .split(',')
    .join('')
    .split('/')
    .join('-')
    .split(' ')
    .join('_')})`
}
