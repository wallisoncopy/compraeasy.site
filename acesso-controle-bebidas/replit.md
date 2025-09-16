# Overview

This is a Portuguese-language beverage inventory control system designed as a sophisticated, mobile-responsive web application with dark theme. The system helps bar owners and distributors track drink stock levels, monitor consumption patterns, and receive intelligent alerts when inventory runs low. It features a glassmorphism login screen, advanced inventory management interface, real-time data visualization with Chart.js, and professional PDF export capabilities to prevent stockouts and optimize beverage ordering.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Single-page application (SPA)** built with vanilla HTML, CSS, and JavaScript
- **Dark theme with glassmorphism effects** and sophisticated gradient backgrounds
- **Mobile-first responsive design** with touch-friendly interfaces optimized for smartphones
- **Advanced CSS animations** including shimmer effects, border glows, and smooth transitions
- **Progressive disclosure pattern** - animated login screen leads to main inventory interface
- **Local storage persistence** for multi-establishment data management without backend dependency
- **Professional PDF export** using jsPDF and jsPDF-AutoTable libraries

## UI/UX Design Patterns
- **Dark gradient backgrounds** (black to purple) with glassmorphism effects for premium aesthetics
- **Card-based layout** with translucent containers and backdrop blur effects
- **Font Awesome icon integration** throughout the interface for professional appearance
- **Intelligent color-coded alerts** with multiple severity levels (Critical, Low, Monitor, OK)
- **Portuguese language interface** optimized for Brazilian bar and distributor market
- **Animated UI elements** including button hover effects, table row highlighting, and smooth transitions

## Data Management
- **Client-side data storage** using browser localStorage
- **Dynamic table generation** for inventory items
- **Real-time calculations** for stock suggestions and alerts
- **JSON-based data structure** for easy serialization and persistence

## Inventory Logic
- **Automatic stock level monitoring** with configurable minimum thresholds
- **Consumption-based purchasing suggestions** using weekly consumption patterns
- **Alert system** for low stock situations
- **CRUD operations** for beverage items (add, edit, delete)

## Visualization Components
- **Chart.js integration** with dark theme styling for professional data representation
- **Real-time bar chart updates** showing current stock, weekly consumption, and minimum levels
- **Custom color scheme** (purple, green, yellow) matching the app's dark theme
- **Responsive chart sizing** with fixed height for consistent mobile experience
- **Professional PDF export** with complete table data, establishment info, and statistical summary

# External Dependencies

## JavaScript Libraries
- **Chart.js** - Data visualization and charting library loaded via CDN
- **Font Awesome** - Professional icon library for consistent visual elements
- **jsPDF** - Client-side PDF generation library for professional reports
- **jsPDF-AutoTable** - Enhanced table formatting and styling for PDF exports
- **No framework dependencies** - built with vanilla JavaScript for optimal performance

## Browser APIs
- **Local Storage API** - Client-side data persistence
- **Viewport Meta Tag** - Mobile responsive design support
- **CSS Grid/Flexbox** - Layout and responsive design

## Hosting Requirements
- **Static file hosting** - No server-side processing required
- **HTTPS recommended** - For localStorage security in production
- **Modern browser support** - Requires ES6+ JavaScript features

## Sample Data
- **15+ pre-loaded beverage examples** specifically chosen for bar and distributor operations
- **Weekend-focused inventory** including popular beers, spirits, soft drinks, and energy drinks
- **Realistic consumption patterns** based on typical bar/distributor needs
- **Intelligent stock calculations** to prevent weekend stockouts

Note: The system operates entirely client-side with sophisticated local data management, making it suitable for professional bar and distributor operations without server costs or recurring fees.