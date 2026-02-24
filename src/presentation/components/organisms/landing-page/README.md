# Landing Page Components

Componentes modulares e reutilizáveis para a landing page do Florida Exam Prep.

## Estrutura

```
landing-page/
├── Header.tsx                    - Cabeçalho com navegação e dropdowns
├── HeroSection.tsx              - Seção hero com CTA principal
├── TestimonialsCarousel.tsx     - Carrossel de screenshots de depoimentos
├── CourseCards.tsx              - Cards dos cursos disponíveis
├── WrittenTestimonials.tsx      - Grid de depoimentos escritos
├── FAQSection.tsx               - Perguntas frequentes com accordion
└── LandingFooter.tsx            - Footer completo com links
```

## Componentes

### Header
**Responsabilidades:**
- Navegação principal
- Dropdowns para Programs e Books
- CTA button
- Mobile menu (a implementar)

**Props:** Nenhuma (stateless)

**Estado:**
- `openDropdown`: controla qual dropdown está aberto

### HeroSection
**Responsabilidades:**
- Headline principal com destaques
- Descrição do serviço
- CTA primário
- Vídeo/imagem de destaque

**Props:** Nenhuma

**Customização:**
- Edite os textos diretamente no componente
- Substitua a imagem em `/public/images/hero/`

### TestimonialsCarousel
**Responsabilidades:**
- Exibir screenshots de aprovações
- Navegação entre screenshots
- Efeito de escala no item central

**Props:** Nenhuma

**Estado:**
- `currentIndex`: índice do screenshot atual

**Customização:**
- Adicione/remova screenshots no array `TESTIMONIAL_SCREENSHOTS`

### CourseCards
**Responsabilidades:**
- Exibir cursos disponíveis
- Features de cada curso
- CTAs individuais

**Props:** Nenhuma

**Customização:**
- Edite o array `COURSES` para adicionar/modificar cursos
- Cada curso tem: id, badge, title, subtitle, image, features

### WrittenTestimonials
**Responsabilidades:**
- Grid de depoimentos
- Suporte para vídeo e texto
- Ratings e verificação

**Props:** Nenhuma

**Customização:**
- Edite o array `TESTIMONIALS` (array de arrays para linhas)
- Cada depoimento tem: type, studentName, examType, avatar, image, rating, text

### FAQSection
**Responsabilidades:**
- Lista de perguntas frequentes
- Accordion funcional
- Badge de garantia exclusiva

**Props:** Nenhuma

**Estado:**
- `openIndex`: índice da pergunta aberta

**Customização:**
- Edite o array `FAQ_ITEMS`
- Cada item tem: question, answer

### LandingFooter
**Responsabilidades:**
- Links organizados por categoria
- Informações de contato
- Social media
- Copyright

**Props:** Nenhuma

**Customização:**
- Edite os arrays no início do componente:
  - `COMPANY_LINKS`
  - `COURSE_LINKS`
  - `BOOK_LINKS`
  - `SOCIAL_LINKS`

## Padrões de Código

### Nomenclatura
- Componentes: PascalCase
- Funções: camelCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos: PascalCase.tsx

### Estrutura de Componente
```typescript
"use client"; // Se usar hooks

import { useState } from "react";
import Image from "next/image";

// Tipos/Interfaces
interface Props {
  // ...
}

// Constantes
const ITEMS = [];

// Sub-componentes (se necessário)
function SubComponent() {
  return <div>...</div>;
}

// Componente principal
export default function MainComponent() {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Render
  return <div>...</div>;
}
```

### Tailwind Classes
- Use classes utilitárias
- Agrupe por categoria (layout, spacing, colors, typography)
- Use responsive prefixes (sm:, md:, lg:)
- Evite classes customizadas

### Imagens
- Sempre use Next.js Image component
- Sempre adicione alt text
- Use priority para imagens above the fold
- Otimize antes de adicionar

## Responsividade

Todos os componentes seguem mobile-first:

```typescript
// Mobile (default)
className="flex flex-col"

// Tablet
className="md:flex-row"

// Desktop
className="lg:gap-16"
```

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Performance

### Otimizações Implementadas
- Lazy loading de imagens (automático com Next.js Image)
- CSS-in-JS evitado (usa Tailwind)
- Componentes client-side apenas quando necessário
- Sem dependências pesadas

### Métricas Alvo
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## Acessibilidade

### Checklist
- [x] Semantic HTML
- [x] Alt texts em imagens
- [x] Aria labels em botões
- [x] Contraste adequado (WCAG AA)
- [x] Navegação por teclado
- [x] Focus states visíveis

### Testes
```bash
# Lighthouse
pnpm dlx lighthouse http://localhost:3000/landing

# axe DevTools
# Instale a extensão do navegador
```

## Testes

### Manual
1. Teste em diferentes tamanhos de tela
2. Teste navegação por teclado
3. Teste com leitor de tela
4. Teste performance com Lighthouse

### Automatizado (futuro)
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Troubleshooting

### Imagens não aparecem
1. Verifique se o arquivo existe no caminho correto
2. Verifique o nome do arquivo (case-sensitive)
3. Limpe o cache: `pnpm dev --turbo`

### Fontes não carregam
1. Verifique se estão configuradas no tailwind.config.ts
2. Verifique se estão importadas no layout
3. Limpe o cache do navegador

### Estilos não aplicam
1. Verifique se o Tailwind está configurado
2. Verifique se não há typos nas classes
3. Use DevTools para inspecionar

### Performance ruim
1. Otimize imagens (< 500KB cada)
2. Use WebP quando possível
3. Lazy load componentes pesados
4. Minimize JavaScript

## Manutenção

### Adicionar novo curso
1. Abra `CourseCards.tsx`
2. Adicione objeto no array `COURSES`
3. Adicione imagem em `/public/images/courses/`

### Adicionar novo depoimento
1. Abra `WrittenTestimonials.tsx`
2. Adicione objeto no array `TESTIMONIALS`
3. Adicione imagens necessárias

### Adicionar nova FAQ
1. Abra `FAQSection.tsx`
2. Adicione objeto no array `FAQ_ITEMS`

### Atualizar links do footer
1. Abra `LandingFooter.tsx`
2. Edite os arrays de links

## Roadmap

### Próximas Features
- [ ] Menu mobile funcional
- [ ] Animações com Framer Motion
- [ ] Integração com backend (CTAs)
- [ ] Analytics (Google Analytics)
- [ ] A/B testing
- [ ] Chatbot
- [ ] Modo escuro

### Melhorias
- [ ] Lazy load de componentes
- [ ] Skeleton loaders
- [ ] Error boundaries
- [ ] Loading states
- [ ] Toast notifications
- [ ] Form validation

## Recursos

### Documentação
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

### Ferramentas
- [Figma](https://figma.com) - Design
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance
- [axe DevTools](https://www.deque.com/axe/devtools/) - Acessibilidade

### Inspiração
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Land-book](https://land-book.com/)
