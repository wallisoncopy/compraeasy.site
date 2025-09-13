# Overview

This is a Brazilian supermarket inventory management system called "Planilha Inteligente de Produtos" (Smart Product Spreadsheet). The application helps supermarket owners manage product inventory by tracking consumption patterns, stock levels, pricing, and calculating optimal reorder points and quantities. The system features a simple login interface and a comprehensive inventory management dashboard with analytics and reporting capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/UI component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation resolvers

## Design System
- **Theme System**: CSS custom properties with multiple supermarket brand color schemes (Pão de Açúcar red, Extra blue, Carrefour orange, etc.)
- **Typography**: Roboto font family with Roboto Mono for numerical data
- **Layout**: Responsive design with mobile-first approach
- **Component Strategy**: Atomic design principles with reusable UI components

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API structure with `/api` prefix
- **Database Integration**: Configured for PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL session store
- **Development**: Hot reload with Vite integration and error overlay

## Data Management
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema migrations
- **Validation**: Zod schemas for runtime type validation
- **Storage**: Dual storage approach with in-memory fallback and PostgreSQL production setup

## Application Structure
- **Monorepo Setup**: Shared code between client and server
- **Client**: React SPA in `client/` directory
- **Server**: Express API in `server/` directory  
- **Shared**: Common types and schemas in `shared/` directory
- **Asset Management**: Static assets in `attached_assets/` with fallback data in `data/`

## Product Data Management
- **Static Data**: Comprehensive Brazilian supermarket product database with categories (Mercearia, Açougue, Padaria, Frios, etc.)
- **Inventory Calculations**: Automatic reorder point calculation based on consumption patterns and lead times
- **Analytics**: Profit margin analysis and stock level monitoring
- **Export Functionality**: CSV export capabilities for external processing

# External Dependencies

## UI and Styling
- **@radix-ui/react-***: Complete set of accessible UI primitives for complex components
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **clsx**: Conditional class name utility

## State Management and Data Fetching
- **@tanstack/react-query**: Server state management with caching and synchronization
- **@hookform/resolvers**: Form validation resolvers for React Hook Form
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Database and Storage
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for production
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js development
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development environment integration

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **nanoid**: Unique ID generation