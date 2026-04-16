param (
    [Parameter(Mandatory=$true)]
    [string]$FeatureName
)

$BaseDir = "src/features/$FeatureName"
$SubDirs = @("api", "components", "hooks", "services", "types")

# Create structure
if (!(Test-Path $BaseDir)) {
    New-Item -ItemType Directory -Path $BaseDir -Force
    foreach ($dir in $SubDirs) {
        New-Item -ItemType Directory -Path "$BaseDir/$dir" -Force
    }
    Write-Host "✅ Feature '$FeatureName' structure created successfully at $BaseDir" -ForegroundColor Green
} else {
    Write-Host "⚠️ Feature '$FeatureName' already exists." -ForegroundColor Yellow
}
