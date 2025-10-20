# Radiant Design System - Component Specifications

## 🎯 Component Architecture Philosophy

Each component follows these principles:

1. **Single Responsibility**: One component, one purpose
2. **Composition Over Configuration**: Build complex UI from simple parts
3. **Predictable Behavior**: Consistent patterns across all components
4. **Graceful Enhancement**: Base functionality works everywhere

---

## 🔘 Button Component

### Anatomy

```
[Optional Icon] [Text Label] [Optional Icon]
```

### Detailed Specifications

#### Dimensions

- **Height**: 40px (fixed)
- **Min Width**: 80px
- **Padding Horizontal**: 16px (without icon), 12px (with icon)
- **Padding Vertical**: 10px
- **Icon Size**: 16px × 16px
- **Icon Gap**: 8px from text

#### States & Interactions

**Default State**

- Background: Gray-950
- Text: White
- Border: None
- Shadow: None

**Hover State**

- Background: Gray-800
- Transform: None (no scale/translate)
- Transition: 150ms ease-in-out
- Cursor: Pointer

**Active State**

- Background: Gray-700
- Transform: scale(0.98)
- Transition: 75ms ease-in

**Focus State**

- Ring: 2px solid Gray-950
- Ring Offset: 2px
- Ring Offset Color: White
- Outline: None

**Disabled State**

- Background: Gray-400
- Text: Gray-600
- Opacity: 0.5
- Cursor: Not-allowed
- Pointer Events: None

#### Variants Logic

**Primary (Default)**

```
bg-gray-950 text-white
hover:bg-gray-800
active:bg-gray-700
disabled:bg-gray-400 disabled:text-gray-600
```

**Secondary**

```
bg-white text-gray-950
ring-1 ring-inset ring-gray-300
shadow-sm
hover:bg-gray-50
active:bg-gray-100
```

**Outline**

```
bg-transparent text-gray-950
ring-1 ring-inset ring-gray-300
hover:bg-gray-50
active:bg-gray-100
```

**Danger**

```
bg-red-600 text-white
hover:bg-red-700
active:bg-red-800
```

---

## 🃏 Card Component

### Anatomy

```
┌─────────────────────────┐
│ [Optional Image/Graphic] │
├─────────────────────────┤
│ [Eyebrow Text]          │
│ [Title]                 │
│ [Description]           │
│ [Optional Actions]      │
└─────────────────────────┘
```

### Detailed Specifications

#### Dimensions

- **Width**: Fluid (100% of container)
- **Min Height**: None (content-driven)
- **Padding**: 24px (mobile), 32px (desktop)
- **Border Radius**: 8px
- **Border Width**: 1px
- **Max Width**: None (controlled by grid)

#### Visual Hierarchy

**Eyebrow Text**

- Font: Mono
- Size: 12px
- Weight: 600
- Color: Gray-500
- Letter Spacing: 0.1em (widest)
- Text Transform: Uppercase
- Margin Bottom: 8px

**Title**

- Font: Sans
- Size: 20px (mobile), 24px (desktop)
- Weight: 600
- Color: Gray-950
- Line Height: 1.2
- Margin Bottom: 12px

**Description**

- Font: Sans
- Size: 16px
- Weight: 400
- Color: Gray-600
- Line Height: 1.5
- Margin Bottom: 16px (if actions present)

#### Card Variants

**Basic Card**

```
bg-white
border border-gray-200
shadow-sm
```

**Elevated Card**

```
bg-white
shadow-lg
no border
```

**Interactive Card**

```
bg-white
border border-gray-200
shadow-sm
hover:shadow-md
transition-shadow duration-200
cursor-pointer
```

**Dark Card**

```
bg-gray-900
border border-gray-800
text-white
[Title]: text-white
[Description]: text-gray-400
```

**Gradient Card**

```
bg-gradient-to-br from-gray-50 to-white
border border-gray-200
```

---

## 🧭 Navigation Component

### Anatomy

```
[Logo] [────────Space────────] [Nav Items] [CTA Button]
```

### Detailed Specifications

#### Dimensions

- **Height**: 64px (fixed)
- **Padding Horizontal**: 24px (mobile), 32px (desktop)
- **Logo Height**: 32px
- **Nav Item Height**: 64px (full height for click target)

#### Layout Rules

**Desktop (≥1024px)**

- Logo: Flex start
- Nav Items: Centered with 32px gaps
- CTA: Flex end
- All items: Horizontal alignment

**Mobile (<1024px)**

- Logo: Flex start
- Hamburger: Flex end
- Nav Items: Hidden (drawer)
- Drawer: Full width, below navbar

#### Navigation States

**Default Link**

- Color: Gray-600
- Weight: 500
- Size: 14px

**Hover Link**

- Color: Gray-950
- Transition: 150ms ease-in-out

**Active Link**

- Color: Gray-950
- Weight: 600
- Border Bottom: 2px solid Gray-950 (optional)

**Mobile Drawer**

- Background: White
- Border Top: 1px solid Gray-200
- Animation: Slide down 200ms ease-out
- Backdrop: Black/20 with blur

---

## 📄 Layout Container

### Specifications

#### Widths

- **Base**: 100% width
- **Max Width**: 1152px (6xl)
- **Padding Mobile**: 24px left/right
- **Padding Desktop**: 32px left/right

#### Breakpoint Behavior

```
< 640px:  px-6 (24px)
≥ 640px:  px-6 (24px)
≥ 768px:  px-8 (32px)
≥ 1024px: px-8 (32px)
≥ 1216px: No padding (max-width constrains)
```

#### Centering Logic

```css
margin-left: auto;
margin-right: auto;
```

---

## 📝 Form Components

### Input Field

#### Anatomy

```
[Label]
┌──────────────────────┐
│ Placeholder Text     │
└──────────────────────┘
[Helper Text/Error]
```

#### Specifications

**Dimensions**

- Height: 40px
- Padding: 12px horizontal, 8px vertical
- Border Radius: 6px
- Border Width: 1px
- Font Size: 14px

**States**

**Default**

```
border-gray-300
bg-white
text-gray-950
placeholder-gray-500
```

**Focus**

```
ring-2 ring-gray-950
border-transparent
outline-none
```

**Error**

```
border-red-600
text-red-900
focus:ring-red-600
```

**Disabled**

```
bg-gray-50
text-gray-500
cursor-not-allowed
```

### Select Dropdown

Same dimensions as Input Field, with:

- Chevron Icon: 16px, right-aligned
- Dropdown Shadow: shadow-lg
- Dropdown Border: 1px solid Gray-200
- Option Hover: bg-gray-50
- Option Selected: bg-gray-100

### Checkbox & Radio

**Dimensions**

- Size: 16px × 16px
- Border Radius: 4px (checkbox), full (radio)
- Border: 1px solid Gray-300

**States**

- Checked: bg-gray-950, white checkmark
- Focus: ring-2 ring-offset-2 ring-gray-950
- Disabled: bg-gray-100

---

## 🎨 Special UI Elements

### Gradient Overlays

#### Fade Overlay (Top)

```
background: linear-gradient(
  to bottom,
  rgba(255,255,255,1) 0%,
  rgba(255,255,255,0.8) 50%,
  rgba(255,255,255,0) 100%
);
height: 120px;
```

#### Fade Overlay (Bottom)

```
background: linear-gradient(
  to top,
  rgba(255,255,255,1) 0%,
  rgba(255,255,255,0.8) 50%,
  rgba(255,255,255,0) 100%
);
height: 120px;
```

### Loading Skeletons

#### Skeleton Base

```
bg-gray-200
animate-pulse
rounded (matching content shape)
```

#### Animation Timing

```
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
animation: pulse 2s ease-in-out infinite;
```

### Tooltips

#### Specifications

- Background: Gray-950
- Text: White
- Padding: 8px 12px
- Border Radius: 6px
- Font Size: 12px
- Arrow Size: 6px
- Shadow: shadow-lg
- Animation: Fade in 150ms

### Badges

#### Specifications

- Padding: 4px horizontal, 2px vertical
- Border Radius: 4px
- Font Size: 12px
- Font Weight: 600
- Letter Spacing: 0.025em

#### Variants

```
Default: bg-gray-100 text-gray-700
Success: bg-green-100 text-green-700
Warning: bg-yellow-100 text-yellow-700
Danger: bg-red-100 text-red-700
Info: bg-blue-100 text-blue-700
```

---

## 🎬 Animation Specifications

### Micro-Interactions

#### Button Press

```
transform: scale(0.98);
transition: transform 75ms ease-in;
```

#### Link Hover

```
color change only
transition: color 150ms ease-in-out;
```

#### Card Hover

```
box-shadow change
transition: box-shadow 200ms ease-in-out;
```

### Page Transitions

#### Fade In

```
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease-out;
```

#### Slide Up

```
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: slideUp 300ms ease-out;
```

#### Scale In

```
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
animation: scaleIn 300ms ease-out;
```

### Stagger Animation

```
Children delay: index * 50ms
Max delay: 300ms
Each child: fadeIn + slideUp
```

---

## 📐 Grid Systems

### Container Grid

```
12-column grid
Gap: 24px (mobile), 32px (desktop)
```

### Card Grid

```
Mobile: 1 column
Tablet (≥640px): 2 columns
Desktop (≥1024px): 3 columns
Large (≥1280px): 4 columns (optional)
Gap: 24px always
```

### Form Grid

```
Mobile: 1 column
Desktop (≥768px): 2 columns for related fields
Gap: 24px horizontal, 16px vertical
```

### Bento Grid

```
Variable columns using CSS Grid
Span options: 1, 2, 3 columns
Aspect ratios: Free, 1:1, 16:9, 4:3
Gap: 16px (mobile), 24px (desktop)
```

---

## 🎯 Interaction Patterns

### Click Targets

- Minimum Size: 44px × 44px (mobile)
- Desktop Minimum: 32px × 32px
- Padding for Small Elements: Extend clickable area

### Focus Management

- Tab Order: Logical top-to-bottom, left-to-right
- Focus Trap: Modals and dropdowns
- Skip Links: Hidden but accessible

### Touch Gestures

- Swipe: Horizontal for carousels
- Pull to Refresh: Optional, 100px threshold
- Long Press: 500ms for context menu

### Scroll Behavior

- Smooth Scroll: 300ms ease-in-out
- Parallax: Transform only, 0.5-0.8 speed ratio
- Sticky Elements: Navbar, sidebars

---

## 🔍 Responsive Scaling

### Font Size Scaling

```
Mobile Base: 16px
Desktop Base: 16px (no change)
Headings: +20% on desktop
Line Height: Consistent ratios
```

### Spacing Scaling

```
Mobile: Base values
Tablet: Base values
Desktop: 1.25× for major spacing
Large Desktop: 1.5× for hero sections
```

### Component Scaling

```
Buttons: Same size all breakpoints
Cards: Padding increases on desktop
Inputs: Same size all breakpoints
Navigation: Height consistent
```

---

## 🌈 Theme Variations

### Light Theme (Default)

- Background: White
- Surface: Gray-50
- Text: Gray-950
- Borders: Gray-200

### Dark Theme

- Background: Gray-950
- Surface: Gray-900
- Text: White
- Borders: Gray-800

### High Contrast

- Background: Pure White
- Text: Pure Black
- Borders: Black
- No shadows, only borders

---

This comprehensive specification ensures pixel-perfect recreation of the Radiant design system across any platform or framework.
