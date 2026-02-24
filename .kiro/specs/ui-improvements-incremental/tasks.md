# Implementation Plan: UI Improvements Incremental

## Overview

Este plano implementa quatro melhorias incrementais na interface do usuário, cada uma projetada para ser implementada em um commit separado. As melhorias incluem componentes React com TypeScript, efeitos visuais avançados, e migração completa para Tailwind CSS v4.

Ordem de implementação: PrimaryButton → PandaVideoPlayer → GradientText → GlobalStyles

## Tasks

- [x] 1. Implementar PrimaryButton com Efeitos Visuais
  - [x] 1.1 Criar estrutura base do componente PrimaryButton
    - Criar arquivo src/presentation/components/atoms/PrimaryButton.tsx
    - Adicionar diretiva "use client"
    - Definir interface PrimaryButtonProps com todas as props (variant, size, icon, iconPosition, children)
    - Implementar componente base com forwardRef para suporte a refs
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 1.2 Implementar sistema de variantes e tamanhos
    - Criar mapeamento de estilos para variantes (default, outline, outline-solid, white)
    - Criar mapeamento de estilos para tamanhos (default, sm, lg)
    - Implementar lógica de composição de classes com clsx ou cn utility
    - Adicionar suporte a dark mode nas variantes
    - _Requirements: 1.2, 1.3_
  
  - [x] 1.3 Implementar suporte a ícones
    - Adicionar lógica para renderizar ícone à esquerda ou direita do texto
    - Implementar espaçamento adequado entre ícone e texto
    - Adicionar fallback para iconPosition quando icon é fornecido
    - _Requirements: 1.4_
  
  - [x] 1.4 Implementar shine effect com GPU acceleration
    - Criar elemento overlay absoluto para shine effect
    - Adicionar animação shine usando transform e opacity
    - Configurar will-change-transform para otimização GPU
    - Aplicar overflow-hidden no botão para conter o efeito
    - _Requirements: 1.5, 1.6_
  
  - [x] 1.5 Implementar hover animations e estado disabled
    - Adicionar transformação scale-105 no hover
    - Adicionar transição suave para todas as propriedades
    - Implementar estado disabled com opacity-50 e cursor-not-allowed
    - Adicionar atributos ARIA apropriados
    - _Requirements: 1.7, 1.8, 1.9_
  
  - [ ]* 1.6 Escrever testes unitários para PrimaryButton
    - Testar renderização com props padrão
    - Testar cada variante individualmente
    - Testar cada tamanho individualmente
    - Testar posicionamento de ícone (left/right)
    - Testar estado disabled
    - Testar casos edge (icon sem iconPosition)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.8, 1.9_
  
  - [ ]* 1.7 Escrever property test para Button Variant Rendering
    - **Property 1: Button Variant Rendering**
    - **Validates: Requirements 1.2**
    - Usar fast-check para gerar todas as variantes válidas
    - Verificar que classes CSS corretas são aplicadas para cada variante
    - Configurar mínimo 100 iterações
    - _Requirements: 1.2_
  
  - [ ]* 1.8 Escrever property test para Button Size Rendering
    - **Property 2: Button Size Rendering**
    - **Validates: Requirements 1.3**
    - Usar fast-check para gerar todos os tamanhos válidos
    - Verificar que classes CSS corretas são aplicadas para cada tamanho
    - Configurar mínimo 100 iterações
    - _Requirements: 1.3_
  
  - [ ]* 1.9 Escrever property test para Icon Position Rendering
    - **Property 3: Icon Position Rendering**
    - **Validates: Requirements 1.4**
    - Usar fast-check para gerar posições (left/right) e conteúdo de ícone
    - Verificar ordem correta dos elementos no DOM
    - Configurar mínimo 100 iterações
    - _Requirements: 1.4_
  
  - [ ]* 1.10 Escrever property test para Button Disabled State
    - **Property 4: Button Disabled State**
    - **Validates: Requirements 1.8, 1.9**
    - Usar fast-check para gerar valores booleanos
    - Verificar atributo disabled e classes de estilo quando disabled=true
    - Configurar mínimo 100 iterações
    - _Requirements: 1.8, 1.9_

- [ ] 2. Checkpoint - Validar PrimaryButton
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implementar PandaVideoPlayer Aprimorado
  - [x] 3.1 Criar estrutura base do componente PandaVideoPlayer
    - Criar arquivo src/presentation/components/molecules/PandaVideoPlayer.tsx
    - Adicionar diretiva "use client"
    - Definir interface PandaVideoPlayerProps (src, poster, autoplay, loop, muted, controls, className)
    - Criar estados com useState (isPlaying, isMuted, isLoading)
    - Criar ref para elemento video com useRef
    - Implementar componente base com elemento video
    - _Requirements: 2.1, 2.8, 2.9, 2.10_
  
  - [x] 3.2 Implementar controles de play/pause
    - Criar função handlePlay que alterna entre play() e pause()
    - Adicionar tratamento de erro para play() com catch
    - Criar botão de play/pause com ícone SVG
    - Posicionar controle absolutamente sobre o vídeo
    - Adicionar atributos ARIA para acessibilidade
    - _Requirements: 2.2_
  
  - [x] 3.3 Implementar controles de mute/unmute
    - Criar função handleMute que alterna propriedade muted do vídeo
    - Sincronizar estado isMuted com prop muted inicial
    - Criar botão de mute/unmute com ícone SVG animado
    - Implementar transição suave entre ícones de volume
    - _Requirements: 2.3_
  
  - [x] 3.4 Implementar controle de fullscreen
    - Criar função handleFullscreen usando requestFullscreen API
    - Adicionar verificação de suporte à API de fullscreen
    - Criar botão de fullscreen com ícone SVG
    - Ocultar botão se API não for suportada
    - _Requirements: 2.4_
  
  - [x] 3.5 Implementar muted indicator overlay
    - Criar overlay semi-transparente que aparece quando isMuted=true
    - Adicionar ícone SVG de volume mudo no centro
    - Posicionar absolutamente sobre o vídeo
    - Aplicar estilos de dark mode compatíveis
    - _Requirements: 2.5_
  
  - [x] 3.6 Implementar loading indicator
    - Criar estado isLoading inicializado como true
    - Adicionar event listener onLoadedData para definir isLoading=false
    - Criar spinner de loading com animate-spin do Tailwind
    - Posicionar centralmente sobre o vídeo
    - Ocultar quando isLoading=false
    - _Requirements: 2.6, 2.7_
  
  - [x] 3.7 Aplicar React.memo para otimização
    - Envolver componente com React.memo
    - Definir função de comparação customizada se necessário
    - Adicionar comentário explicando otimização
    - _Requirements: 2.11_
  
  - [ ]* 3.8 Escrever testes unitários para PandaVideoPlayer
    - Testar renderização com props mínimas (apenas src)
    - Testar renderização de controles customizados
    - Testar visibilidade de muted indicator quando muted=true
    - Testar visibilidade de loading indicator
    - Testar interação de play/pause
    - Testar interação de mute/unmute
    - Testar caso de erro ao carregar vídeo
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 2.7_
  
  - [ ]* 3.9 Escrever property test para Video Muted Indicator Visibility
    - **Property 5: Video Muted Indicator Visibility**
    - **Validates: Requirements 2.5**
    - Usar fast-check para gerar valores booleanos para muted
    - Verificar que muted indicator está visível quando muted=true
    - Configurar mínimo 100 iterações
    - _Requirements: 2.5_
  
  - [ ]* 3.10 Escrever property test para Video Loading Indicator Visibility
    - **Property 6: Video Loading Indicator Visibility**
    - **Validates: Requirements 2.7**
    - Usar fast-check para gerar valores booleanos para loading state
    - Verificar que loading indicator está visível quando isLoading=true
    - Configurar mínimo 100 iterações
    - _Requirements: 2.7_
  
  - [ ]* 3.11 Escrever property test para Video Configuration Attributes
    - **Property 7: Video Configuration Attributes**
    - **Validates: Requirements 2.8, 2.9, 2.10**
    - Usar fast-check para gerar combinações de autoplay, loop, controls
    - Verificar que atributos HTML do video correspondem aos props
    - Configurar mínimo 100 iterações
    - _Requirements: 2.8, 2.9, 2.10_

- [ ] 4. Checkpoint - Validar PandaVideoPlayer
  - Ensure all tests pass, ask the user if questions arise.

- [-] 5. Implementar GradientText
  - [-] 5.1 Criar componente GradientText
    - Criar arquivo src/presentation/components/atoms/GradientText.tsx
    - Definir interface GradientTextProps (as, children, className)
    - Implementar componente polimórfico usando createElement
    - Aplicar classes de gradiente: bg-gradient-to-r from-[#bb0711] to-[#3f4adf]
    - Aplicar classes de clip: bg-clip-text text-transparent
    - Adicionar suporte a className adicional com merge
    - Definir 'span' como elemento padrão
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 5.2 Escrever testes unitários para GradientText
    - Testar renderização como span por padrão
    - Testar renderização como cada tipo de elemento (h1-h6, p, span)
    - Testar aplicação de classes de gradiente
    - Testar merge de className customizado
    - Testar renderização de children
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 5.3 Escrever property test para GradientText Element Polymorphism
    - **Property 8: GradientText Element Polymorphism**
    - **Validates: Requirements 3.3**
    - Usar fast-check para gerar todos os tipos de elemento válidos
    - Verificar que elemento correto é renderizado no DOM
    - Verificar que classes de gradiente estão presentes
    - Configurar mínimo 100 iterações
    - _Requirements: 3.3_

- [ ] 6. Checkpoint - Validar GradientText
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Atualizar GlobalStyles para Tailwind v4
  - [ ] 7.1 Configurar imports do Tailwind v4
    - Abrir src/app/globals.css
    - Substituir imports antigos por @import "tailwindcss"
    - Adicionar @import "tw-animate-css" se necessário
    - Remover imports de layers antigos (@tailwind base, components, utilities)
    - _Requirements: 4.1_
  
  - [ ] 7.2 Configurar @source directives
    - Adicionar @source "../presentation/**/*.{ts,tsx}" para componentes
    - Adicionar @source "./**/*.{ts,tsx}" para app directory
    - Configurar paths corretos para scanning de classes
    - _Requirements: 4.2_
  
  - [ ] 7.3 Definir custom variant para dark mode
    - Adicionar @custom-variant dark (&:is(.dark *))
    - Testar que variant funciona com classes dark:
    - _Requirements: 4.3_
  
  - [ ] 7.4 Configurar theme tokens com @theme inline
    - Criar bloco @theme inline
    - Mapear CSS custom properties para utilities do Tailwind
    - Incluir colors, fonts, border-radius, e tokens de componentes
    - _Requirements: 4.4_
  
  - [ ] 7.5 Definir CSS custom properties para light theme
    - Criar seletor :root
    - Definir todas as variáveis de cor usando oklch
    - Incluir cores de brand (primary, secondary)
    - Incluir cores semânticas (background, foreground, muted, accent, destructive)
    - Incluir cores de componentes (card, popover, border, input, ring)
    - _Requirements: 4.5, 4.6_
  
  - [ ] 7.6 Definir CSS custom properties para dark theme
    - Criar seletor .dark
    - Definir versões dark de todas as variáveis do :root
    - Garantir que cada propriedade em :root tem correspondente em .dark
    - Ajustar valores oklch para melhor contraste em dark mode
    - _Requirements: 4.7, 4.13_
  
  - [ ] 7.7 Definir utility classes customizadas
    - Criar classe .container com max-width e padding responsivo
    - Criar classe .font-clash-display para fonte customizada
    - Adicionar outras utilities necessárias
    - _Requirements: 4.8_
  
  - [ ] 7.8 Estilizar scrollbar customizada
    - Definir estilos para ::-webkit-scrollbar
    - Definir estilos para ::-webkit-scrollbar-track
    - Definir estilos para ::-webkit-scrollbar-thumb
    - Adicionar suporte a dark mode na scrollbar
    - _Requirements: 4.9_
  
  - [ ] 7.9 Definir headings responsivos
    - Criar classes .h1 através .h7 com tamanhos responsivos
    - Usar clamp() para fluid typography
    - Definir line-height e font-weight apropriados
    - Garantir acessibilidade com tamanhos mínimos legíveis
    - _Requirements: 4.10_
  
  - [ ] 7.10 Definir estilos para .post-content
    - Criar seletor .post-content com estilos para conteúdo de blog
    - Estilizar headings, paragraphs, lists, links dentro de .post-content
    - Adicionar espaçamento vertical adequado
    - Garantir legibilidade com line-height apropriado
    - _Requirements: 4.11_
  
  - [ ] 7.11 Adicionar animação shine otimizada
    - Criar @keyframes shine usando transform e opacity
    - Garantir GPU acceleration (translateX ao invés de left/right)
    - Definir duração e timing function apropriados
    - Adicionar classe utility .animate-shine
    - _Requirements: 4.12_
  
  - [ ] 7.12 Adicionar suporte a prefers-reduced-motion
    - Criar media query @media (prefers-reduced-motion: reduce)
    - Desabilitar ou reduzir animações para usuários com preferência
    - Aplicar a todas as animações (shine, button-shake, glow)
    - _Requirements: 4.14_
  
  - [ ]* 7.13 Escrever testes CSS para GlobalStyles
    - Configurar postcss para parsing de CSS
    - Testar que @import "tailwindcss" está presente
    - Testar que custom variant dark está definido
    - Testar que @theme inline está configurado
    - _Requirements: 4.1, 4.3, 4.4_
  
  - [ ]* 7.14 Escrever property test para Theme Property Completeness
    - **Property 9: Theme Property Completeness**
    - **Validates: Requirements 4.13**
    - Parsear globals.css com postcss
    - Extrair todas as custom properties de :root
    - Extrair todas as custom properties de .dark
    - Verificar que cada propriedade em :root existe em .dark
    - _Requirements: 4.13_

- [ ] 8. Checkpoint Final - Validar GlobalStyles
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para MVP mais rápido
- Cada task referencia requirements específicos para rastreabilidade
- Checkpoints garantem validação incremental após cada componente
- Property tests validam propriedades universais de correção
- Unit tests validam exemplos específicos e casos edge
- Implementar na ordem: PrimaryButton → PandaVideoPlayer → GradientText → GlobalStyles
- Cada seção principal representa um commit separado
