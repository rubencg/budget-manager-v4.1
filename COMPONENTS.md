# Component Documentation

## UI Components (`/src/components/ui/`)

### Card

Container component with multiple variants for different use cases.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'elevated';
  className?: string;
  onClick?: () => void;
}
```

**Usage:**
```tsx
import { Card } from './components/ui/Card';

<Card variant="default">
  Content goes here
</Card>

<Card variant="interactive" onClick={handleClick}>
  Interactive card with hover effects
</Card>

<Card variant="elevated">
  Elevated card with border and stronger shadow
</Card>
```

**Styling:**
- Default: Basic card with shadow
- Interactive: Hover effects (lift and shadow increase)
- Elevated: Border and larger padding

---

### Button

Multi-variant button component with icon support.

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}
```

**Usage:**
```tsx
import { Button } from './components/ui/Button';

<Button variant="primary">
  Primary Action
</Button>

<Button variant="secondary" fullWidth>
  Secondary Action
</Button>

<Button variant="icon">
  🔔
</Button>

<Button icon={<Icon />}>
  Button with icon
</Button>
```

**Variants:**
- Primary: Gradient background (cyan)
- Secondary: Outlined style
- Icon: Square icon button

---

### StatusBadge

Color-coded status indicator badges.

**Props:**
```typescript
interface StatusBadgeProps {
  variant: 'waiting' | 'success' | 'due_date' | 'disabled';
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { StatusBadge } from './components/ui/StatusBadge';

<StatusBadge variant="success">Completed</StatusBadge>
<StatusBadge variant="waiting">Pending</StatusBadge>
<StatusBadge variant="due_date">Overdue</StatusBadge>
<StatusBadge variant="disabled">Cancelled</StatusBadge>
```

**Colors:**
- Waiting: Orange/yellow
- Success: Green
- Due Date: Red
- Disabled: Gray

---

### Avatar

User profile image component with fallback support.

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  fallback?: string;
}
```

**Usage:**
```tsx
import { Avatar } from './components/ui/Avatar';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Name"
  size="large"
/>

<Avatar
  alt="John Doe"
  fallback="JD"
  size="medium"
/>
```

**Sizes:**
- Small: 24px
- Medium: 32px
- Large: 48px
- XLarge: 64px

---

### ProgressBar

Gradient-filled progress indicator.

**Props:**
```typescript
interface ProgressBarProps {
  percentage: number;
  gradient?: string;
  height?: number;
  showLabel?: boolean;
}
```

**Usage:**
```tsx
import { ProgressBar } from './components/ui/ProgressBar';

<ProgressBar
  percentage={75}
  gradient="var(--gradient-cyan)"
  height={8}
/>

<ProgressBar
  percentage={50}
  gradient="linear-gradient(135deg, #FF8C00, #FFD700)"
  showLabel
/>
```

**Features:**
- Customizable gradient fill
- Optional percentage label
- Smooth animation
- Auto-clamped to 0-100%

---

### MetricDisplay

Large number display for key metrics.

**Props:**
```typescript
interface MetricDisplayProps {
  value: string | number;
  label?: string;
  prefix?: string;
  suffix?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}
```

**Usage:**
```tsx
import { MetricDisplay } from './components/ui/MetricDisplay';

<MetricDisplay
  value="20,088.38"
  label="Current Balance"
  prefix="$"
  size="large"
/>

<MetricDisplay
  value={85}
  suffix="%"
  label="Health Score"
  size="medium"
  color="var(--color-success)"
/>
```

**Sizes:**
- Small: 24px
- Medium: 36px
- Large: 48px

---

### Calendar

Interactive month calendar component.

**Props:**
```typescript
interface CalendarProps {
  month: string;
  currentDay: number;
}
```

**Usage:**
```tsx
import { Calendar } from './components/ui/Calendar';

<Calendar
  month="June 2024"
  currentDay={10}
/>
```

**Features:**
- Displays full month grid
- Highlights current day with gradient
- Shows weekday headers
- Hover effects on dates

---

## Layout Components (`/src/components/layout/`)

### Sidebar

Fixed navigation sidebar with branding and menu.

**Props:**
```typescript
interface SidebarProps {
  navigation: NavItem[];
  supportNav: NavItem[];
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}
```

**Usage:**
```tsx
import { Sidebar } from './components/layout/Sidebar';

const navItems = [
  { id: '1', label: 'Dashboard', icon: '📊', path: '/', active: true },
  { id: '2', label: 'Transactions', icon: '💳', path: '/transactions' }
];

const supportItems = [
  { id: 's1', label: 'Settings', icon: '⚙️', path: '/settings' }
];

<Sidebar navigation={navItems} supportNav={supportItems} />
```

**Features:**
- Fixed position sidebar
- Active state highlighting
- Support section separator
- Premium upgrade card
- Responsive (slides out on mobile)

---

### Header

Top navigation header with search and user info.

**Props:**
```typescript
interface HeaderProps {
  user: UserProfile;
}

interface UserProfile {
  name: string;
  avatar: string;
  greeting: string;
}
```

**Usage:**
```tsx
import { Header } from './components/layout/Header';

const user = {
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  greeting: 'Welcome back!'
};

<Header user={user} />
```

**Features:**
- Search input with keyboard shortcut hint
- Notification bell with badge
- User profile dropdown
- Responsive layout

---

## Dashboard Components (`/src/components/dashboard/`)

### OverviewCard

Displays transaction summary and calendar.

**Props:**
```typescript
interface OverviewCardProps {
  metrics: OverviewMetrics;
}

interface OverviewMetrics {
  totalTransactions: number;
  incomeCount: number;
  outcomeCount: number;
  currentMonth: string;
  currentDay: number;
}
```

**Usage:**
```tsx
import { OverviewCard } from './components/dashboard/OverviewCard';

const metrics = {
  totalTransactions: 40,
  incomeCount: 24,
  outcomeCount: 16,
  currentMonth: 'June 2024',
  currentDay: 10
};

<OverviewCard metrics={metrics} />
```

---

### BalanceCard

Shows account balance with trend analysis.

**Props:**
```typescript
interface BalanceCardProps {
  balance: BalanceData;
}

interface BalanceData {
  balance: number;
  currency: string;
  changePercent: number;
  comparisonPeriod: string;
  financeHealthScore?: number;
}
```

**Usage:**
```tsx
import { BalanceCard } from './components/dashboard/BalanceCard';

const balance = {
  balance: 20088.38,
  currency: 'US Dollar',
  changePercent: 24.17,
  comparisonPeriod: 'vs last month',
  financeHealthScore: 85
};

<BalanceCard balance={balance} />
```

---

### GoalsCard

Tracks financial goals with progress bars.

**Props:**
```typescript
interface GoalsCardProps {
  goals: Goal[];
}

interface Goal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  achievementDate?: string;
  gradient: string;
}
```

**Usage:**
```tsx
import { GoalsCard } from './components/dashboard/GoalsCard';

const goals = [
  {
    id: '1',
    name: 'Vacation Fund',
    icon: '✈️',
    targetAmount: 5000,
    currentAmount: 3500,
    achievementDate: '2025-06',
    gradient: 'var(--gradient-cyan)'
  }
];

<GoalsCard goals={goals} />
```

---

### TransactionsCard

Displays recent transactions in a table.

**Props:**
```typescript
interface TransactionsCardProps {
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'expense' | 'income' | 'transfer';
  name: string;
  company?: string;
  date: string;
  amount: number;
  currency: string;
  status: 'waiting' | 'success' | 'due_date' | 'disabled';
  paymentMethod: string;
  cardLast4?: string;
  icon?: string;
}
```

**Usage:**
```tsx
import { TransactionsCard } from './components/dashboard/TransactionsCard';

const transactions = [
  {
    id: '1',
    type: 'expense',
    name: 'Coffee Shop',
    date: 'Oct 14, 2024',
    amount: 12.50,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'credit_card',
    cardLast4: '4012',
    icon: '☕'
  }
];

<TransactionsCard transactions={transactions} />
```

---

### QuickActionsCard

Quick access buttons for common actions.

**Usage:**
```tsx
import { QuickActionsCard } from './components/dashboard/QuickActionsCard';

<QuickActionsCard />
```

**Features:**
- Send Money button (N shortcut)
- Request Money button (R shortcut)
- Manage link

---

### PremiumCard

Premium subscription upgrade promotion.

**Usage:**
```tsx
import { PremiumCard } from './components/dashboard/PremiumCard';

<PremiumCard />
```

**Features:**
- Icon and title
- Description text
- Pricing display ($19.99/Month)
- Call-to-action button

---

## Best Practices

### Component Composition

```tsx
// Good - Composable
<Card>
  <div className="card__header">
    <h3>Title</h3>
  </div>
  <MetricDisplay value={100} />
</Card>

// Better - Using predefined patterns
<OverviewCard metrics={data} />
```

### Styling

```tsx
// Good - Use CSS classes
<div className="custom-class">Content</div>

// Better - Extend with className prop
<Card className="custom-modifier">Content</Card>
```

### TypeScript

```tsx
// Always define prop types
interface MyComponentProps {
  data: MyData[];
  onAction: (id: string) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ data, onAction }) => {
  // Component implementation
};
```

### State Management

```tsx
// For simple local state
const [count, setCount] = useState(0);

// For shared state across components
// Consider Zustand or Redux Toolkit
```

---

## Extending Components

To create a new component:

1. Create `.tsx` and `.css` files in appropriate directory
2. Define TypeScript interfaces for props
3. Implement component with proper typing
4. Export from directory index if in `/ui/`
5. Document usage and props
6. Test in isolation before integrating

Example:

```tsx
// src/components/ui/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  title: string;
  value: number;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, value }) => {
  return (
    <div className="my-component">
      <h3>{title}</h3>
      <span>{value}</span>
    </div>
  );
};
```

```css
/* src/components/ui/MyComponent.css */
.my-component {
  padding: var(--space-base);
  background: var(--bg-card);
  border-radius: var(--radius-lg);
}
```
