---
to: .vscode/launch.json
---
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Node: Run dev server",
      "cwd": "${fileDirname}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "outputCapture": "std"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Current Opened File",
      "program": "${file}"
    }
  ]
}
