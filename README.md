# Tiki - Budget Manager

A modern, dark-themed budget manager application built with React, TypeScript, and Vite. This application provides a comprehensive dashboard for managing personal finances, tracking transactions, setting goals, and monitoring spending habits.

## Features

- **Dark Theme Design**: Beautiful dark interface with vibrant gradient visualizations
- **Dashboard Overview**: Real-time view of transactions, income, and expenses
- **Interactive Calendar**: Visual calendar showing transaction activity
- **Balance Tracking**: Monitor your balance with trend analysis
- **Quick Actions**: Send and request money with keyboard shortcuts
- **Goal Management**: Track progress towards financial goals
- **Transaction History**: Detailed view of recent transactions with status indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Technology Stack

- **React 18.2**: Modern React with hooks and functional components
- **TypeScript**: Full type safety throughout the application
- **Vite**: Fast build tool and development server
- **CSS Modules**: Scoped styling with CSS custom properties
- **Design System**: Custom design system based on dark theme with gradient accents

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── MetricDisplay.tsx
│   │   │   └── Calendar.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── dashboard/       # Dashboard-specific components
│   │       ├── Dashboard.tsx
│   │       ├── OverviewCard.tsx
│   │       ├── BalanceCard.tsx
│   │       ├── QuickActionsCard.tsx
│   │       ├── GoalsCard.tsx
│   │       ├── TransactionsCard.tsx
│   │       └── PremiumCard.tsx
│   ├── data/
│   │   └── mockData.ts      # Mock data for development
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── styles/
│   │   └── global.css       # Global styles and CSS variables
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd /mnt/c/Users/ruben/Documents/projects/new-budget-manager/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npx @openapitools/openapi-generator-cli ...` - Re-generate API client

### API Client Generation

To update the frontend API client when the backend API changes (e.g., new endpoints, model updates), run the following command:

```bash
npx @openapitools/openapi-generator-cli generate -i http://localhost:5023/swagger/v1/swagger.json -g typescript-fetch -o ./src/api-client --additional-properties=supportsES6=true
```

**What this does:**
1.  **`-i ...`**: Points to the Swagger/OpenAPI JSON definition of your running backend (ensure backend is running at port 5023).
2.  **`-g typescript-fetch`**: Tells the generator to create a TypeScript client using the native `fetch` API.
3.  **`-o ./src/api-client`**: Outputs the generated code into the `src/api-client` directory.
4.  **`--additional-properties=supportsES6=true`**: Ensures the generated code uses modern ES6 syntax.

## Design System

The application follows a comprehensive design system with:

### Color Palette

- **Backgrounds**: Black (#000000), Dark Gray (#0A0A0A, #1C1C1C)
- **Text**: White (#FFFFFF), Gray variations (#A0A0A0, #6B6B6B, #4A4A4A)
- **Gradients**:
  - Pink: #FF1493 → #FFB6C1
  - Purple: #6A0DAD → #DDA0DD
  - Cyan: #00CED1 → #7FFFD4
  - Orange: #FF8C00 → #FFD700
  - Green: #00FA9A → #90EE90

### Typography

- **Font Family**: System fonts (Apple, Segoe UI, Roboto)
- **Font Sizes**: 10px (tiny) to 72px (display)
- **Font Weights**: 300 (light) to 900 (black)

### Components

- **Cards**: 16px border radius, shadow effects, hover states
- **Buttons**: Primary (gradient), Secondary (outlined), Icon
- **Badges**: Status indicators with color coding
- **Progress Bars**: Gradient fills with smooth animations

### Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: 1024px - 1440px (3-4 columns)
- **Wide**: > 1440px (4+ columns)

## Component Documentation

### UI Components

#### Card
```tsx
<Card variant="default | interactive | elevated">
  {children}
</Card>
```

#### Button
```tsx
<Button
  variant="primary | secondary | icon"
  fullWidth={boolean}
  onClick={handler}
>
  {children}
</Button>
```

#### StatusBadge
```tsx
<StatusBadge variant="waiting | success | due_date | disabled">
  {children}
</StatusBadge>
```

#### ProgressBar
```tsx
<ProgressBar
  percentage={number}
  gradient={string}
  height={number}
  showLabel={boolean}
/>
```

### Layout Components

#### Sidebar
Navigation sidebar with branding, menu items, and upgrade CTA.

#### Header
Top header with search, notifications, and user profile.

### Dashboard Components

#### OverviewCard
Displays transaction counts and calendar view.

#### BalanceCard
Shows current balance with trend analysis and finance health score.

#### QuickActionsCard
Quick access buttons for common actions.

#### GoalsCard
Displays financial goals with progress tracking.

#### TransactionsCard
Table view of recent transactions.

#### PremiumCard
Upgrade promotion for premium features.

## Customization

### Adding New Colors

Add new color variables in `/src/styles/global.css`:

```css
:root {
  --color-custom: #yourcolor;
  --gradient-custom: linear-gradient(135deg, #start 0%, #end 100%);
}
```

### Creating New Components

1. Create component file in appropriate directory
2. Create corresponding CSS file
3. Export component from directory index (if applicable)
4. Import and use in parent components

### Mock Data

Mock data is located in `/src/data/mockData.ts`. Update this file to change sample data displayed in the application.

## Future Enhancements

- [ ] Authentication and user management
- [ ] Backend integration (Firebase/Supabase)
- [ ] Real-time data synchronization
- [ ] Advanced charts and analytics
- [ ] Budget planning and forecasting
- [ ] Expense categorization
- [ ] Multi-currency support
- [ ] Data export (CSV, PDF)
- [ ] Recurring transactions
- [ ] Bill reminders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.
