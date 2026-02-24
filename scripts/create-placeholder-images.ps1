# Script para criar estrutura de diretórios e placeholders
# Execute: .\scripts\create-placeholder-images.ps1

Write-Host "Criando estrutura de diretórios..." -ForegroundColor Green

# Criar diretórios
$directories = @(
    "public/images/logo",
    "public/images/hero",
    "public/images/testimonials/screenshots",
    "public/images/testimonials/avatars",
    "public/images/courses",
    "public/images/social"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "  Criado: $dir" -ForegroundColor Cyan
}

Write-Host "`nEstrutura criada com sucesso!" -ForegroundColor Green
Write-Host "`nPróximos passos:" -ForegroundColor Yellow
Write-Host "1. Adicione suas imagens nos diretórios criados"
Write-Host "2. Consulte IMAGE_CHECKLIST.md para ver os nomes exatos"
Write-Host "3. Execute 'pnpm dev' e acesse /landing"
Write-Host "`nDica: Use placeholders temporários de https://placehold.co/" -ForegroundColor Magenta
