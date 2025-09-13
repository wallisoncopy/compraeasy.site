# Design Guidelines for Supermarket Inventory Management System

## Design Approach
**Selected Approach**: Design System - Material Design with Brazilian business aesthetics
**Justification**: This is a utility-focused application prioritizing efficiency and data management for Brazilian supermarket operations.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 33 85% 45% (professional green for business context)
- Dark Mode: 33 80% 35% (muted green for comfortable viewing)
**Background:**
- Light: 0 0% 98% (clean white-gray)
- Dark: 215 25% 12% (soft dark blue-gray)
**Text Colors:**
- Primary: 220 15% 20% (light) / 220 15% 85% (dark)
- Secondary: 220 10% 50%

### B. Typography
- **Primary Font**: 'Roboto' (Google Fonts) - clean, professional
- **Headings**: 500-600 weight, larger scale (1.5rem-2rem)
- **Body**: 400 weight, 1rem base size
- **Data Tables**: 'Roboto Mono' for numerical consistency

### C. Layout System
**Spacing Units**: Consistent use of 4px, 8px, 16px, 24px, 32px multiples
- Form inputs: 8px padding
- Component spacing: 16px margins
- Section spacing: 32px between major sections
- Container max-width: 1200px with 16px side margins

### D. Component Library

**Login Screen:**
- Centered card layout with subtle elevation
- Clean input fields with floating labels
- Primary button with sufficient padding (12px vertical, 24px horizontal)
- Supermarket branding area at top

**Data Management Interface:**
- Clean table design with alternating row backgrounds
- Sticky headers for long tables
- Action buttons with consistent sizing
- Filter/search bar with clear iconography
- Export functionality prominently displayed

**Navigation:**
- Simple top navigation bar
- Breadcrumb navigation for context
- Mobile hamburger menu for responsive design

**Forms & Inputs:**
- Consistent input styling with subtle borders
- Clear validation states (success/error colors)
- Proper form grouping and spacing
- Brazilian currency formatting (R$)

### E. Responsive Design
**Breakpoints:**
- Mobile: 320px-768px (single column, stacked layout)
- Tablet: 768px-1024px (condensed table view)
- Desktop: 1024px+ (full table layout)

**Mobile Adaptations:**
- Collapsible table rows showing key data
- Touch-friendly button sizing (minimum 44px)
- Simplified navigation
- Optimized form layouts

### F. Business Context Features
- Portuguese language interface
- Brazilian Real (R$) currency formatting
- Professional color scheme suitable for business environment
- Clear data hierarchy for inventory management
- Export functionality for business reporting

## Icons
Use Material Icons via CDN for consistency with business applications:
- Inventory management icons
- Export/import icons
- Navigation icons
- Status indicators

## Accessibility & Usability
- High contrast ratios for data readability
- Clear focus states for keyboard navigation
- Proper ARIA labels for screen readers
- Consistent interaction patterns
- Fast loading with minimal JavaScript dependencies