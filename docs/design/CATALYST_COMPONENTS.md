# Catalyst UI Components Documentation

> **注記**: 本ドキュメントは旧デザイン（Radiant / Catalyst）向けです。デザインシステムは
> [Geist Grid](./DESIGN_SYSTEM.md) へ移行中であり、Geist Grid への移行完了後に本ドキュメントは
> 削除予定です。**新規ページでは Catalyst コンポーネントを使用しないでください。**

## Overview

This document provides comprehensive documentation for all Catalyst UI components that have been integrated into the project. These components follow a consistent design system with excellent TypeScript support, accessibility features, and dark mode compatibility.

## Component Index

### Button Components

#### CatalystButton

A versatile button component with multiple style variants and color options.

**Import:**

```tsx
import { CatalystButton } from '@/components/catalyst-button'
```

**Props:**

- `color?: 'dark/zinc' | 'light' | 'dark/white' | 'dark' | 'white' | 'zinc' | 'indigo' | 'cyan' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'sky' | 'blue' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'` - Button color variant
- `outline?: boolean` - Render as outline button
- `plain?: boolean` - Render as plain button (no background)
- `href?: string` - If provided, renders as a link
- `disabled?: boolean` - Disable the button
- `className?: string` - Additional CSS classes
- `onClick?: () => void` - Click handler
- All standard button/link HTML attributes

**Examples:**

```tsx
<CatalystButton>Default Button</CatalystButton>
<CatalystButton color="indigo">Indigo Button</CatalystButton>
<CatalystButton outline>Outline Button</CatalystButton>
<CatalystButton plain>Plain Button</CatalystButton>
<CatalystButton href="/link">Link Button</CatalystButton>
```

### Form Input Components

#### Input

Standard text input field with built-in styling and dark mode support.

**Import:**

```tsx
import { Input } from '@/components/input'
```

**Props:**

- `type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'` - Input type
- `placeholder?: string` - Placeholder text
- `value?: string` - Controlled value
- `onChange?: (e: ChangeEvent<HTMLInputElement>) => void` - Change handler
- `disabled?: boolean` - Disable the input
- `required?: boolean` - Mark as required
- `autoComplete?: string` - Autocomplete hint
- `className?: string` - Additional CSS classes
- All standard input HTML attributes

**Example:**

```tsx
<Input
  type="email"
  placeholder="Enter email..."
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

#### Textarea

Multi-line text input with auto-resize capability.

**Import:**

```tsx
import { Textarea } from '@/components/textarea'
```

**Props:**

- `placeholder?: string` - Placeholder text
- `value?: string` - Controlled value
- `onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void` - Change handler
- `rows?: number` - Number of visible rows
- `disabled?: boolean` - Disable the textarea
- `required?: boolean` - Mark as required
- `className?: string` - Additional CSS classes
- All standard textarea HTML attributes

#### Select

Styled select dropdown component.

**Import:**

```tsx
import { Select } from '@/components/select'
```

**Props:**

- `value?: string` - Selected value
- `onChange?: (e: ChangeEvent<HTMLSelectElement>) => void` - Change handler
- `disabled?: boolean` - Disable the select
- `required?: boolean` - Mark as required
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Option elements
- All standard select HTML attributes

**Example:**

```tsx
<Select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

### Selection Controls

#### Checkbox

Checkbox input with custom styling.

**Import:**

```tsx
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
```

**Props (Checkbox):**

- `checked?: boolean` - Controlled checked state
- `defaultChecked?: boolean` - Default checked state
- `onChange?: (checked: boolean) => void` - Change handler
- `disabled?: boolean` - Disable the checkbox
- `name?: string` - Input name
- `value?: string` - Input value
- `className?: string` - Additional CSS classes

**Props (CheckboxField):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Checkbox and label content

**Props (CheckboxGroup):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Multiple CheckboxField components

**Example:**

```tsx
<CheckboxGroup>
  <CheckboxField>
    <Checkbox name="option1" />
    <span>Option 1</span>
  </CheckboxField>
  <CheckboxField>
    <Checkbox name="option2" />
    <span>Option 2</span>
  </CheckboxField>
</CheckboxGroup>
```

#### Radio

Radio button input with custom styling.

**Import:**

```tsx
import { Radio, RadioField, RadioGroup } from '@/components/radio'
```

**Props (Radio):**

- `value?: string` - Radio value
- `disabled?: boolean` - Disable the radio
- `className?: string` - Additional CSS classes

**Props (RadioField):**

- `value: string` - Field value
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Radio and label content

**Props (RadioGroup):**

- `value?: string` - Selected value
- `onChange?: (value: string) => void` - Change handler
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Multiple RadioField components

**Example:**

```tsx
<RadioGroup value={selected} onChange={setSelected}>
  <RadioField value="option1">
    <Radio />
    <span>Option 1</span>
  </RadioField>
  <RadioField value="option2">
    <Radio />
    <span>Option 2</span>
  </RadioField>
</RadioGroup>
```

#### Switch

Toggle switch component.

**Import:**

```tsx
import { Switch, SwitchField } from '@/components/switch'
```

**Props (Switch):**

- `checked?: boolean` - Controlled checked state
- `onChange?: (checked: boolean) => void` - Change handler
- `disabled?: boolean` - Disable the switch
- `className?: string` - Additional CSS classes

**Props (SwitchField):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Switch and label content

**Example:**

```tsx
<SwitchField>
  <Switch checked={enabled} onChange={setEnabled} />
  <span>Enable notifications</span>
</SwitchField>
```

### Display Components

#### Badge

Small label component for status indicators or tags.

**Import:**

```tsx
import { Badge } from '@/components/badge'
```

**Props:**

- `color?: 'zinc' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'` - Badge color
- `href?: string` - If provided, renders as a link
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Badge content

**Example:**

```tsx
<Badge color="green">Active</Badge>
<Badge color="red">Error</Badge>
<Badge href="/status">Status</Badge>
```

#### Avatar

User avatar component with image or initials support.

**Import:**

```tsx
import { Avatar } from '@/components/avatar'
```

**Props:**

- `src?: string` - Image source URL
- `initials?: string` - Text initials if no image
- `alt?: string` - Alt text for image
- `square?: boolean` - Square shape instead of circle
- `className?: string` - Additional CSS classes

**Example:**

```tsx
<Avatar src="/user.jpg" alt="User" />
<Avatar initials="JD" />
<Avatar square src="/logo.jpg" />
```

#### Alert

Alert message component with title, description, and actions.

**Import:**

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertActions,
} from '@/components/alert'
```

**Props (Alert):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Alert content

**Components:**

- `AlertTitle` - Alert title text
- `AlertDescription` - Brief alert description
- `AlertBody` - Main alert content
- `AlertActions` - Action buttons container

**Example:**

```tsx
<Alert>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
  <AlertBody>The document has been successfully updated.</AlertBody>
  <AlertActions>
    <CatalystButton plain>Dismiss</CatalystButton>
    <CatalystButton>View Changes</CatalystButton>
  </AlertActions>
</Alert>
```

#### Divider

Horizontal line separator.

**Import:**

```tsx
import { Divider } from '@/components/divider'
```

**Props:**

- `soft?: boolean` - Use softer color
- `className?: string` - Additional CSS classes

**Example:**

```tsx
<Divider />
<Divider soft />
```

### Typography Components

#### Text Components

Various text styling components.

**Import:**

```tsx
import { Text, TextLink, Strong, Code } from '@/components/text'
```

**Components:**

- `Text` - Basic paragraph text
- `TextLink` - Styled link within text
- `Strong` - Bold/strong text
- `Code` - Inline code formatting

**Props (all):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Text content

**Example:**

```tsx
<Text>
  This is regular text with a <TextLink href="#">link</TextLink>, some{' '}
  <Strong>bold text</Strong>, and <Code>inline code</Code>.
</Text>
```

#### Heading

Section heading component.

**Import:**

```tsx
import { Heading } from '@/components/heading'
```

**Props:**

- `level?: 1 | 2 | 3 | 4 | 5 | 6` - Heading level
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Heading text

### Interactive Components

#### Dialog

Modal dialog component.

**Import:**

```tsx
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from '@/components/dialog'
```

**Props (Dialog):**

- `open: boolean` - Dialog visibility state
- `onClose: (open: boolean) => void` - Close handler
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'` - Dialog size
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Dialog content

**Components:**

- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description
- `DialogBody` - Main dialog content
- `DialogActions` - Action buttons container

**Example:**

```tsx
<Dialog open={isOpen} onClose={setIsOpen}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogDescription>Are you sure you want to proceed?</DialogDescription>
  <DialogBody>This action cannot be undone.</DialogBody>
  <DialogActions>
    <CatalystButton plain onClick={() => setIsOpen(false)}>
      Cancel
    </CatalystButton>
    <CatalystButton onClick={handleConfirm}>Confirm</CatalystButton>
  </DialogActions>
</Dialog>
```

#### Dropdown

Dropdown menu component.

**Import:**

```tsx
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
} from '@/components/dropdown'
```

**Props (Dropdown):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Dropdown content

**Components:**

- `DropdownButton` - Trigger button
- `DropdownMenu` - Menu container
- `DropdownItem` - Menu item
- `DropdownDivider` - Menu separator

**Example:**

```tsx
<Dropdown>
  <DropdownButton>Options</DropdownButton>
  <DropdownMenu>
    <DropdownItem href="/edit">Edit</DropdownItem>
    <DropdownItem href="/duplicate">Duplicate</DropdownItem>
    <DropdownDivider />
    <DropdownItem href="/delete">Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

### List Components

#### Listbox

Selectable list component.

**Import:**

```tsx
import { Listbox, ListboxOption } from '@/components/listbox'
```

**Props (Listbox):**

- `value?: string | string[]` - Selected value(s)
- `onChange?: (value: string | string[]) => void` - Change handler
- `multiple?: boolean` - Allow multiple selection
- `className?: string` - Additional CSS classes
- `children: ReactNode` - ListboxOption elements

**Props (ListboxOption):**

- `value: string` - Option value
- `disabled?: boolean` - Disable option
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Option content

#### Combobox

Searchable dropdown list.

**Import:**

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@/components/combobox'
```

**Props (Combobox):**

- `value?: string` - Selected value
- `onChange?: (value: string) => void` - Change handler
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Combobox content

**Components:**

- `ComboboxInput` - Search input field
- `ComboboxOptions` - Options container
- `ComboboxOption` - Individual option

#### DescriptionList

Key-value pair list display.

**Import:**

```tsx
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from '@/components/description-list'
```

**Props (all):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Content

**Example:**

```tsx
<DescriptionList>
  <DescriptionTerm>Name</DescriptionTerm>
  <DescriptionDetails>John Doe</DescriptionDetails>

  <DescriptionTerm>Email</DescriptionTerm>
  <DescriptionDetails>john@example.com</DescriptionDetails>
</DescriptionList>
```

### Data Display

#### Table

Data table component with sorting and selection support.

**Import:**

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/table'
```

**Props (Table):**

- `bleed?: boolean` - Remove padding
- `dense?: boolean` - Compact spacing
- `grid?: boolean` - Show grid lines
- `striped?: boolean` - Alternate row colors
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Table content

**Example:**

```tsx
<Table striped>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
      <TableHeader>Role</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Pagination

Page navigation component.

**Import:**

```tsx
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationPage,
} from '@/components/pagination'
```

**Props (Pagination):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Pagination content

**Components:**

- `PaginationPrevious` - Previous page button
- `PaginationNext` - Next page button
- `PaginationList` - Page numbers container
- `PaginationPage` - Individual page number

**Example:**

```tsx
<Pagination>
  <PaginationPrevious href="?page=1" />
  <PaginationList>
    <PaginationPage href="?page=1">1</PaginationPage>
    <PaginationPage href="?page=2" current>
      2
    </PaginationPage>
    <PaginationPage href="?page=3">3</PaginationPage>
  </PaginationList>
  <PaginationNext href="?page=3" />
</Pagination>
```

### Layout Components

#### Fieldset

Form field grouping component.

**Import:**

```tsx
import {
  Fieldset,
  Legend,
  FieldGroup,
  Field,
  Label,
  Description,
  ErrorMessage,
} from '@/components/fieldset'
```

**Components:**

- `Fieldset` - Container for related form fields
- `Legend` - Fieldset title
- `FieldGroup` - Group of fields
- `Field` - Individual field container
- `Label` - Field label
- `Description` - Field help text
- `ErrorMessage` - Field error message

**Example:**

```tsx
<Fieldset>
  <Legend>Personal Information</Legend>
  <FieldGroup>
    <Field>
      <Label>Name</Label>
      <Input />
      <Description>Enter your full name</Description>
    </Field>
    <Field>
      <Label>Email</Label>
      <Input type="email" />
      <ErrorMessage>Email is required</ErrorMessage>
    </Field>
  </FieldGroup>
</Fieldset>
```

#### SidebarLayout

Layout with sidebar navigation.

**Import:**

```tsx
import { SidebarLayout } from '@/components/sidebar-layout'
```

**Props:**

- `navbar?: ReactNode` - Top navigation bar
- `sidebar?: ReactNode` - Sidebar content
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Main content

#### StackedLayout

Vertically stacked layout.

**Import:**

```tsx
import { StackedLayout } from '@/components/stacked-layout'
```

**Props:**

- `navbar?: ReactNode` - Top navigation
- `sidebar?: ReactNode` - Optional sidebar
- `className?: string` - Additional CSS classes
- `children: ReactNode` - Main content

#### Sidebar

Sidebar navigation component.

**Import:**

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
} from '@/components/sidebar'
```

**Components:**

- `Sidebar` - Sidebar container
- `SidebarHeader` - Sidebar header
- `SidebarBody` - Sidebar main content
- `SidebarFooter` - Sidebar footer
- `SidebarSection` - Section within sidebar
- `SidebarItem` - Navigation item

### Navigation Components

#### CatalystNavbar

Navigation bar components.

**Import:**

```tsx
import {
  CatalystNavbar,
  CatalystNavbarSection,
  CatalystNavbarItem,
  CatalystNavbarSpacer,
  CatalystNavbarDivider,
  CatalystNavbarLabel,
} from '@/components/catalyst-navbar'
```

**Props (CatalystNavbar):**

- `className?: string` - Additional CSS classes
- `children: ReactNode` - Navbar content

**Components:**

- `CatalystNavbarSection` - Group of navbar items
- `CatalystNavbarItem` - Individual nav item
- `CatalystNavbarSpacer` - Flexible spacer
- `CatalystNavbarDivider` - Vertical separator
- `CatalystNavbarLabel` - Text label

**Example:**

```tsx
<CatalystNavbar>
  <CatalystNavbarSection>
    <CatalystNavbarItem href="/" current>
      <CatalystNavbarLabel>Home</CatalystNavbarLabel>
    </CatalystNavbarItem>
    <CatalystNavbarItem href="/about">
      <CatalystNavbarLabel>About</CatalystNavbarLabel>
    </CatalystNavbarItem>
  </CatalystNavbarSection>
  <CatalystNavbarSpacer />
  <CatalystNavbarSection>
    <CatalystNavbarItem href="/profile">
      <CatalystNavbarLabel>Profile</CatalystNavbarLabel>
    </CatalystNavbarItem>
  </CatalystNavbarSection>
</CatalystNavbar>
```

## Common Features

### Dark Mode Support

All components automatically adapt to dark mode using Tailwind's dark mode classes. No additional configuration needed.

### Accessibility

- All interactive components support keyboard navigation
- Proper ARIA attributes and roles
- Focus management for dialogs and dropdowns
- Screen reader friendly

### TypeScript Support

All components are fully typed with TypeScript, providing:

- IntelliSense support in IDEs
- Type safety for props
- Autocompletion for component imports

### Responsive Design

Components are responsive by default with:

- Mobile-first approach
- Touch-friendly interaction areas
- Adaptive sizing and spacing

## Testing

All components have comprehensive test coverage including:

- Unit tests with Jest and React Testing Library
- E2E tests with Playwright
- Visual regression testing
- Accessibility testing

## Best Practices

1. **Import only what you need** - Components are individually exportable
2. **Use semantic HTML** - Components render appropriate HTML elements
3. **Provide accessible labels** - Always include proper labels for form controls
4. **Handle loading and error states** - Implement proper user feedback
5. **Follow the color system** - Use provided color variants for consistency

## Migration Guide

If migrating from other UI libraries:

1. **From Material-UI**: Replace `Button` with `CatalystButton`, `TextField` with `Input`
2. **From Ant Design**: Replace `Button` with `CatalystButton`, `Input` with `Input`, `Switch` with `Switch`
3. **From Bootstrap**: Replace `btn` classes with `CatalystButton` component

## Examples

See the demo page at `/catalyst-demo` for live examples of all components.

## Support

For issues or questions about Catalyst components:

1. Check this documentation
2. Review the component source code
3. Check existing tests for usage examples
4. Refer to the Tailwind CSS documentation for styling customization
