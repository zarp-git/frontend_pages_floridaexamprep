# Landing Page Setup Guide

## Estrutura Criada

A nova landing page foi criada com uma arquitetura modular e profissional:

```
src/
├── presentation/
│   └── components/
│       └── organisms/
│           └── landing-page/
│               ├── Header.tsx
│               ├── HeroSection.tsx
│               ├── TestimonialsCarousel.tsx
│               ├── CourseCards.tsx
│               ├── WrittenTestimonials.tsx
│               ├── FAQSection.tsx
│               └── LandingFooter.tsx
└── app/
    └── (public)/
        └── landing/
            └── page.tsx
```

## 1. Imagens Necessárias

### Logo (coloque em `/public/images/logo/`)
- `logo-main.svg` - Logo principal colorido (laranja + azul)
- `logo-white.svg` - Logo branco para footer e badge

### Hero Section (`/public/images/hero/`)
- `hero-video-thumbnail.jpg` - Thumbnail do vídeo (1152x640px recomendado)
- Ou `hero-video.mp4` - Vídeo real se preferir

### Screenshots de Depoimentos (`/public/images/testimonials/screenshots/`)
- `screenshot-1.jpg` até `screenshot-5.jpg`
- Dimensões recomendadas: 263x484px (vertical)
- Screenshots de mensagens de WhatsApp/Instagram de aprovação

### Avatares dos Estudantes (`/public/images/testimonials/avatars/`)
- `student-1.jpg` até `student-10.jpg`
- Dimensões: 64x64px (quadrado)
- Fotos de perfil dos estudantes

### Imagens dos Cursos (`/public/images/courses/`)
- `business-finance.jpg` - Curso Business & Finance
- `contract-administration.jpg` - Curso Contract Administration
- `complete-exam-prep.jpg` - Curso Complete Exam Prep
- Dimensões: 384x192px (2:1 ratio)

### Ícones Sociais (`/public/images/social/`)
- `instagram-icon.svg` - Ícone do Instagram
- `facebook-icon.svg` - Ícone do Facebook
- Dimensões: 40x40px

## 2. Fontes Necessárias

Adicione no `tailwind.config.ts`:

```typescript
fontFamily: {
  'rubik': ['Rubik', 'sans-serif'],
  'clash-display': ['Clash Display', 'sans-serif'],
  'red-hat-display': ['Red Hat Display', 'sans-serif'],
  'hanken-grotesk': ['Hanken Grotesk', 'sans-serif'],
  'poppins': ['Poppins', 'sans-serif'],
  'familjen-grotesk': ['Familjen Grotesk', 'sans-serif'],
}
```

Adicione no `app/layout.tsx` ou crie um arquivo de fontes:

```typescript
import { Rubik, Red_Hat_Display, Hanken_Grotesk, Poppins } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });
const redHat = Red_Hat_Display({ subsets: ['latin'], variable: '--font-red-hat' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins' 
});
```

Para Clash Display e Familjen Grotesk (não disponíveis no Google Fonts):
- Baixe de fontes comerciais ou use alternativas
- Ou use fontes similares do Google Fonts

## 3. Cores Customizadas

Adicione no `tailwind.config.ts`:

```typescript
colors: {
  'secondary': '#FF6B35', // Laranja
  'accent-1': '#1E3A8A', // Azul escuro
}
```

## 4. Ícones

O projeto usa `lucide-react` que já está instalado. Ícones usados:
- ChevronDown
- ArrowUpRight
- ChevronLeft
- ChevronRight
- Play
- MapPin
- Clock
- ArrowRight
- MoreHorizontal

## 5. Responsividade

Todos os componentes foram criados com responsividade:
- Mobile first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Layouts flexíveis que se adaptam

## 6. Funcionalidades Implementadas

### Header
- Navegação com dropdowns
- Sticky header
- Mobile menu button (precisa implementar o menu mobile)

### Hero
- Destaque com sublinhados amarelos
- CTA button com gradiente
- Placeholder para vídeo com play button

### Testimonials Carousel
- Carrossel funcional com navegação
- Efeito de escala no item central
- Gradientes nas bordas

### Course Cards
- 3 cards responsivos
- Lista de features com checkmarks
- CTAs individuais

### Written Testimonials
- Grid de depoimentos
- Suporte para vídeo e texto
- Ratings com estrelas
- Blue checkmark de verificação

### FAQ
- Accordion funcional
- Badge de garantia exclusiva
- Seção de coaching pessoal

### Footer
- Links organizados por categoria
- Informações de contato
- Social media links
- Copyright com Zarp branding

## 7. Próximos Passos

1. **Adicionar as imagens** nos diretórios especificados
2. **Configurar as fontes** no tailwind e layout
3. **Testar a página** em `/landing`
4. **Ajustar cores** se necessário
5. **Implementar menu mobile** no Header
6. **Adicionar animações** (opcional)
7. **Integrar com backend** para CTAs
8. **Adicionar analytics** (Google Analytics, etc.)

## 8. Customização Fácil

### Alterar textos
Todos os textos estão hardcoded nos componentes para fácil localização.

### Alterar cores
Use as classes do Tailwind ou customize no config.

### Adicionar/Remover seções
Edite o arquivo `app/(public)/landing/page.tsx`

### Modificar cursos
Edite o array `COURSES` em `CourseCards.tsx`

### Modificar FAQs
Edite o array `FAQ_ITEMS` em `FAQSection.tsx`

### Modificar links do footer
Edite os arrays no início de `LandingFooter.tsx`

## 9. Performance

- Todas as imagens usam Next.js Image component
- Lazy loading automático
- Otimização de fontes
- CSS-in-JS evitado (usa Tailwind)

## 10. SEO

- Metadata configurada na página
- Semantic HTML
- Alt texts nas imagens
- Structured data (pode adicionar JSON-LD)

## 11. Acessibilidade

- Botões com aria-labels
- Contraste adequado
- Navegação por teclado
- Focus states

## Comandos Úteis

```bash
# Rodar em desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Verificar tipos
pnpm tsc --noEmit
```

## Estrutura de Dados Recomendada

Para facilitar manutenção futura, considere criar:

```typescript
// src/data/courses.ts
export const courses = [...]

// src/data/testimonials.ts
export const testimonials = [...]

// src/data/faq.ts
export const faqItems = [...]
```

Isso permite centralizar os dados e facilitar atualizações.
