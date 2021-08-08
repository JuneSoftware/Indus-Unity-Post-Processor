import * as core from '@actions/core'
import fs from "fs";
import yaml from "yaml";

async function run(): Promise<void> {
  try {
    //const ms: string = core.getInput('milliseconds')

    const yamlFile = fs.readFileSync("ProjectSettings/ProjectSettings.asset", "utf8");
    core.info(yamlFile);

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
