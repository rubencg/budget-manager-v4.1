# Tiki Budget Manager - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Project Overview

This is a modern budget manager application built with:

- **React 18.2** with TypeScript
- **Vite** for fast development and building
- **Pure CSS** with custom properties (no additional CSS frameworks)
- **Dark theme** with vibrant gradient visualizations

## Key Features Implemented

### Dashboard Components

1. **Overview Card**
   - Transaction count summary (Total, Income, Outcome)
   - Interactive calendar showing current month
   - Highlights current day with gradient background

2. **Balance Card**
   - Large balance display with currency formatting
   - Percentage change vs last month
   - Finance Health score with progress bar
   - Currency selector dropdown

3. **Quick Actions Card**
   - Send Money button (keyboard shortcut: N)
   - Request Money button (keyboard shortcut: R)
   - Manage link

4. **Goals Card**
   - Multiple financial goals
   - Progress bars with gradient fills
   - Target amounts and achievement dates
   - Current amount tracking

5. **Transactions Card**
   - Recent transactions table
   - Status badges (Waiting, Success, Due Date, Disabled)
   - Payment method display
   - Transaction type icons

6. **Premium Card**
   - Upgrade promotion
   - Pricing display
   - Call-to-action button

### Layout Components

1. **Sidebar**
   - Branding section
   - Navigation menu with active state
   - Support section
   - Premium upgrade CTA card

2. **Header**
   - Search bar with keyboard shortcut hint
   - Notification bell with badge
   - User profile section with avatar

### UI Components

All reusable components are located in `src/components/ui/`:

- **Card**: Container with variants (default, interactive, elevated)
- **Button**: Primary, secondary, and icon variants
- **StatusBadge**: Color-coded status indicators
- **Avatar**: User profile images with fallback
- **ProgressBar**: Gradient progress indicators
- **MetricDisplay**: Large number displays
- **Calendar**: Interactive month view calendar

## Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2 column grid)
- **Desktop**: 1024px - 1440px (multi-column grid)
- **Wide**: > 1440px (full grid layout)

## Design System

All design tokens are defined in `/src/styles/global.css` as CSS custom properties:

### Colors
- Background layers: `--bg-primary`, `--bg-secondary`, `--bg-card`
- Text hierarchy: `--text-primary`, `--text-secondary`, `--text-tertiary`
- Gradients: `--gradient-pink`, `--gradient-cyan`, `--gradient-orange`, etc.
- Semantic: `--color-success`, `--color-warning`, `--color-error`

### Spacing
- Base unit: 4px
- Values: `--space-xs` (4px) to `--space-4xl` (64px)

### Typography
- Font families: `--font-primary`, `--font-display`, `--font-mono`
- Responsive font sizes from 10px to 72px

### Effects
- Border radius: `--radius-sm` to `--radius-full`
- Shadows: `--shadow-sm` to `--shadow-xl`
- Transitions: `--transition-fast`, `--transition-normal`

## File Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── ui/         # Reusable UI components
│   │   ├── layout/     # Layout components (Sidebar, Header)
│   │   └── dashboard/  # Dashboard-specific components
│   ├── data/           # Mock data
│   ├── types/          # TypeScript definitions
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Mock Data

The application currently uses mock data defined in `/src/data/mockData.ts`:

- Sample transactions
- Financial goals
- Balance and overview metrics
- Navigation items
- User profile

To integrate with a real backend:

1. Create API service functions
2. Replace mock data imports with API calls
3. Add loading and error states
4. Implement data fetching hooks

## Customization

### Changing Colors

Edit `/src/styles/global.css` and modify CSS custom properties:

```css
:root {
  --bg-primary: #your-color;
  --gradient-custom: linear-gradient(135deg, #start, #end);
}
```

### Adding New Components

1. Create component in appropriate directory
2. Create corresponding CSS file
3. Export from directory index if needed
4. Import and use in parent components

### Modifying Layout

Edit grid properties in `/src/components/dashboard/Dashboard.css`:

```css
.dashboard__grid {
  grid-template-columns: repeat(12, 1fr);
  /* Adjust column spans for items */
}
```

## TypeScript

All data types are defined in `/src/types/index.ts`:

- Transaction
- Goal
- OverviewMetrics
- BalanceData
- NavItem
- UserProfile

Add new types as needed for new features.

## Performance

The application is optimized for performance:

- Vite for fast HMR (Hot Module Replacement)
- CSS-only styling (no runtime CSS-in-JS overhead)
- Minimal dependencies
- Tree-shaking enabled in production builds

## Browser Compatibility

Tested and supported in:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Next Steps

To extend the application:

1. **Authentication**: Add Firebase Auth or similar
2. **Backend**: Connect to Firebase, Supabase, or custom API
3. **State Management**: Add Zustand or Redux Toolkit for complex state
4. **Charts**: Integrate Chart.js or Recharts for data visualization
5. **Forms**: Add form validation with React Hook Form
6. **Routing**: Add React Router for multi-page navigation
7. **Testing**: Add Vitest for unit tests
8. **E2E Testing**: Add Playwright or Cypress

## Troubleshooting

### Development server not starting

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build errors

```bash
# Check TypeScript errors
npm run build
```

### Port already in use

Edit `vite.config.ts` to change the port:

```typescript
export default defineConfig({
  server: {
    port: 3001, // Change to any available port
  }
})
```

## Support

For issues or questions, refer to:

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

Private and proprietary.
