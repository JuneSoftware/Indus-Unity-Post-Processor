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
  //const buildURLPrefix = 'https://indus-builds.s3.ap-south-1.amazonaws.com/'
  //const buildURL = buildURLPrefix.concat()
  fs.renameSync(buildPath, buildPath.concat(seperator, formattedDate))
  // core.setOutput(buildPath, destinationPath)
  core.info(getStoredVersionNo())
  core.info(getStoredVersionCode())
  core.info(buildPath)
  core.info(path.dirname(buildPath))
  core.info(path.sep)
  core.info(path.basename(buildPath))
  core.info(path.extname(buildPath))
}
