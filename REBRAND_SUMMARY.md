# Rebrand Summary: AllBrick Pavers → Florida Exam Prep

## Alterações Concluídas

### 1. Configuração do Projeto
- ✅ `package.json`: Nome alterado para `frontend_pages_floridaexamprep`
- ✅ `package-lock.json`: Referências atualizadas
- ✅ `.windsurf/rules/specify-rules.md`: Título atualizado

### 2. Arquivos de Configuração
- ✅ `src/constants/index.ts`:
  - SITE_CONFIG.name: "Florida Exam Prep"
  - SITE_CONFIG.description: Atualizado
  - SITE_CONFIG.url: "https://floridaexamprep.com"
  - CONTACT.email: "contact@floridaexamprep.com"
  - SOCIAL_LINKS: URLs atualizadas
  - CONSENT_STORAGE_KEY: "fep_consent_choice_v1"

- ✅ `src/constants/footer.ts`:
  - FOOTER_COMPANY_INFO.name: "Florida Exam Prep"
  - FOOTER_COMPANY_INFO.tagline: Atualizado para exam prep
  - FOOTER_SERVICES: Atualizado para serviços de preparação de exames

- ✅ `src/server/config/default-seo.tsx`: Todos os metadados SEO atualizados
- ✅ `src/server/config/legal-pages.ts`: Configurações legais atualizadas

### 3. Componentes SEO
- ✅ `src/presentation/components/templates/seo/json-ld.tsx`:
  - OrganizationJsonLd: Atualizado
  - ProductJsonLd: Atualizado para serviços educacionais
  - ReviewJsonLd: Atualizado

- ✅ `src/presentation/components/templates/seo/article-json-ld.tsx`:
  - ArticleJsonLd: Atualizado
  - LocalBusinessJsonLd: Mudado para EducationalOrganization
  - WebSiteJsonLd: Atualizado

- ✅ `src/hooks/use-legal-metadata.ts`: siteName atualizado
- ✅ `src/presentation/components/templates/LegalTemplate.tsx`: Descrição atualizada

### 4. URLs e Domínios
- ✅ Todas as referências a "allbrickpavers.com" → "floridaexamprep.com"
- ✅ `src/app/robots.ts`: Sitemap URL atualizado
- ✅ Links de redes sociais atualizados

### 5. Páginas Legais
- ✅ `src/app/(public)/(legal)/privacy-policy/page.tsx`: URL atualizada
- ✅ `src/app/(public)/(legal)/terms-of-use/page.tsx`: Nome e URL atualizados

### 6. Testes
- ✅ `src/server/services/lead/__tests__/lead-api.service.test.ts`:
  - NEXT_PUBLIC_TENANT_KEY: "fep_secret_2026_fl_exam_prep_secure"

### 7. Arquivos de Ambiente
- ✅ `.env.example`: Criado com variáveis atualizadas

## Status do Build
✅ Projeto compila com sucesso (`pnpm run build`)

## Referências Restantes (Conteúdo de UI)

As seguintes referências a "AllBrick Pavers" ainda existem em componentes de UI e conteúdo.
Estas são referências em textos, títulos, breadcrumbs e alt texts que precisam ser atualizadas
manualmente conforme o novo contexto do negócio:

### Componentes que precisam de atualização de conteúdo:
1. `src/presentation/components/organisms/home-page-sections/Hero.tsx`
2. `src/presentation/components/organisms/home-page-sections/DifferentialsSection.tsx`
3. `src/presentation/components/organisms/home-page-sections/FeedbackSection.tsx`
4. `src/presentation/components/organisms/home-page-sections/FaqSection.tsx`
5. `src/presentation/components/organisms/home-page-sections/blog-grid.tsx`
6. `src/presentation/components/organisms/home-page-sections/AboutSection.tsx`
7. `src/presentation/components/organisms/common/footer/Footer.tsx`
8. `src/presentation/components/organisms/common/lead-collect-modal/LeadCollectModal.tsx`
9. `src/presentation/components/organisms/common/contact-modal/ContactModal.tsx`
10. `src/presentation/pages/(public)/gallery/gallery.view.tsx`
11. `src/presentation/pages/(public)/services/service-detail.view.tsx`
12. `src/presentation/pages/(public)/locations/location-detail.view.tsx`
13. `src/app/(public)/services/[slug]/page.tsx`
14. `src/app/(public)/locations/[slug]/page.tsx`
15. `src/app/maintenance/page.tsx`
16. `src/constants/services.ts` (conteúdo extenso sobre pavers)

### Observações Importantes:

1. **Conteúdo sobre Pavers**: Muitos arquivos contêm conteúdo específico sobre pavimentação (pavers, driveways, patios, pool decks, etc.). Este conteúdo precisa ser substituído por conteúdo relevante para preparação de exames.

2. **Imagens**: As referências a imagens ainda apontam para fotos de pavimentação. Será necessário:
   - Substituir as imagens em `/public/images/`
   - Atualizar os caminhos nos componentes

3. **Serviços**: O arquivo `src/constants/services.ts` contém toda a estrutura de serviços de pavimentação e precisa ser reescrito para serviços de preparação de exames.

4. **Localizações**: Os arquivos de localização ainda fazem referência a serviços de pavimentação.

5. **Depoimentos**: Os depoimentos em `FeedbackSection.tsx` são sobre trabalhos de pavimentação e precisam ser substituídos.

## Próximos Passos Recomendados

1. Definir a nova estrutura de serviços para Florida Exam Prep
2. Criar novo conteúdo para todas as páginas
3. Substituir imagens por conteúdo relevante de educação/preparação de exames
4. Atualizar FAQs para perguntas sobre preparação de exames
5. Reescrever depoimentos de clientes
6. Atualizar a seção "About" com informações sobre Florida Exam Prep
7. Revisar e atualizar todos os textos de marketing

## Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build de produção
pnpm run build

# Verificar referências restantes
grep -r "AllBrick" src/
grep -r "allbrick" src/
grep -r "pavers" src/
```

## Variáveis de Ambiente Necessárias

Criar arquivo `.env` baseado em `.env.example`:
- NEXT_PUBLIC_SITE_URL=https://floridaexamprep.com
- ZARP_API_ENDPOINT_URL=https://api.zarpstudio.com
- NEXT_PUBLIC_TENANT_KEY=fep_secret_2026_fl_exam_prep_secure
