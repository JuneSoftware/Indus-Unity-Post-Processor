import * as core from '@actions/core'
import fs from "fs";
import yaml from "yaml";

const playerSettingsKey = "PlayerSettings";
const scriptingBackendKey = "scriptingBackend";
const scriptingDefineSymbolsKey = "scriptingDefineSymbols";
const architectureKey = "architecture";
const versionKey = "versionNo";
const bundleVersionKey = "bundleVersion";
const buildNumberKey = "buildNumber";
const undefined = "Undefined";


export function exportProperties(yamlObject: any, platform: string): void {
  core.info(yamlObject[playerSettingsKey].toString());
  core.setOutput("playerSettings", yamlObject[playerSettingsKey].toString());

  switch (platform) {
    case "Android":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["7"].toString());
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Android"]).toString());
      core.setOutput(architectureKey, getAndroidTargetArchitectures(yamlObject[playerSettingsKey]["AndroidTargetArchitectures"]).toString());
      core.setOutput(versionKey, getVersionNo(yamlObject[playerSettingsKey][bundleVersionKey].toString(), yamlObject[playerSettingsKey]["AndroidBundleVersionCode"].toString()));
      break;
    case "StandaloneWindows64":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["1"].toString());
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Standalone"]).toString());
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, getVersionNo(yamlObject[playerSettingsKey][bundleVersionKey].toString(), yamlObject[playerSettingsKey][buildNumberKey]["Standalone"].toString()));
      break;
    case "StandaloneLinux64":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["1"].toString());
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Standalone"]).toString());
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, getVersionNo(yamlObject[playerSettingsKey][bundleVersionKey].toString(), yamlObject[playerSettingsKey][buildNumberKey]["Standalone"].toString()));
      break;
    case "iOS":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["4"].toString());
      core.setOutput(scriptingBackendKey, "IL2CPP");
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, getVersionNo(yamlObject[playerSettingsKey][bundleVersionKey].toString(), yamlObject[playerSettingsKey][buildNumberKey]["iPhone"].toString()));
      break;
    default:
      core.setOutput(scriptingDefineSymbolsKey, undefined);
      core.setOutput(scriptingBackendKey, undefined);
      core.setOutput(architectureKey, undefined);
      core.setOutput(versionKey, undefined)
      break;
  }
}

export function getVersionNo(version: string, build: string): string{
  const seperator: string = " #";
  return version.concat(seperator, build);
}

export function getScriptingBackendName(id: number): string {
  if (id === 0)
    return "Mono";
  else if (id === 1)
    return "IL2CPP";
  else
    return undefined;
}

export function getAndroidTargetArchitectures(id: number): string {
  if (id === 1)
    return "ARMv7";
  else if (id === 2)
    return "ARM64";
  else if (id === 3)
    return "ARMv7, ARM64";
  else
    return undefined;
}

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform'); //Get input parameter from YAML file(Actions workflow file)
    const path: string = core.getInput('path'); //Get project settings file path
    const yamlFile = fs.readFileSync(path, "utf8"); //Load the project settings file
    const yamlObject = yaml.parse(yamlFile); //Parse using YAML library
    exportProperties(yamlObject, platform);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
