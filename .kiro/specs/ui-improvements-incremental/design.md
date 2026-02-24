# Design Document: UI Improvements Incremental

## Overview

Este documento detalha o design técnico para quatro melhorias incrementais na interface do usuário de um projeto Next.js com TypeScript e Tailwind CSS v4. As melhorias são projetadas para serem implementadas em commits separados, permitindo um histórico de mudanças organizado e revisões incrementais.

As quatro melhorias são:

1. **PrimaryButton**: Componente atômico de botão com efeitos visuais avançados (shine effect, hover animations)
2. **PandaVideoPlayer**: Componente molecular de player de vídeo com controles customizados
3. **GradientText**: Componente atômico para texto com efeito de gradiente usando cores do tema
4. **GlobalStyles**: Migração completa para Tailwind v4 com custom utilities e theme tokens

Cada componente é projetado com foco em performance (GPU acceleration, React.memo), acessibilidade (ARIA attributes), e compatibilidade com dark mode.

## Architecture

### Component Hierarchy

O projeto segue a metodologia Atomic Design:

```
src/presentation/components/
├── atoms/
│   ├── PrimaryButton.tsx       (Client Component)
│   └── GradientText.tsx        (Server Component)
├── molecules/
│   └── PandaVideoPlayer.tsx    (Client Component)
└── organisms/
    └── (existing components)
```

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks (useState, useRef)
- **Optimization**: React.memo for expensive components

### Design Principles

1. **Incremental Implementation**: Each component can be implemented and committed independently
2. **Performance First**: GPU-accelerated animations using transform and opacity
3. **Accessibility**: WCAG compliant with proper ARIA attributes
4. **Theme Compatibility**: Full support for light and dark modes
5. **Type Safety**: Comprehensive TypeScript interfaces for all props

## Components and Interfaces

### 1. PrimaryButton Component

**Location**: `src/presentation/components/atoms/PrimaryButton.tsx`

**Type**: Client Component (requires "use client" directive)

**Purpose**: Reusable button component with advanced visual effects including shine animation and hover transformations.

**Props Interface**:

```typescript
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'outline-solid' | 'white';
  size?: 'default' | 'sm' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}
```

**Key Features**:
- Four visual variants with distinct styling
- Three size options with appropriate padding and font sizes
- Optional icon support with configurable positioning
- Shine effect overlay with GPU-accelerated animation
- Hover scale transformation (scale-105)
- Disabled state handling with visual feedback
- Full accessibility support

**Styling Strategy**:
- Uses Tailwind v4 utility classes
- Shine effect implemented with absolute positioned pseudo-element
- GPU acceleration via `will-change-transform` and `transform` properties
- Dark mode support through Tailwind's dark variant

### 2. PandaVideoPlayer Component

**Location**: `src/presentation/components/molecules/PandaVideoPlayer.tsx`

**Type**: Client Component (requires "use client" directive)

**Purpose**: Custom video player with intuitive controls and visual feedback for loading and muted states.

**Props Interface**:

```typescript
interface PandaVideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}
```

**Key Features**:
- Custom play/pause controls
- Mute/unmute toggle with animated SVG icon
- Fullscreen toggle functionality
- Muted indicator overlay (semi-transparent with icon)
- Loading state indicator
- Native controls optional visibility
- React.memo optimization for performance

**State Management**:
```typescript
const [isPlaying, setIsPlaying] = useState(false);
const [isMuted, setIsMuted] = useState(muted ?? false);
const [isLoading, setIsLoading] = useState(true);
const videoRef = useRef<HTMLVideoElement>(null);
```

**Styling Strategy**:
- Overlay controls positioned absolutely
- SVG animations for volume icon transitions
- Loading spinner with Tailwind animate-spin
- Dark mode compatible color scheme

### 3. GradientText Component

**Location**: `src/presentation/components/atoms/GradientText.tsx`

**Type**: Server Component (no client-side JavaScript needed)

**Purpose**: Wrapper component that applies gradient effect to text using theme colors.

**Props Interface**:

```typescript
interface GradientTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
}
```

**Key Features**:
- Polymorphic component (supports any text element)
- Gradient from red (#bb0711) to blue (#3f4adf)
- Uses `bg-clip-text` for text gradient effect
- Maintains semantic HTML structure
- Preserves accessibility

**Styling Strategy**:
```css
background: linear-gradient(to right, #bb0711, #3f4adf);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

Implemented via Tailwind classes: `bg-gradient-to-r from-[#bb0711] to-[#3f4adf] bg-clip-text text-transparent`

### 4. GlobalStyles (globals.css)

**Location**: `src/app/globals.css`

**Type**: CSS file with Tailwind v4 directives

**Purpose**: Centralized global styles, theme configuration, and custom utilities for the entire application.

**Key Sections**:

1. **Tailwind Imports**:
   - `@import "tailwindcss"` - Main Tailwind v4 import
   - `@import "tw-animate-css"` - Animation utilities

2. **Custom Variants**:
   - `@custom-variant dark` - Dark mode variant configuration

3. **Theme Configuration** (`@theme inline`):
   - Maps CSS custom properties to Tailwind utilities
   - Includes colors, fonts, radii, and component-specific tokens

4. **CSS Custom Properties**:
   - `:root` - Light theme color definitions
   - `.dark` - Dark theme color definitions
   - Uses oklch color space for better color manipulation

5. **Base Layer Styles**:
   - Global resets and defaults
   - Typography system (headings, paragraphs)
   - Utility classes (.h1 through .h7)
   - Section container utility

6. **Custom Animations**:
   - `@keyframes shine` - GPU-optimized shine effect
   - `@keyframes button-shake` - Button shake animation
   - `@keyframes glow` - Glow effect animation

**Shine Animation** (GPU-Optimized):
```css
@keyframes shine {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

## Data Models

### Button Variant Mapping

```typescript
const variantStyles = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  'outline-solid': 'border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground',
  white: 'bg-white text-primary hover:bg-white/90'
};
```

### Button Size Mapping

```typescript
const sizeStyles = {
  default: 'h-11 px-8 py-2 text-base',
  sm: 'h-9 px-4 py-1.5 text-sm',
  lg: 'h-13 px-10 py-3 text-lg'
};
```

### Video Player State

```typescript
interface VideoPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  isFullscreen: boolean;
}
```

### Theme Color Tokens

```typescript
interface ThemeColors {
  // Brand colors
  primary: string;           // #a52024 (Brand Red)
  secondary: string;         // #153567 (Brand Blue)
  
  // Semantic colors
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  destructive: string;
  
  // Component colors
  card: string;
  popover: string;
  border: string;
  input: string;
  ring: string;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, the following properties were identified as testable. Several criteria were consolidated to avoid redundancy:

- **PrimaryButton variants and sizes**: Combined into comprehensive rendering properties
- **Video player configuration props**: Consolidated into a single property about attribute mapping
- **GlobalStyles examples**: Most are specific examples rather than universal properties

The properties below represent the minimal set of universal rules that validate the requirements without redundancy.

### Property 1: Button Variant Rendering

*For any* valid variant value (default, outline, outline-solid, white), the PrimaryButton component should render with the corresponding variant-specific CSS classes in the output.

**Validates: Requirements 1.2**

### Property 2: Button Size Rendering

*For any* valid size value (default, sm, lg), the PrimaryButton component should render with the corresponding size-specific CSS classes in the output.

**Validates: Requirements 1.3**

### Property 3: Icon Position Rendering

*For any* icon element and position value (left or right), when both are provided to PrimaryButton, the icon should appear in the correct position relative to the button text in the rendered output.

**Validates: Requirements 1.4**

### Property 4: Button Disabled State

*For any* PrimaryButton instance, when the disabled prop is true, the component should render with disabled attribute and appropriate disabled styling classes.

**Validates: Requirements 1.8, 1.9**

### Property 5: Video Muted Indicator Visibility

*For any* PandaVideoPlayer instance, when the muted state is true, the muted indicator overlay should be visible in the rendered output.

**Validates: Requirements 2.5**

### Property 6: Video Loading Indicator Visibility

*For any* PandaVideoPlayer instance, when the loading state is true, the loading indicator should be visible in the rendered output.

**Validates: Requirements 2.7**

### Property 7: Video Configuration Attributes

*For any* PandaVideoPlayer instance with autoplay, loop, or controls props, the video element should have the corresponding HTML attributes set to match the prop values.

**Validates: Requirements 2.8, 2.9, 2.10**

### Property 8: GradientText Element Polymorphism

*For any* valid HTML text element tag (h1, h2, h3, h4, h5, h6, p, span), when provided as the "as" prop to GradientText, the component should render that specific element type with gradient styling.

**Validates: Requirements 3.3**

### Property 9: Theme Property Completeness

*For any* CSS custom property defined in the :root selector, there should be a corresponding definition in the .dark selector with an appropriate dark mode value.

**Validates: Requirements 4.13**

## Error Handling

### PrimaryButton Error Handling

1. **Invalid Variant**: If an invalid variant is provided, default to 'default' variant
2. **Missing Children**: Component requires children prop; TypeScript will enforce this at compile time
3. **Icon Without Position**: If icon is provided without iconPosition, default to 'left'

### PandaVideoPlayer Error Handling

1. **Invalid Video Source**: Display error message overlay if video fails to load
2. **Fullscreen API Unavailable**: Gracefully hide fullscreen button if API not supported
3. **Video Element Not Mounted**: Check videoRef.current before calling video methods

```typescript
const handlePlay = () => {
  if (!videoRef.current) return;
  
  if (isPlaying) {
    videoRef.current.pause();
  } else {
    videoRef.current.play().catch((error) => {
      console.error('Video play failed:', error);
    });
  }
  setIsPlaying(!isPlaying);
};
```

4. **Autoplay Blocked**: Handle autoplay policy restrictions with user interaction fallback

### GradientText Error Handling

1. **Invalid Element Type**: Default to 'span' if invalid element type provided
2. **Missing Children**: Component requires children; TypeScript enforces this

### GlobalStyles Error Handling

1. **Missing CSS Variables**: Provide fallback values in Tailwind config
2. **Font Loading Failures**: System font stack as fallback
3. **Animation Performance**: Use `prefers-reduced-motion` media query to disable animations for users who prefer reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit testing and property-based testing for comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, and error conditions
- **Property Tests**: Verify universal properties across all inputs

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing

**Framework**: Jest + React Testing Library

**Focus Areas**:
1. **Specific Examples**:
   - PrimaryButton renders correctly with default props
   - PandaVideoPlayer displays muted indicator when muted
   - GradientText renders as h1 element when specified

2. **Edge Cases**:
   - PrimaryButton with icon but no iconPosition
   - PandaVideoPlayer with invalid video source
   - GradientText with empty children

3. **Integration Points**:
   - Button click handlers trigger correctly
   - Video player controls interact with video element
   - Components integrate with theme system

4. **Error Conditions**:
   - Video play fails due to autoplay policy
   - Fullscreen API not available
   - Missing required props

**Example Unit Test**:
```typescript
describe('PrimaryButton', () => {
  it('should render with default variant when no variant specified', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('should handle disabled state correctly', () => {
    render(<PrimaryButton disabled>Click me</PrimaryButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });
});
```

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Tag Format**: Each test must include a comment referencing the design property:
```typescript
// Feature: ui-improvements-incremental, Property 1: Button Variant Rendering
```

**Property Test Examples**:

```typescript
import fc from 'fast-check';

describe('PrimaryButton Properties', () => {
  // Feature: ui-improvements-incremental, Property 1: Button Variant Rendering
  it('should render correct classes for any valid variant', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default', 'outline', 'outline-solid', 'white'),
        (variant) => {
          const { container } = render(
            <PrimaryButton variant={variant}>Test</PrimaryButton>
          );
          const button = container.querySelector('button');
          
          const variantClassMap = {
            default: 'bg-primary',
            outline: 'border-2 border-primary',
            'outline-solid': 'border-2 border-primary bg-background',
            white: 'bg-white'
          };
          
          expect(button?.className).toContain(variantClassMap[variant]);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: ui-improvements-incremental, Property 2: Button Size Rendering
  it('should render correct classes for any valid size', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default', 'sm', 'lg'),
        (size) => {
          const { container } = render(
            <PrimaryButton size={size}>Test</PrimaryButton>
          );
          const button = container.querySelector('button');
          
          const sizeClassMap = {
            default: 'h-11',
            sm: 'h-9',
            lg: 'h-13'
          };
          
          expect(button?.className).toContain(sizeClassMap[size]);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: ui-improvements-incremental, Property 3: Icon Position Rendering
  it('should render icon in correct position for any icon and position', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('left', 'right'),
        fc.string({ minLength: 1 }),
        (position, iconText) => {
          const { container } = render(
            <PrimaryButton icon={<span>{iconText}</span>} iconPosition={position}>
              Button Text
            </PrimaryButton>
          );
          
          const button = container.querySelector('button');
          const children = Array.from(button?.children || []);
          const iconIndex = children.findIndex(child => 
            child.textContent === iconText
          );
          const textIndex = children.findIndex(child => 
            child.textContent === 'Button Text'
          );
          
          if (position === 'left') {
            expect(iconIndex).toBeLessThan(textIndex);
          } else {
            expect(iconIndex).toBeGreaterThan(textIndex);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: ui-improvements-incremental, Property 4: Button Disabled State
  it('should render disabled attribute and styling for any disabled button', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (disabled) => {
          const { container } = render(
            <PrimaryButton disabled={disabled}>Test</PrimaryButton>
          );
          const button = container.querySelector('button');
          
          if (disabled) {
            expect(button).toHaveAttribute('disabled');
            expect(button?.className).toMatch(/opacity-50|cursor-not-allowed/);
          } else {
            expect(button).not.toHaveAttribute('disabled');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('PandaVideoPlayer Properties', () => {
  // Feature: ui-improvements-incremental, Property 7: Video Configuration Attributes
  it('should set video attributes to match prop values', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (autoplay, loop, controls) => {
          const { container } = render(
            <PandaVideoPlayer
              src="test.mp4"
              autoplay={autoplay}
              loop={loop}
              controls={controls}
            />
          );
          const video = container.querySelector('video');
          
          if (autoplay) {
            expect(video).toHaveAttribute('autoplay');
          }
          if (loop) {
            expect(video).toHaveAttribute('loop');
          }
          if (controls) {
            expect(video).toHaveAttribute('controls');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('GradientText Properties', () => {
  // Feature: ui-improvements-incremental, Property 8: GradientText Element Polymorphism
  it('should render correct element type for any valid text element', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'),
        (elementType) => {
          const { container } = render(
            <GradientText as={elementType}>Test Text</GradientText>
          );
          
          const element = container.querySelector(elementType);
          expect(element).toBeInTheDocument();
          expect(element?.className).toMatch(/bg-gradient|bg-clip-text/);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### CSS Testing

For GlobalStyles, use CSS parsing and validation:

```typescript
import postcss from 'postcss';
import fs from 'fs';

describe('GlobalStyles Properties', () => {
  let cssContent: string;
  let parsedCss: postcss.Root;

  beforeAll(() => {
    cssContent = fs.readFileSync('src/app/globals.css', 'utf-8');
    parsedCss = postcss.parse(cssContent);
  });

  // Feature: ui-improvements-incremental, Property 9: Theme Property Completeness
  it('should define dark mode value for every root custom property', () => {
    const rootProps = new Set<string>();
    const darkProps = new Set<string>();

    parsedCss.walkRules(':root', (rule) => {
      rule.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) {
          rootProps.add(decl.prop);
        }
      });
    });

    parsedCss.walkRules('.dark', (rule) => {
      rule.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) {
          darkProps.add(decl.prop);
        }
      });
    });

    rootProps.forEach((prop) => {
      expect(darkProps).toContain(prop);
    });
  });

  it('should define shine keyframes with GPU-optimized properties', () => {
    let shineFound = false;
    let usesTransform = false;
    let usesOpacity = false;

    parsedCss.walkAtRules('keyframes', (rule) => {
      if (rule.params === 'shine') {
        shineFound = true;
        rule.walkDecls((decl) => {
          if (decl.prop === 'transform') usesTransform = true;
          if (decl.prop === 'opacity') usesOpacity = true;
        });
      }
    });

    expect(shineFound).toBe(true);
    expect(usesTransform).toBe(true);
    expect(usesOpacity).toBe(true);
  });
});
```

### Test Coverage Goals

- **Unit Test Coverage**: Minimum 80% code coverage
- **Property Test Coverage**: All 9 correctness properties must have corresponding property tests
- **Integration Test Coverage**: Key user flows (button clicks, video playback, theme switching)

### Testing Implementation Order

Following the incremental implementation strategy:

1. **Phase 1**: PrimaryButton tests (Properties 1-4)
2. **Phase 2**: PandaVideoPlayer tests (Properties 5-7)
3. **Phase 3**: GradientText tests (Property 8)
4. **Phase 4**: GlobalStyles tests (Property 9)

Each phase should have both unit tests and property tests completed before moving to the next phase.

