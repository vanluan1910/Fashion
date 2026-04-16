# setup-project.ps1 - Initialize The Curated Atelier structure
$Dirs = @(
    "src/app/store",
    "src/app/router",
    "src/app/providers",
    "src/features",
    "src/shared/components",
    "src/shared/hooks",
    "src/shared/utils",
    "src/shared/types",
    "src/shared/assets/images",
    "src/shared/assets/styles"
)

foreach ($dir in $Dirs) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "✅ Created: $dir" -ForegroundColor Green
    }
}

Write-Host "🚀 Project core folders are ready." -ForegroundColor Cyan
