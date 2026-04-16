# Generate a New Next.js Feature Module
Param(
    [Parameter(Mandatory=$true)]
    [string]$FeatureName
)

$basePath = "src/features/$FeatureName"
$subdirs = @("components", "services", "hooks", "types", "constants")

if (Test-Path $basePath) {
    Write-Warning "Feature '$FeatureName' already exists."
    return
}

New-Item -ItemType Directory -Path $basePath -Force | Out-Null

foreach ($dir in $subdirs) {
    New-Item -ItemType Directory -Path (Join-Path $basePath $dir) -Force | Out-Null
}

# Create a sample service
$serviceContent = @"
export async function get${FeatureName}Data() {
  // Fetch data from DB or API
  // return await db.query(...)
  return [];
}
"@
Set-Content -Path (Join-Path $basePath "services/${FeatureName}Service.ts") -Value $serviceContent

Write-Host "✨ Feature '$FeatureName' scaffolded successfully!" -ForegroundColor Magenta
