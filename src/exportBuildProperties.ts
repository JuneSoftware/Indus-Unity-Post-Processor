import * as core from '@actions/core'
import {
  getCombinedVersionNo,
  getScriptDefineSymbols,
  getScriptingBackend,
  getTargetArchitectures,
  parse
} from './ProjectSettings/projectSettings'

const scriptingBackendKey = 'scriptingBackend'
const scriptingDefineSymbolsKey = 'scriptingDefineSymbols'
const architectureKey = 'architecture'
const versionKey = 'versionNo'

export function exportProperties(yamlObject: string, platform: string): void {
  parse(yamlObject, platform)

  core.setOutput(scriptingDefineSymbolsKey, getScriptDefineSymbols())
  core.setOutput(scriptingBackendKey, getScriptingBackend())
  core.setOutput(architectureKey, getTargetArchitectures())
  core.setOutput(versionKey, getCombinedVersionNo())
}
