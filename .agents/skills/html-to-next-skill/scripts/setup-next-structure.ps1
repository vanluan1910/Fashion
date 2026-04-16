# Setup Next.js Folder Structure for The Curated Atelier
Param(
    [string]$RootPath = "."
)

$folders = @(
    "src/app",
    "src/app/(dashboard)",
    "src/app/(auth)",
    "src/features",
    "src/shared/components",
    "src/shared/lib",
    "src/shared/hooks",
    "src/shared/assets",
    "src/core/providers"
)

foreach ($folder in $folders) {
    $path = Join-Path $RootPath $folder
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "✅ Created: $folder" -ForegroundColor Green
    }
}

Write-Host "`n🚀 Infrastructure ready for Next.js Luxury Conversion!" -ForegroundColor Cyan
