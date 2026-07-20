# scripts/completions/187.ps1 — PowerShell argument completer for the 187WEB CLI.
# Dot-source this file in your profile to register the completer:
#   . C:\path\to\187webdesign\scripts\completions\187.ps1

$__187CompletionRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$RepoDir = Split-Path -Parent $__187CompletionRoot
$Helper = Join-Path $RepoDir "scripts\187-complete.mjs"

Register-ArgumentCompleter -CommandName 187 -ScriptBlock {
  param($commandName, $parameterName, $wordToComplete, $commandAst, $fakeBoundParameters)

  $line = $commandAst.Extent.Text
  $cursor = $commandAst.Extent.EndOffset

  & node $Helper --line "$line" --cursor $cursor 2>$null | ForEach-Object {
    [System.Management.Automation.CompletionResult]::new($_, $_, "ParameterValue", $_)
  }
}
