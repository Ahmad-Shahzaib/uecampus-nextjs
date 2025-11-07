# FAQs Component

This is an optimized, type-safe FAQ component built with Next.js, TypeScript, and Redux Toolkit.

## Features

- ✅ **Type Safety**: Complete TypeScript coverage with proper interfaces
- 🚀 **Performance Optimized**: Uses React.memo, useCallback, and efficient rendering
- 🎨 **Modern UI**: Responsive design with smooth animations
- 🔄 **Loading States**: Beautiful skeleton loading screens
- ❌ **Error Handling**: User-friendly error states with retry functionality
- ♿ **Accessibility**: ARIA attributes and keyboard navigation support
- 🧩 **Modular**: Split into reusable components

## Component Structure

```
src/component/faqs/
├── Faqs.tsx              # Main FAQ component
├── FaqItem.tsx           # Individual FAQ item (memoized)
├── LoadingSkeleton.tsx   # Loading state component
├── ErrorState.tsx        # Error state component
├── types.ts             # TypeScript interfaces
├── index.tsx            # Re-export for backward compatibility
└── index.ts             # Barrel exports
```

## Usage

### Basic Usage

```tsx
import Faqs from '@/component/faqs';

export default function FaqsPage() {
  return <Faqs />;
}
```

### Individual Components

```tsx
import { Faqs, FaqItem, LoadingSkeleton, ErrorState } from '@/component/faqs';
```

## Types

```typescript
interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

interface FaqContent {
  id: number;
  title: string;
  description: string;
  created_at: string | null;
  updated_at: string;
}
```

## Redux Integration

The component integrates with Redux store for state management:

- **Loading State**: Shows skeleton while fetching data
- **Error State**: Displays errors with retry functionality
- **Data Management**: Fetches and caches FAQ data efficiently

## Optimizations Made

1. **Type Safety**: Fixed all TypeScript implicit 'any' type errors
2. **Performance**: 
   - Memoized components with React.memo
   - useCallback for event handlers
   - Conditional data fetching to prevent unnecessary API calls
3. **UX Improvements**:
   - Loading skeleton instead of simple text
   - Better error handling with retry functionality
   - Improved accessibility with ARIA attributes
4. **Code Organization**:
   - Split into multiple focused components
   - Shared types in separate file
   - Clean barrel exports for easy importing

## Accessibility Features

- ARIA expanded/collapsed states
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly structure
- Focus management

## Styling

Uses Tailwind CSS with:
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Dark theme with gradient background
- Hover states and interactive feedback

## Browser Support

Works in all modern browsers that support:
- ES6+ features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)

## Performance Considerations

- Components are memoized to prevent unnecessary re-renders
- API calls are debounced and cached
- Efficient state updates with useCallback
- Minimal bundle size with tree-shakable exports