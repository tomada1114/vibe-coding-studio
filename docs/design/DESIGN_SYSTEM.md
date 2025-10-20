# Radiant Design System Documentation

## 🎨 Design Philosophy

The Radiant design system is built on principles of **subtle sophistication**, **intentional minimalism**, and **motion-enhanced interactions**. Every element follows a cohesive visual language that can be replicated across any framework or technology stack.

---

## 🎨 Color System

### Core Philosophy

- **Monochromatic Base**: Primary reliance on grayscale creates professional sophistication
- **Accent Minimalism**: Color used sparingly for maximum impact
- **Semantic Clarity**: Colors have clear functional meanings

### Color Palette

#### Primary Colors

```
Gray-950 (Near Black): #030712 - Primary text, buttons, emphasis
Gray-900: #111827 - Secondary emphasis, dark backgrounds
Gray-800: #1F2937 - Hover states on dark elements
Gray-700: #374151 - Muted text on light backgrounds
Gray-600: #4B5563 - Secondary text, borders
Gray-500: #6B7280 - Placeholder text, disabled states
Gray-400: #9CA3AF - Subtle text, inactive elements
Gray-300: #D1D5DB - Light borders, dividers
Gray-200: #E5E7EB - Background accents, hover states
Gray-100: #F3F4F6 - Light backgrounds
Gray-50: #F9FAFB - Subtle backgrounds
White: #FFFFFF - Primary background, text on dark
```

#### Accent Colors (Used Sparingly)

```
Blue-600: #2563EB - Links, interactive elements (rare usage)
Green-600: #16A34A - Success states
Red-600: #DC2626 - Error states, warnings
Yellow-500: #EAB308 - Caution, attention
```

### Color Application Rules

1. **Text Hierarchy**
   - Primary text: Gray-950 on white, White on Gray-950
   - Secondary text: Gray-600 on white, Gray-400 on dark
   - Muted text: Gray-500 always
   - Links: Inherit parent color (no blue by default)

2. **Background Layers**
   - Base: White or Gray-950
   - Elevated: Gray-50 on white, Gray-900 on dark
   - Recessed: Gray-100 on white, Pure black on dark

3. **Interactive States**
   - Hover: Darken by 1-2 steps in gray scale
   - Active: Darken by 3 steps
   - Focus: 2px offset ring in current color
   - Disabled: Gray-400 with 50% opacity

---

## 📐 Spacing System

### Base Unit

8px grid system with selective 4px subdivisions

### Spacing Scale

```
0.5: 2px   - Micro adjustments only
1: 4px     - Inline spacing, small gaps
1.5: 6px   - Compact spacing
2: 8px     - Base unit, most common
2.5: 10px  - Button padding vertical
3: 12px    - Card padding mobile
4: 16px    - Standard gap, button padding horizontal
5: 20px    - Section spacing mobile
6: 24px    - Component spacing
8: 32px    - Section padding desktop
10: 40px   - Large spacing
12: 48px   - Hero sections
16: 64px   - Major sections
20: 80px   - Page-level spacing
24: 96px   - Extra large spacing
32: 128px  - Maximum spacing
```

### Spacing Application Patterns

#### Container Padding

- Mobile: `px-6` (24px horizontal)
- Desktop: `px-8` (32px horizontal)
- Maximum width: `max-w-6xl` (1152px)

#### Component Spacing

- Card padding: `p-6` mobile, `p-8` desktop
- Button padding: `px-4 py-2.5` (16px horizontal, 10px vertical)
- List item spacing: `space-y-4` (16px between items)
- Section spacing: `py-20 lg:py-32` (80px mobile, 128px desktop)

#### Text Spacing

- Paragraph spacing: `space-y-6` (24px between paragraphs)
- Heading to content: `mt-4` (16px)
- Line height: Tailwind defaults (tight for headings, relaxed for body)

---

## 🔤 Typography System

### Font Families

```
Sans: system-ui, -apple-system, 'Segoe UI', sans-serif
Mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace
```

### Type Scale

#### Headings

```
H1: text-6xl (60px) - font-medium, tracking-tighter, leading-tight
H2: text-4xl (36px) - font-medium, tracking-tighter, leading-tight
H3: text-2xl (24px) - font-semibold, tracking-tight, leading-tight
H4: text-xl (20px) - font-semibold, leading-snug
H5: text-lg (18px) - font-semibold, leading-normal
H6: text-base (16px) - font-semibold, leading-normal
```

#### Body Text

```
Large: text-2xl (24px) - font-medium, leading-relaxed
Base: text-base (16px) - font-normal, leading-relaxed
Small: text-sm (14px) - font-normal, leading-relaxed
Extra Small: text-xs (12px) - font-normal, leading-normal
```

#### Special Text

```
Subheading: font-mono, text-xs, uppercase, tracking-widest, font-semibold
Lead: text-2xl, font-medium, text-gray-500
Caption: text-sm, text-gray-600
Code: font-mono, text-sm, bg-gray-100, px-1.5, py-0.5, rounded
```

### Typography Rules

1. **Heading Hierarchy**
   - Never skip heading levels
   - H1 once per page
   - H2 for major sections
   - H3 for subsections

2. **Text Contrast**
   - Primary text: Full black/white
   - Secondary text: Gray-600/Gray-400
   - Muted text: Gray-500 always

3. **Line Length**
   - Optimal: 65-75 characters
   - Maximum: `max-w-prose` (65ch)
   - Minimum: 45 characters

---

## 🔲 Component Patterns

### Buttons

#### Primary Button

```
Structure: inline-flex items-center justify-center
Padding: px-4 py-2.5 (16px × 10px)
Typography: text-sm font-semibold
Border Radius: rounded-full (pill shape)
Colors: bg-gray-950 text-white hover:bg-gray-800
Focus: ring-2 ring-offset-2 ring-gray-950
Transition: All properties, 150ms, ease-in-out
```

#### Secondary Button

```
Same structure as Primary
Colors: bg-white text-gray-950 shadow-sm hover:bg-gray-50
Border: ring-1 ring-gray-300
```

#### Outline Button

```
Same structure as Primary
Colors: bg-transparent text-gray-950 hover:bg-gray-50
Border: ring-1 ring-gray-300
```

### Cards

#### Basic Card

```
Structure: overflow-hidden
Background: bg-white
Border: border border-gray-200
Border Radius: rounded-lg (8px)
Padding: p-6 (24px)
Shadow: shadow-sm (subtle elevation)
```

#### Elevated Card

```
Same as Basic Card
Shadow: shadow-lg (higher elevation)
No border
```

#### Interactive Card

```
Same as Basic Card
Hover: shadow-md transition-shadow duration-200
Cursor: cursor-pointer
```

#### Bento Card (Feature Card)

```
Structure: relative overflow-hidden
Gradient: Optional fade from top/bottom
Padding: p-8 lg:p-12
Content Order: Eyebrow → Title → Description → Children
Spacing: space-y-4 between elements
```

### Forms

#### Input Fields

```
Structure: block w-full
Padding: px-3 py-2
Typography: text-sm
Border: border border-gray-300
Border Radius: rounded-md (6px)
Background: bg-white
Focus: ring-2 ring-gray-950 border-transparent
Placeholder: placeholder-gray-500
```

#### Labels

```
Typography: text-sm font-medium text-gray-700
Spacing: mb-1 from input
Required: Add asterisk with text-red-600
```

#### Form Groups

```
Spacing: space-y-6 between groups
Layout: Stack on mobile, optional grid on desktop
```

### Navigation

#### Navbar

```
Height: h-16 (64px)
Padding: px-6 lg:px-8
Background: bg-white/90 backdrop-blur-lg
Border: border-b border-gray-200
Position: sticky top-0 z-50
```

#### Nav Links

```
Typography: text-sm font-medium
Colors: text-gray-600 hover:text-gray-950
Spacing: gap-8 between items
Active: text-gray-950
Transition: color 150ms ease-in-out
```

### Layout Components

#### Container

```
Width: w-full
Max Width: max-w-6xl (1152px)
Margin: mx-auto
Padding: px-6 lg:px-8
```

#### Section

```
Padding: py-20 lg:py-32 (80px/128px)
Spacing: space-y-12 between major elements
```

#### Grid Layouts

```
Mobile: grid-cols-1
Tablet: sm:grid-cols-2
Desktop: lg:grid-cols-3 or lg:grid-cols-4
Gap: gap-6 or gap-8
```

---

## 🎭 Motion & Animation

### Core Principles

- **Subtle Enhancement**: Motion should enhance, not distract
- **Performance First**: Use CSS transforms over position changes
- **Consistent Timing**: Unified duration and easing across elements

### Animation Timing

```
Instant: 75ms - Micro interactions
Fast: 150ms - Hover states, small transitions
Normal: 200ms - Most animations
Slow: 300ms - Complex transitions, reveals
Extra Slow: 500ms - Page transitions, major state changes
```

### Easing Functions

```
Default: ease-in-out - Most transitions
Enter: ease-out - Elements appearing
Exit: ease-in - Elements disappearing
Spring: cubic-bezier(0.34, 1.56, 0.64, 1) - Playful bounces
```

### Common Animations

#### Hover States

```
transition: all 150ms ease-in-out
transform: translateY(-2px) on cards
opacity: 0.8 on images
scale: 1.05 on buttons (rarely)
```

#### Focus States

```
ring: 2px offset 2px
transition: box-shadow 150ms ease-in-out
```

#### Loading States

```
Skeleton: animate-pulse with bg-gray-200
Spinner: animate-spin with border-gray-300
Progress: transition-all duration-300 ease-out
```

#### Page Transitions

```
Fade In: opacity 0 to 100, 300ms ease-out
Slide Up: translateY(20px) to 0, 300ms ease-out
Scale: scale(0.95) to 1, 300ms ease-out
```

---

## 📱 Responsive Design

### Breakpoints

```
sm: 640px - Large phones
md: 768px - Tablets
lg: 1024px - Small laptops
xl: 1280px - Desktops
2xl: 1536px - Large desktops
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens.

### Responsive Patterns

#### Typography Scaling

```
Mobile: text-4xl
Desktop: sm:text-6xl
```

#### Spacing Scaling

```
Mobile: py-20
Desktop: lg:py-32
```

#### Grid Adaptation

```
Mobile: grid-cols-1
Tablet: sm:grid-cols-2
Desktop: lg:grid-cols-3
```

#### Container Behavior

```
Mobile: px-6 (24px padding)
Desktop: px-8 (32px padding)
Max: max-w-6xl centered
```

---

## 🌟 Special Effects

### Gradients

```
Primary: from-gray-50 to-white
Dark: from-gray-900 to-gray-950
Accent: from-gray-900/0 via-gray-900/50 to-gray-900/0
```

### Shadows

```
sm: 0 1px 2px rgba(0,0,0,0.05)
DEFAULT: 0 1px 3px rgba(0,0,0,0.1)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.1)
```

### Overlays

```
Light: bg-white/90 backdrop-blur-lg
Dark: bg-gray-950/90 backdrop-blur-lg
Gradient: bg-gradient-to-t from-gray-950/90 to-transparent
```

### Special Components

#### Plus Grid Pattern

```
Structure: Grid of + symbols
Spacing: 64px between symbols
Color: text-gray-400/20 (very subtle)
Size: 16px × 16px per symbol
Use: Background decoration only
```

#### Gradient Orb

```
Structure: Absolute positioned div
Size: 384px × 384px
Gradient: Radial from color/30 to transparent
Blur: blur-3xl
Animation: Optional slow drift
```

---

## 🎯 Design Principles Summary

1. **Minimalism First**: Every element must justify its existence
2. **Grayscale Foundation**: Color is the exception, not the rule
3. **Consistent Spacing**: 8px grid with purposeful exceptions
4. **Subtle Motion**: Enhance without distraction
5. **Clear Hierarchy**: Visual weight guides the eye
6. **Responsive Naturally**: Mobile-first, desktop-enhanced
7. **Accessibility Always**: Contrast, focus states, keyboard navigation
8. **Performance Matters**: Every decision considers load time

---

## 🔧 Implementation Notes

### Framework Agnostic

This design system can be implemented in:

- React/Next.js with Tailwind CSS (current)
- Vue.js with custom CSS
- Angular with CSS modules
- Vanilla HTML/CSS
- Flutter
- SwiftUI
- React Native

### Key Measurements to Maintain

- 8px base grid
- 1152px max container width
- 64px navbar height
- 24px mobile padding
- 32px desktop padding
- 150ms default transition
- 2px focus ring offset

### Critical Visual Elements

1. Pill-shaped buttons (fully rounded)
2. Subtle shadows (never harsh)
3. Smooth transitions (never instant)
4. Consistent border radius (4px, 6px, 8px)
5. High contrast text (WCAG AA minimum)
6. Generous whitespace (never cramped)

---

This design system creates a sophisticated, professional appearance that feels premium without being ostentatious. The key is restraint—using the minimum necessary to achieve maximum impact.
