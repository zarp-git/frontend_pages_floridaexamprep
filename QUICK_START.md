# Quick Start - Landing Page

## Status Atual

- lucide-react instalado
- Página inicial substituída pela nova landing page
- Diretórios de imagens criados
- Build funcionando

## Próximos Passos

### 1. Adicionar Imagens

Os diretórios já foram criados. Adicione suas imagens:

```
public/images/
├── logo/
│   ├── logo-main.svg (ou .png)
│   └── logo-white.svg (ou .png)
├── hero/
│   └── hero-video-thumbnail.jpg
├── testimonials/
│   ├── screenshots/
│   │   ├── screenshot-1.jpg
│   │   ├── screenshot-2.jpg
│   │   ├── screenshot-3.jpg
│   │   ├── screenshot-4.jpg
│   │   └── screenshot-5.jpg
│   └── avatars/
│       ├── student-1.jpg
│       ├── student-2.jpg
│       ├── student-3.jpg
│       ├── student-4.jpg
│       ├── student-5.jpg
│       ├── student-6.jpg
│       ├── student-7.jpg
│       ├── student-8.jpg
│       ├── student-9.jpg
│       └── student-10.jpg
├── courses/
│   ├── business-finance.jpg
│   ├── contract-administration.jpg
│   └── complete-exam-prep.jpg
└── social/
    ├── instagram-icon.svg
    └── facebook-icon.svg
```

### 2. Testar

```powershell
pnpm dev
```

Acesse: http://localhost:3000

### 3. Usar Placeholders Temporários

Se não tiver as imagens ainda, use placeholders:

```typescript
// Exemplo de placeholder
<Image
  src="https://placehold.co/1152x640/1E3A8A/FFFFFF?text=Hero+Video"
  alt="Hero"
  width={1152}
  height={640}
/>
```

## Estrutura da Nova Home

A página inicial agora tem:

1. Header - Navegação com dropdowns
2. Hero - Seção principal com CTAs
3. Testimonials Carousel - Screenshots de aprovações
4. Course Cards - 3 cursos disponíveis
5. Written Testimonials - Depoimentos escritos
6. FAQ - Perguntas frequentes
7. Footer - Links e informações

## Customização Rápida

### Alterar Textos

Edite diretamente nos componentes em:
`src/presentation/components/organisms/landing-page/`

### Alterar Cursos

Edite o array `COURSES` em:
`src/presentation/components/organisms/landing-page/CourseCards.tsx`

### Alterar FAQs

Edite o array `FAQ_ITEMS` em:
`src/presentation/components/organisms/landing-page/FAQSection.tsx`

### Alterar Links do Footer

Edite os arrays no início de:
`src/presentation/components/organisms/landing-page/LandingFooter.tsx`

## Backup da Página Antiga

A página antiga foi salva em:
`OLD_HOME_PAGE_BACKUP.tsx`

Para restaurar, copie o conteúdo de volta para:
`src/app/(public)/page.tsx`

## Troubleshooting

### Imagens não aparecem
1. Verifique se o arquivo existe no caminho correto
2. Verifique o nome do arquivo (case-sensitive)
3. Limpe o cache: `pnpm dev --turbo`

### Erro de build
1. Remova a pasta `.next`: `Remove-Item -Recurse -Force .next`
2. Rode novamente: `pnpm dev`

### Fontes não carregam
Configure no `tailwind.config.ts` (veja LANDING_PAGE_SETUP.md)

## Comandos Úteis

```powershell
# Desenvolvimento
pnpm dev

# Build
pnpm build

# Limpar cache
Remove-Item -Recurse -Force .next

# Verificar tipos
pnpm tsc --noEmit
```

## Documentação Completa

- `LANDING_PAGE_SETUP.md` - Setup detalhado
- `IMAGE_CHECKLIST.md` - Lista de imagens
- `LANDING_PAGE_SUMMARY.md` - Resumo executivo
- `landing-page/README.md` - Docs dos componentes

## Status

- [x] lucide-react instalado
- [x] Componentes criados
- [x] Página inicial substituída
- [x] Diretórios criados
- [x] Build funcionando
- [ ] Imagens adicionadas
- [ ] Fontes configuradas
- [ ] Testado no navegador

## Próximo Passo

Adicione as imagens e teste no navegador!
