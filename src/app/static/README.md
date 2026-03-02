# Static Checkout - Arquitetura

## Visão Geral
Diretório protegido usado como base de exportação para HTML customizado no builder (quimera).

## Fluxo Completo

### 1. Usuário na Página do Curso
```
Usuário clica "Buy Now" → /checkout?tier=primary-books&course=florida-exam
```

### 2. Nossa Página de Checkout
```typescript
// Captura parâmetros
const tier = searchParams.get("tier");
const course = searchParams.get("course");

// Identifica produto
const ghlUrl = GHL_CHECKOUT_URLS[tier];

// Redireciona para GHL
window.location.href = ghlUrl;
```

### 3. Redirect para GHL
```
/checkout → Identifica tier → https://pay.floridaexamprep.com/buy/primary-books
```

### 4. Após Pagamento
```
GHL → /thank-you (página de agradecimento)
```

## Estrutura de Arquivos

```
src/
├── app/
│   ├── (public)/
│   │   ├── checkout/
│   │   │   └── page.tsx          # Página principal de checkout
│   │   └── thank-you/
│   │       └── page.tsx          # Página pós-pagamento
│   └── static/
│       ├── page.tsx              # Rota protegida (dev only)
│       ├── .gitkeep              # Regras do diretório
│       └── README.md             # Este arquivo
├── presentation/
│   └── components/
│       └── static/
│           └── StaticCheckout.tsx # Componente base para exportação
└── constants/
    └── pricing.ts                # SSOT para URLs e preços
```

## Constantes (SSOT)

### TIER_CTA_URL
URLs internas para nosso checkout:
```typescript
{
  "primary-course": "/checkout?tier=primary-course",
  "primary-books": "/checkout?tier=primary-books",
  // ...
}
```

### GHL_CHECKOUT_URLS
Mapeamento para URLs do GHL:
```typescript
{
  "primary-course": "https://pay.floridaexamprep.com/buy/primary-course",
  "primary-books": "https://pay.floridaexamprep.com/buy/primary-books",
  // ...
}
```

## Proteção de Ambiente

```typescript
// src/app/static/page.tsx
if (process.env.NODE_ENV !== "development") {
  redirect("/");
}
```

## Workflow de Desenvolvimento

1. **Desenvolver**: Criar/modificar checkout em `/static`
2. **Testar**: Acessar `http://localhost:3000/static?tier=primary-books`
3. **Exportar**: Usar extensão para gerar HTML
4. **Injetar**: Colar HTML no custom HTML do builder
5. **Deploy**: Builder usa HTML customizado

## Parâmetros Suportados

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `tier` | PricingTierSlug | Identificador do produto | `primary-books` |
| `course` | string | Identificador do curso | `florida-exam` |

## Exemplos de URLs

### Desenvolvimento
```
http://localhost:3000/static?tier=primary-books&course=florida-exam
```

### Produção (Checkout Real)
```
https://floridaexamprep.com/checkout?tier=primary-books
```

### GHL (Destino Final)
```
https://pay.floridaexamprep.com/buy/primary-books
```

## Segurança

- Rota `/static` bloqueada em produção
- Validação de tier antes do redirect
- Fallback para home em caso de erro
- Logs de erro para debugging

## Manutenção

### Adicionar Novo Tier
1. Adicionar em `PricingTierSlug` (pricing.ts)
2. Adicionar URL em `TIER_CTA_URL`
3. Adicionar URL em `GHL_CHECKOUT_URLS`
4. Testar fluxo completo

### Modificar Layout
1. Editar `StaticCheckout.tsx`
2. Testar em `/static`
3. Exportar novo HTML
4. Atualizar no builder
