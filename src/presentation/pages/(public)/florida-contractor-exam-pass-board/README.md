# Florida Contractor Exam Pass Board

Página que exibe o quadro de honra dos alunos que passaram nos exames de certificação de contratores da Flórida.

## Estrutura

```
florida-contractor-exam-pass-board/
├── pass-board.view.tsx          # View principal com lógica de estado
└── README.md                    # Documentação

components/
├── molecules/florida-contractor-exam-pass-board/
│   ├── PassBoardFilters.tsx     # Filtros de busca e categoria
│   ├── PassBoardTableRow.tsx    # Linha individual da tabela
│   └── PassBoardPagination.tsx  # Controles de paginação
└── organisms/florida-contractor-exam-pass-board/
    ├── PassBoardTable.tsx       # Tabela completa de alunos
    └── PassBoardCTA.tsx         # Call-to-action final

constants/
└── pass-board.ts                # Dados dos alunos e configurações
```

## Funcionalidades

- Busca por nome de aluno ou curso
- Filtro por categoria de exame
- Ordenação automática por nota (maior para menor)
- Paginação com 10 itens por página
- Ranking visual (medalhas para top 3)
- Avatares dos alunos (quando disponíveis)
- CTA persuasivo ao final da página
- Responsivo (mobile-first)
- Dark mode support

## Dados

Os dados dos alunos estão centralizados em `src/constants/pass-board.ts`:

- 65 alunos aprovados
- 3 categorias de exames
- Notas de 70% a 100%
- Avatares em `/public/images/pass-board_avatars/`

## Uso

```tsx
import { PassBoardView } from "@/presentation/pages/(public)/florida-contractor-exam-pass-board/pass-board.view";

export default function PassBoardPage() {
  return <PassBoardView />;
}
```

## Rotas

- `/florida-contractor-exam-pass-board` - Página principal do Pass Board
- Adicionado ao header e footer navigation
