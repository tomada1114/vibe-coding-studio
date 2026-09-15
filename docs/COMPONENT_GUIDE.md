# Component Guide - Vibe Coding Studio

## Overview

This guide provides detailed documentation for all React components in Vibe Coding Studio, including usage examples, props, and best practices.

## Component Categories

1. [Layout Components](#layout-components)
2. [UI Components](#ui-components)
3. [Animation Components](#animation-components)
4. [Visual Components](#visual-components)
5. [Typography Components](#typography-components)
6. [Form Components](#form-components)

## Layout Components

### Container

A responsive container that provides consistent padding and max-width constraints.

```tsx
import { Container } from '@/components/container'

;<Container className="py-8">{/* Your content */}</Container>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Child elements |

**CSS Classes Applied:**

- `mx-auto`: Centers the container
- `max-w-7xl`: Maximum width constraint
- `px-6 lg:px-8`: Responsive padding

---

### Navbar

Main navigation component with responsive mobile menu.

```tsx
import { Navbar } from '@/components/navbar'

;<Navbar />
```

**Features:**

- Mobile-responsive hamburger menu
- Active route highlighting with `aria-current`
- Smooth transitions
- Logo integration
- Dark mode support
- Accessible logout action for authenticated sessions

**Navigation Links:**
Default links are defined in the component:

```typescript
const publicLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/company', label: 'Company' },
]

const authLinks = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]
```

---

### Footer

Site footer with multi-column layout and social links.

```tsx
import { Footer } from '@/components/footer'

;<Footer />
```

**Sections:**

- Company information
- Product links
- Resources
- Social media links

**Customization:**
Modify the `footerLinks` array in the component to update links.

## UI Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/button'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Link button
<Button href="/page" variant="secondary">
  Go to page
</Button>

// With onClick handler
<Button onClick={handleClick} variant="outline">
  Action
</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `href` | `string` | - | Link URL (renders as Link) |
| `onClick` | `() => void` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

**Sizes:**

- `sm`: `px-3 py-2 text-sm`
- `md`: `px-4 py-2 text-base`
- `lg`: `px-5 py-3 text-lg`

**Variants:**

```css
/* Primary */
rounded-full bg-gray-950 text-white hover:bg-gray-800

/* Secondary */
rounded-full bg-white/15 text-gray-950 hover:bg-white/20

/* Outline */
rounded-lg border border-transparent text-gray-950 hover:bg-gray-50
```

---

### BentoCard

Interactive card component with animation and gradient effects.

```tsx
import { BentoCard } from '@/components/bento-card'

;<BentoCard
  dark={false}
  eyebrow="Feature"
  title="Amazing Feature"
  description="This feature will revolutionize your workflow."
  graphic={<img src="/feature.png" alt="Feature" />}
  fade={['top']}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark` | `boolean` | `false` | Enable dark mode styling |
| `className` | `string` | `''` | Additional CSS classes |
| `eyebrow` | `ReactNode` | - | Small heading text |
| `title` | `ReactNode` | - | Main card title |
| `description` | `ReactNode` | - | Card description |
| `graphic` | `ReactNode` | - | Visual component (300px height) |
| `fade` | `('top' \| 'bottom')[]` | `[]` | Gradient fade directions |

**Animation:**

- Hover state triggers animation via Framer Motion
- Smooth transitions on all interactive elements

---

### Link

Enhanced Next.js Link component with consistent styling.

```tsx
import { Link } from '@/components/link'

;<Link href="/page" className="text-blue-600">
  Click here
</Link>
```

**Props:**
Inherits all props from Next.js Link component.

## Animation Components

### AnimatedNumber

Animated counter that counts up to a target value.

```tsx
import { AnimatedNumber } from '@/components/animated-number'

;<AnimatedNumber
  value={1000000}
  duration={2000}
  format={n => n.toLocaleString()}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Target number to count to |
| `duration` | `number` | `2000` | Animation duration in ms |
| `format` | `(n: number) => string` | `(n) => n.toString()` | Number formatting function |
| `className` | `string` | `''` | Additional CSS classes |

**Usage Examples:**

```tsx
// Currency formatting
<AnimatedNumber
  value={99.99}
  format={(n) => `$${n.toFixed(2)}`}
/>

// Percentage
<AnimatedNumber
  value={85}
  format={(n) => `${n}%`}
/>

// Large numbers with commas
<AnimatedNumber
  value={1234567}
  format={(n) => n.toLocaleString('en-US')}
/>
```

## Visual Components

### Screenshot

Display screenshots with device frame styling.

```tsx
import { Screenshot } from '@/components/screenshot'

;<Screenshot
  src="/app-screenshot.png"
  alt="App dashboard"
  width={1920}
  height={1080}
  priority={true}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Alt text for accessibility |
| `width` | `number` | - | Image width |
| `height` | `number` | - | Image height |
| `className` | `string` | `''` | Additional CSS classes |
| `priority` | `boolean` | `false` | Next.js priority loading |

**Styling:**

- Adds device frame border
- Shadow effects for depth
- Responsive sizing

---

### Logo

Main brand logo component with multiple variants.

```tsx
import { Logo } from '@/components/logo'

;<Logo className="h-8 w-auto" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Size and positioning classes |

---

### LogoCloud

Display grid of partner/client logos.

```tsx
import { LogoCloud } from '@/components/logo-cloud'

;<LogoCloud
  logos={[
    { src: '/logo1.svg', alt: 'Company 1' },
    { src: '/logo2.svg', alt: 'Company 2' },
  ]}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `Array<{src: string, alt: string}>` | - | Logo configurations |
| `columns` | `number` | `4` | Number of grid columns |
| `className` | `string` | `''` | Additional CSS classes |

---

### LogoCluster

Animated arrangement of logos with hover effects.

```tsx
import { LogoCluster } from '@/components/logo-cluster'

;<LogoCluster />
```

**Features:**

- 3D perspective transformations
- Hover animations
- Responsive positioning

---

### LogoTimeline

Timeline display with logo markers.

```tsx
import { LogoTimeline } from '@/components/logo-timeline'

;<LogoTimeline
  events={[
    { year: 2020, title: 'Founded', logo: <Logo /> },
    { year: 2021, title: 'Series A', logo: <Logo /> },
  ]}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `Array<TimelineEvent>` | - | Timeline events |

**TimelineEvent Type:**

```typescript
interface TimelineEvent {
  year: number
  title: string
  description?: string
  logo: ReactNode
}
```

---

### LinkedAvatars

Overlapping avatar group display.

```tsx
import { LinkedAvatars } from '@/components/linked-avatars'

;<LinkedAvatars
  avatars={[
    { src: '/avatar1.jpg', alt: 'User 1' },
    { src: '/avatar2.jpg', alt: 'User 2' },
  ]}
  size="md"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatars` | `Array<{src: string, alt: string}>` | - | Avatar configurations |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar size |
| `max` | `number` | `5` | Maximum avatars to show |

---

### Gradient

Dynamic gradient background component.

```tsx
import { Gradient } from '@/components/gradient'

;<Gradient
  type="radial"
  colors={['blue', 'purple']}
  className="absolute inset-0"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'linear' \| 'radial'` | `'linear'` | Gradient type |
| `colors` | `string[]` | - | Gradient colors |
| `angle` | `number` | `45` | Gradient angle (linear only) |
| `className` | `string` | `''` | Additional CSS classes |

---

### PlusGrid

Background grid pattern for visual enhancement.

```tsx
import { PlusGrid } from '@/components/plus-grid'

;<div className="relative">
  <PlusGrid className="absolute inset-0 opacity-10" />
  {/* Content on top */}
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `color` | `string` | `'gray'` | Grid line color |
| `size` | `number` | `32` | Grid cell size in pixels |

---

### Map

Interactive map component (placeholder for actual implementation).

```tsx
import { Map } from '@/components/map'

;<Map
  center={{ lat: 40.7128, lng: -74.006 }}
  zoom={12}
  markers={[{ position: { lat: 40.7128, lng: -74.006 }, label: 'NYC' }]}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `{lat: number, lng: number}` | - | Map center coordinates |
| `zoom` | `number` | `10` | Zoom level |
| `markers` | `Array<Marker>` | `[]` | Map markers |

## Typography Components

### Text Components

Typography components are imported from `@/components/text`:

```tsx
import { Heading, Subheading, Text, Lead } from '@/components/text'
```

### Heading

Main heading component with responsive sizing.

```tsx
<Heading as="h1" size="xl">
  Page Title
</Heading>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | HTML element |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Text size |
| `className` | `string` | `''` | Additional CSS classes |
| `dark` | `boolean` | `false` | Dark mode variant |

### Subheading

Secondary heading for sections.

```tsx
<Subheading as="h2" dark={false}>
  Section Title
</Subheading>
```

### Text

Body text component with consistent styling.

```tsx
<Text className="mt-4">Your paragraph content here.</Text>
```

### Lead

Emphasized introductory text.

```tsx
<Lead>This is an important introduction that sets the context.</Lead>
```

## Form Components

### Testimonials

Customer testimonial display component.

```tsx
import { Testimonials } from '@/components/testimonials'

;<Testimonials
  testimonials={[
    {
      content: 'This product changed our business.',
      author: 'Jane Doe',
      role: 'CEO',
      company: 'TechCorp',
      avatar: '/avatar.jpg',
    },
  ]}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `Array<Testimonial>` | - | Testimonial data |

**Testimonial Type:**

```typescript
interface Testimonial {
  content: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}
```

## Best Practices

### Performance

1. **Lazy Loading**: Use dynamic imports for heavy components

```tsx
const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <Skeleton />,
})
```

2. **Image Optimization**: Always specify width and height for images

```tsx
<Screenshot
  src="/image.png"
  alt="Description"
  width={1920}
  height={1080}
  priority={false} // Only for above-fold images
/>
```

3. **Animation Performance**: Use CSS transforms over position changes

```tsx
// Good
transform: translateX(100px)

// Avoid
left: 100px
```

### Accessibility

1. **Semantic HTML**: Use appropriate elements

```tsx
// Use semantic elements
<nav>, <main>, <article>, <section>

// Add ARIA labels where needed
<button aria-label="Close menu">
```

2. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible

```tsx
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
```

3. **Alt Text**: Always provide meaningful alt text

```tsx
<img src="/chart.png" alt="Sales growth chart showing 50% increase" />
```

### Styling

1. **Tailwind Classes**: Use utility classes over inline styles

```tsx
// Good
<div className="mt-4 p-6 bg-white rounded-lg">

// Avoid
<div style={{ marginTop: '1rem', padding: '1.5rem' }}>
```

2. **Responsive Design**: Use responsive utilities

```tsx
<div className="text-sm md:text-base lg:text-lg">Responsive text</div>
```

3. **Dark Mode**: Support dark mode where appropriate

```tsx
<div className="bg-white dark:bg-gray-800">Dark mode compatible</div>
```

### Component Composition

1. **Compound Components**: Create flexible component APIs

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

2. **Render Props**: For dynamic content rendering

```tsx
<DataProvider
  render={data => (
    <div>
      {data.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )}
/>
```

3. **Hooks**: Extract logic into custom hooks

```tsx
function useAnimatedValue(target, duration) {
  const [value, setValue] = useState(0)
  // Animation logic
  return value
}
```

## Component Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
```

### Integration Tests

```tsx
import { render, fireEvent } from '@testing-library/react'
import { AnimatedNumber } from '@/components/animated-number'

test('animates to target value', async () => {
  const { getByText } = render(<AnimatedNumber value={100} duration={100} />)

  await waitFor(() => {
    expect(getByText('100')).toBeInTheDocument()
  })
})
```

### Visual Tests (Storybook)

```tsx
export default {
  title: 'Components/Button',
  component: Button,
}

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}
```

---

_For more examples and advanced usage, refer to the component source files in `/src/components/`_
