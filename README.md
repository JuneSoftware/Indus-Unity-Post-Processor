# Process and Output build info
**Input Parameters:** 
- `platform` [Target build platform](https://docs.unity3d.com/ScriptReference/BuildTarget.html)
- `projectSettingsPath` Path to ProjectSettings.asset file
- `buildPath` Path to build
- `s3BucketName` AWS S3 bucket name for generating final URL

**Output Parameters:** 
- `scriptingBackend` Scripting backend(Mono or IL2CPP)
- `scriptingDefineSymbols` Scripting define symbols
- `architecture` Architecture of the build(ARMv7, ARM64)
- `versionNo` Verion number including bundle verion code or build number
- `buildLink` Link to the build
