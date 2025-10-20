# Radiant Design System - Visual Patterns & Behaviors

## 🎭 Visual Language Philosophy

The Radiant design system uses **"Invisible Luxury"** - a design approach where sophistication comes from what you DON'T see rather than what you do. Every decision removes rather than adds.

---

## 🖼️ Visual Composition Patterns

### The Rule of Subtle Contrast

Never use maximum contrast except for critical actions. The scale:

- **100% Contrast**: Emergency only (errors, critical warnings)
- **90% Contrast**: Primary actions (main CTA)
- **70% Contrast**: Standard text
- **50% Contrast**: Secondary text
- **30% Contrast**: Muted text
- **10% Contrast**: Decorative elements

### Spatial Rhythm Pattern

```
Hero Section:     128px padding
Major Section:    80px padding
Sub Section:      48px padding
Component Group:  32px spacing
Component:        24px padding
Element Group:    16px spacing
Element:          8px spacing
Micro:           4px adjustments
```

This creates a visual rhythm: 128 → 80 → 48 → 32 → 24 → 16 → 8 → 4

### Visual Weight Distribution

```
Page Layout:
┌────────────────────────┐
│      Light (20%)       │ <- Hero/Header
├────────────────────────┤
│      Heavy (60%)       │ <- Main Content
├────────────────────────┤
│     Medium (20%)       │ <- Footer/CTA
└────────────────────────┘
```

---

## 🎨 Color Application Patterns

### The 60-30-10 Rule

- **60%**: Base (White/Gray-950)
- **30%**: Support (Gray-100/Gray-900)
- **10%**: Accent (Gray-600/Gray-400)
- **<1%**: Color (Blue/Green/Red - emergencies only)

### Depth Through Grayscale

Instead of shadows, create depth with background colors:

**Layer 0 (Base)**

- Light Mode: White (#FFFFFF)
- Dark Mode: Gray-950 (#030712)

**Layer 1 (Raised)**

- Light Mode: Gray-50 (#F9FAFB)
- Dark Mode: Gray-900 (#111827)

**Layer 2 (Elevated)**

- Light Mode: Gray-100 (#F3F4F6)
- Dark Mode: Gray-800 (#1F2937)

**Layer -1 (Recessed)**

- Light Mode: Gray-50 with 0.5 opacity
- Dark Mode: Pure Black (#000000)

### Semantic Color Logic

```javascript
colors = {
  interactive: {
    default: 'inherit', // No color
    hover: 'gray-950', // Darker
    active: 'gray-950', // Darkest
    visited: 'inherit', // No purple!
  },
  status: {
    success: 'green-600', // Only for success messages
    warning: 'yellow-600', // Only for warnings
    error: 'red-600', // Only for errors
    info: 'gray-600', // Default to gray
  },
  text: {
    primary: 'gray-950', // Main content
    secondary: 'gray-600', // Supporting content
    muted: 'gray-500', // De-emphasized
    inverse: 'white', // On dark backgrounds
  },
}
```

---

## 📐 Layout Patterns

### The Golden Container

```
Maximum Width: 1152px (72rem)
Optimal Reading: 672px (42rem) for text blocks
Sidebar Width: 320px (20rem)
Gap: 32px (2rem)
```

### Grid Patterns

#### Marketing Grid (Features)

```
Desktop:  [Card] [Card] [Card]
Tablet:   [Card] [Card]
Mobile:   [Card]

Gap: 24px
Card Min Width: 280px
```

#### Bento Grid (Showcase)

```
Desktop:  [Large--] [Small]
          [Small-1] [Small-2]

Tablet:   [Large---]
          [Small] [Small]

Mobile:   [Large]
          [Small]
          [Small]

Gap: 16px
Aspect Ratios: 2:1 (Large), 1:1 (Small)
```

#### Content Grid (Blog)

```
Desktop:  [────Article────] [Sidebar]
          ← 672px (42rem) → ← 320px →

Tablet:   [────Article────]
          [────Sidebar────]

Mobile:   [Article]
          [Sidebar]
```

### Whitespace Distribution

```
Before Heading:  48px (3rem)
After Heading:   16px (1rem)
Between Paragraphs: 24px (1.5rem)
After Paragraph: 24px (1.5rem)
Before Button:   32px (2rem)
After Section:   80px (5rem)
```

---

## 🎬 Motion Patterns

### The Three-Speed System

**Instant (75ms)**

- Micro feedback (button active state)
- Tooltip appearance
- Focus ring appearance

**Fast (150ms)**

- Hover states
- Small transitions
- Color changes

**Smooth (300ms)**

- Layout changes
- Reveals/Hides
- Page transitions

### Easing Curves Explained

**ease-in-out (default)**

```
Slow → Fast → Slow
Use for: Most transitions
```

**ease-out (decelerate)**

```
Fast → Slow
Use for: Elements entering
Creates: Natural stopping feeling
```

**ease-in (accelerate)**

```
Slow → Fast
Use for: Elements leaving
Creates: Quick exit feeling
```

**cubic-bezier(0.34, 1.56, 0.64, 1) (bounce)**

```
Overshoot → Settle
Use for: Playful feedback
Creates: Delightful feeling
```

### Stagger Patterns

**List Appearance**

```
Item 1: delay-0    (0ms)
Item 2: delay-75   (75ms)
Item 3: delay-150  (150ms)
Item 4: delay-300  (300ms)
Max Delay: 300ms (even for 20+ items)
```

**Grid Appearance**

```
Row-by-row:
Row 1: delay-0
Row 2: delay-150
Row 3: delay-300

Diagonal:
[0ms]  [75ms]  [150ms]
[75ms] [150ms] [225ms]
[150ms][225ms] [300ms]
```

---

## 🔲 Shadow & Elevation System

### Shadow Hierarchy

Shadows are barely visible - they suggest rather than declare elevation.

```css
/* Resting shadows */
shadow-sm:  0 1px 2px rgba(0,0,0,0.05)   /* Cards */
shadow:     0 1px 3px rgba(0,0,0,0.1)    /* Dropdowns */
shadow-md:  0 4px 6px rgba(0,0,0,0.1)    /* Hover state */
shadow-lg:  0 10px 15px rgba(0,0,0,0.1)  /* Modals */
shadow-xl:  0 20px 25px rgba(0,0,0,0.1)  /* Popovers */

/* Colored shadows (rare) */
shadow-gray: 0 4px 6px rgba(107,114,128,0.1)
shadow-blue: 0 4px 6px rgba(37,99,235,0.1)
```

### Elevation Logic

```
Level 0: No shadow (inline elements)
Level 1: shadow-sm (cards, inputs)
Level 2: shadow (dropdowns, tooltips)
Level 3: shadow-md (hover states)
Level 4: shadow-lg (modals, dialogs)
Level 5: shadow-xl (notifications)
```

---

## 🎯 Interactive Patterns

### Click Affordance Hierarchy

**Primary Affordance** (Most clickable)

- Filled button
- High contrast
- Pill shape
- Shadow on hover

**Secondary Affordance**

- Outlined button
- Medium contrast
- Rounded corners
- Background on hover

**Tertiary Affordance**

- Text only
- Underline on hover
- Color change
- No background

**Invisible Affordance**

- No visual indication
- Cursor change only
- Used for cards/rows

### Hover State Patterns

**Elevation Change**

```css
/* Default */
shadow-sm
/* Hover */
shadow-md
transition: box-shadow 200ms ease-in-out
```

**Color Darken**

```css
/* Default */
bg-gray-950
/* Hover */
bg-gray-800
transition: background-color 150ms ease-in-out
```

**Reveal Information**

```css
/* Default */
opacity-0
/* Hover */
opacity-100
transition: opacity 200ms ease-in-out
```

**Transform**

```css
/* Default */
transform: translateY(0)
/* Hover */
transform: translateY(-2px)
transition: transform 200ms ease-out
```

### Focus State Patterns

Always use ring-based focus, never outline:

**Standard Focus**

```css
ring-2
ring-gray-950
ring-offset-2
ring-offset-white
```

**Error Focus**

```css
ring-2
ring-red-600
ring-offset-2
ring-offset-white
```

**Dark Mode Focus**

```css
ring-2
ring-white
ring-offset-2
ring-offset-gray-950
```

---

## 📱 Responsive Behavior Patterns

### Content Reflow Strategy

**Desktop → Tablet**

- 3 columns → 2 columns
- Side-by-side → Stacked
- Horizontal nav → Hamburger menu

**Tablet → Mobile**

- 2 columns → 1 column
- Reduced padding (32px → 24px)
- Hidden decorative elements

### Touch Target Optimization

**Mobile Requirements**

```
Minimum Size: 44px × 44px
Padding Extension: 12px invisible padding
Spacing Between: 8px minimum
```

**Desktop Requirements**

```
Minimum Size: 32px × 32px
Padding Extension: 8px invisible padding
Spacing Between: 4px minimum
```

### Breakpoint Transition Patterns

**Hard Cut** (Instant change)

```css
/* Mobile */
display: none;
/* Desktop */
@media (min-width: 1024px) {
  display: block;
}
```

**Soft Transition** (Gradual)

```css
/* All sizes */
padding: clamp(24px, 5vw, 48px);
font-size: clamp(36px, 8vw, 60px);
```

---

## 🌟 Special Effects Patterns

### Gradient Patterns

**Subtle Surface Gradient**

```css
background: linear-gradient(135deg, white 0%, #f9fafb 100%);
```

**Text Gradient (Rare)**

```css
background: linear-gradient(135deg, #111827 0%, #4b5563 100%);
-webkit-background-clip: text;
color: transparent;
```

**Overlay Gradient**

```css
background: linear-gradient(
  to bottom,
  transparent 0%,
  rgba(0, 0, 0, 0.5) 50%,
  rgba(0, 0, 0, 0.8) 100%
);
```

### Blur Effects

**Background Blur**

```css
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
background: rgba(255, 255, 255, 0.9);
```

**Content Blur (Loading)**

```css
filter: blur(4px);
transition: filter 300ms ease-out;
```

### Masking Patterns

**Fade Edges**

```css
mask-image: linear-gradient(
  to right,
  transparent,
  black 10%,
  black 90%,
  transparent
);
```

**Circle Mask**

```css
clip-path: circle(50% at center);
```

---

## 🎯 Micro-Interaction Patterns

### Loading States

**Skeleton Screen**

```
1. Match exact layout
2. Use Gray-200 backgrounds
3. Animate with pulse
4. Duration: 2s
5. Replace atomically
```

**Progress Indication**

```
1. Linear progress bar
2. Height: 2px
3. Color: Gray-950
4. Background: Gray-200
5. Animate: width transition
```

**Spinner**

```
1. Size: 16px (small), 24px (medium), 32px (large)
2. Border: 2px Gray-200
3. Border-top: 2px Gray-950
4. Animation: spin 1s linear infinite
```

### Feedback Patterns

**Success Feedback**

```
1. Green-600 accent
2. Checkmark icon
3. Fade in 150ms
4. Auto-dismiss 3000ms
5. Fade out 150ms
```

**Error Feedback**

```
1. Red-600 accent
2. X icon
3. Shake animation 300ms
4. Requires dismissal
5. Focus trap enabled
```

### Transition Patterns

**Page Transition**

```
Exit: fade out 150ms ease-in
Enter: fade in 300ms ease-out + slide up 20px
```

**Modal Appearance**

```
Backdrop: fade in 200ms
Content: scale from 0.95 to 1 + fade in 300ms ease-out
```

**Accordion Expansion**

```
Height: 0 to auto over 200ms ease-out
Content: fade in starting at 100ms
```

---

## 🔧 Implementation Guidelines

### CSS Architecture

```
1. Base styles (reset, variables)
2. Layout utilities
3. Component styles
4. State modifiers
5. Responsive overrides
6. Animation utilities
```

### Performance Constraints

```
- Max 3 font weights
- Max 2 font families
- Single color palette
- CSS transforms only for animation
- GPU-accelerated properties only
- Reduce paint operations
```

### Accessibility Requirements

```
- WCAG AA contrast minimum
- Focus visible always
- Keyboard navigable
- Screen reader optimized
- Reduced motion respect
- Touch target compliance
```

---

This pattern documentation ensures consistent implementation of the Radiant design system's visual language across any platform or technology.
