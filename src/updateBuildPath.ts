import * as core from '@actions/core'
import path from 'path'
import fs from 'fs'
import {getStoredVersionNo, getStoredVersionCode} from './exportProperties'

export function updateBuildPath(buildPath: string): void {
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

    //const buildURLPrefix = 'https://indus-builds.s3.ap-south-1.amazonaws.com/'
  //const buildURL = buildURLPrefix.concat()
  // core.setOutput(buildPath, destinationPath)
  core.info(getStoredVersionNo())
  core.info(getStoredVersionCode())
  core.info(updatedBuildPath)
  core.info(path.dirname(updatedBuildPath))
  core.info(path.sep)
  core.info(path.basename(updatedBuildPath))
  core.info(path.extname(updatedBuildPath))
}
