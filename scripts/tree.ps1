# PowerShell script to print the content of folders recursively like a tree

param (
    [string]$path = "."
)

function Get-Tree {
    param (
        [string]$currentPath,
        [string]$indent = ""
    )

    $items = Get-ChildItem -Path $currentPath
    foreach ($item in $items) {
        Write-Output "$indent|- $($item.Name)"
        if ($item.PSIsContainer) {
            Get-Tree -currentPath $item.FullName -indent "$indent|  "
        }
    }
}

Get-Tree -currentPath $path
