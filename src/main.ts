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
  core.info(yamlObject[playerSettingsKey]);
  core.setOutput("playerSettings", yamlObject[playerSettingsKey]);

  switch (platform) {
    case "Android":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["7"]);
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Android"]));
      core.setOutput(architectureKey, getAndroidTargetArchitectures(yamlObject[playerSettingsKey]["AndroidTargetArchitectures"]));
      core.setOutput(versionKey, yamlObject[playerSettingsKey][bundleVersionKey] + " #" + yamlObject[playerSettingsKey]["AndroidBundleVersionCode"]);
      break;
    case "StandaloneWindows64":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["1"]);
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Standalone"]));
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, yamlObject[playerSettingsKey][bundleVersionKey] + " #" + yamlObject[playerSettingsKey][buildNumberKey]["Standalone"]);
      break;
    case "StandaloneLinux64":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["1"]);
      core.setOutput(scriptingBackendKey, getScriptingBackendName(yamlObject[playerSettingsKey][scriptingBackendKey]["Standalone"]));
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, yamlObject[playerSettingsKey][bundleVersionKey] + " #" + yamlObject[playerSettingsKey][buildNumberKey]["Standalone"]);
      break;
    case "iOS":
      core.setOutput(scriptingDefineSymbolsKey, yamlObject[playerSettingsKey][scriptingDefineSymbolsKey]["4"]);
      core.setOutput(scriptingBackendKey, "IL2CPP");
      core.setOutput(architectureKey, "64Bit");
      core.setOutput(versionKey, yamlObject[playerSettingsKey][bundleVersionKey] + " #" + yamlObject[playerSettingsKey][buildNumberKey]["iPhone"]);
      break;
    default:
      core.setOutput(scriptingDefineSymbolsKey, undefined);
      core.setOutput(scriptingBackendKey, undefined);
      core.setOutput(architectureKey, undefined);
      core.setOutput(versionKey, undefined)
      break;
  }
}

export function getScriptingBackendName(id: number): string {
  if (id == 0)
    return "Mono";
  else if (id == 1)
    return "IL2CPP";
  else
    return undefined;
}

export function getAndroidTargetArchitectures(id: number): string {
  if (id == 1)
    return "ARMv7";
  else if (id == 2)
    return "ARM64";
  else if (id == 3)
    return "ARMv7, ARM64";
  else
    return undefined;
}

async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform') //Get input parameter from YAML file(Actions workflow file)
    const yamlFile = fs.readFileSync("ProjectSettings/ProjectSettings.asset", "utf8"); //Load the project settings file
    const yamlObject = yaml.parse(yamlFile); //Parse using YAML library
    exportProperties(yamlObject, platform);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
