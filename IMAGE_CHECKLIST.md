# Checklist de Imagens - Landing Page

## Status: Pendente

Marque com [x] conforme for adicionando as imagens.

## 1. Logo

**Diretório:** `/public/images/logo/`

- [ ] `logo-main.svg` ou `logo-main.png`
  - Dimensões: Flexível (recomendado 120x48px)
  - Formato: SVG preferível
  - Cores: Laranja (#FF6B35) + Azul (#1E3A8A)
  
- [ ] `logo-white.svg` ou `logo-white.png`
  - Dimensões: Mesmas do logo principal
  - Formato: SVG preferível
  - Cor: Branco (#FFFFFF)

## 2. Hero Section

**Diretório:** `/public/images/hero/`

- [ ] `hero-video-thumbnail.jpg`
  - Dimensões: 1152x640px (16:9)
  - Formato: JPG ou WebP
  - Conteúdo: Preview do curso ou estudante estudando
  - Qualidade: Alta (80-90%)

## 3. Screenshots de Depoimentos

**Diretório:** `/public/images/testimonials/screenshots/`

- [ ] `screenshot-1.jpg`
- [ ] `screenshot-2.jpg`
- [ ] `screenshot-3.jpg`
- [ ] `screenshot-4.jpg`
- [ ] `screenshot-5.jpg`

**Especificações:**
- Dimensões: 263x484px (vertical, formato mobile)
- Formato: JPG ou PNG
- Conteúdo: Screenshots de mensagens de aprovação (WhatsApp, Instagram, etc.)
- Qualidade: Média-Alta (70-80%)
- Dica: Pode usar screenshots reais ou mockups

## 4. Avatares dos Estudantes

**Diretório:** `/public/images/testimonials/avatars/`

- [ ] `student-1.jpg`
- [ ] `student-2.jpg`
- [ ] `student-3.jpg`
- [ ] `student-4.jpg`
- [ ] `student-5.jpg`
- [ ] `student-6.jpg`
- [ ] `student-7.jpg`
- [ ] `student-8.jpg`
- [ ] `student-9.jpg`
- [ ] `student-10.jpg`

**Especificações:**
- Dimensões: 64x64px (quadrado)
- Formato: JPG ou PNG
- Conteúdo: Fotos de perfil dos estudantes
- Qualidade: Média (60-70%)
- Dica: Pode usar fotos de stock ou avatares gerados

## 5. Imagens dos Cursos

**Diretório:** `/public/images/courses/`

- [ ] `business-finance.jpg`
  - Tema: Business & Finance
  - Sugestão: Gráficos, calculadora, documentos financeiros
  
- [ ] `contract-administration.jpg`
  - Tema: Contract Administration
  - Sugestão: Contratos, assinaturas, documentos legais
  
- [ ] `complete-exam-prep.jpg`
  - Tema: Complete Exam Prep
  - Sugestão: Livros, estudante, certificado

**Especificações:**
- Dimensões: 384x192px (2:1 ratio)
- Formato: JPG ou WebP
- Qualidade: Alta (80-90%)
- Estilo: Profissional, clean

## 6. Ícones Sociais

**Diretório:** `/public/images/social/`

- [ ] `instagram-icon.svg`
  - Dimensões: 40x40px
  - Formato: SVG preferível
  - Estilo: Ícone oficial do Instagram
  
- [ ] `facebook-icon.svg`
  - Dimensões: 40x40px
  - Formato: SVG preferível
  - Estilo: Ícone oficial do Facebook

**Dica:** Pode baixar ícones oficiais de:
- https://about.instagram.com/brand/gradient
- https://about.meta.com/brand/resources/facebookapp/logo/

## Alternativas Rápidas

Se não tiver as imagens prontas, pode usar temporariamente:

### Placeholders Online
- https://placehold.co/ - Gera placeholders customizados
- https://picsum.photos/ - Fotos aleatórias
- https://ui-avatars.com/ - Avatares gerados

### Bancos de Imagens Gratuitos
- https://unsplash.com/ - Fotos profissionais
- https://pexels.com/ - Fotos e vídeos
- https://pixabay.com/ - Imagens livres

### Geradores de Mockups
- https://mockuphone.com/ - Screenshots de celular
- https://smartmockups.com/ - Mockups profissionais

### Ícones
- https://lucide.dev/ - Ícones SVG (já usado no projeto)
- https://heroicons.com/ - Ícones SVG
- https://fontawesome.com/ - Ícones diversos

## Comandos para Criar Diretórios

Execute no terminal (PowerShell):

```powershell
# Criar todos os diretórios de uma vez
New-Item -ItemType Directory -Force -Path "public/images/logo"
New-Item -ItemType Directory -Force -Path "public/images/hero"
New-Item -ItemType Directory -Force -Path "public/images/testimonials/screenshots"
New-Item -ItemType Directory -Force -Path "public/images/testimonials/avatars"
New-Item -ItemType Directory -Force -Path "public/images/courses"
New-Item -ItemType Directory -Force -Path "public/images/social"
```

## Otimização de Imagens

Antes de adicionar as imagens, otimize-as:

### Ferramentas Online
- https://tinypng.com/ - Compressão PNG/JPG
- https://squoosh.app/ - Compressão avançada
- https://svgomg.net/ - Otimização SVG

### Ferramentas CLI
```powershell
# Instalar sharp-cli para otimização
pnpm add -D sharp-cli

# Otimizar imagens
pnpm sharp -i input.jpg -o output.jpg -q 80
```

## Verificação Final

Após adicionar todas as imagens, verifique:

- [ ] Todas as imagens estão nos diretórios corretos
- [ ] Nomes dos arquivos estão exatamente como especificado
- [ ] Imagens estão otimizadas (tamanho < 500KB cada)
- [ ] Formatos corretos (SVG para logos/ícones, JPG/WebP para fotos)
- [ ] Página carrega sem erros 404
- [ ] Imagens aparecem corretamente no navegador

## Próximo Passo

Depois de adicionar as imagens, teste a página:

```powershell
pnpm dev
```

Acesse: http://localhost:3000/landing
