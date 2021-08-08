# Read Unity Project Settings File
**Input Parameters:** 
- `platform` [Target build platform](https://docs.unity3d.com/ScriptReference/BuildTarget.html)
- `path` Path to ProjectSettings.asset file

**Output Parameters:** 
- `scriptingBackend` Scripting backend(Mono or IL2CPP)
- `scriptingDefineSymbols` Scripting define symbols
- `architecture` Architecture of the build(ARMv7, ARM64)
- `versionNo` Verion number including bundle verion code or build number
