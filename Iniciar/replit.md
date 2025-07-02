# Código Inflamatório 3D - Quiz de Diagnóstico

## Overview

This is a web-based diagnostic quiz application called "Código Inflamatório 3D" (3D Inflammatory Code) designed to help women identify potential health issues related to retention, inflammation, or slow metabolism. The application is built as a simple, responsive single-page application using vanilla HTML, CSS, and JavaScript.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript without any frameworks
- **Responsive Design**: Mobile-first approach with clean, modern UI
- **Component-based Structure**: Different screens (welcome, quiz, results) managed through JavaScript state
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features

### Design Principles
- **Mobile-first responsive design** optimized for smartphone usage
- **Soft color palette** using light green (#4CAF50, #66BB6A) and white for a calming, health-focused aesthetic
- **Smooth animations** and transitions for enhanced user experience
- **Accessibility considerations** with proper contrast ratios and semantic HTML

## Key Components

### 1. Welcome Screen
- **Purpose**: Introduction and motivation for taking the quiz
- **Features**: 
  - Compelling title and subtitle
  - Benefits list with emoji indicators
  - Time estimation (2 minutes)
  - Call-to-action button

### 2. Quiz Engine
- **Structure**: Three phases with different point values
  - Phase 1: Retenção Invisível (1 point per question)
  - Phase 2: Inflamação Oculta (2 points per question)  
  - Phase 3: Metabolismo Lento (3 points per question)
- **Question Flow**: 12 total questions across 3 phases (4 questions each)
- **Scoring System**: Secret weighted scoring based on phase importance

### 3. Progress Tracking
- **Visual Progress Bar**: Shows completion percentage
- **Phase Indicators**: Current phase and question number display
- **Sticky Navigation**: Progress bar remains visible during scrolling

### 4. Results/Diagnosis System
- **Scoring Ranges**:
  - 0-10 points: Fase 1 – Retenção leve
  - 11-20 points: Fase 2 – Inflamação oculta
  - 21+ points: Fase 3 – Travamento metabólico
- **Personalized Results**: Emotional, relatable diagnostic explanations
- **Call-to-Action**: "Detox 3D" method promotion with conversion button

## Data Flow

1. **Initialization**: Quiz data structure loaded with phases, questions, and point values
2. **User Journey**: Welcome → Quiz Questions → Results
3. **State Management**: JavaScript manages current question, phase, and scoring
4. **Progress Calculation**: Real-time updates to progress bar and indicators
5. **Score Calculation**: Weighted scoring based on phase multipliers
6. **Result Generation**: Dynamic diagnosis based on total score ranges

## External Dependencies

### Fonts
- **Google Fonts**: Inter font family (weights: 300, 400, 500, 600, 700)
- **Fallbacks**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)

### No External Libraries
- Pure vanilla JavaScript implementation
- No CSS frameworks or UI libraries
- Self-contained with minimal external dependencies

## Deployment Strategy

### Static Hosting Ready
- **File Structure**: Simple HTML, CSS, JS files suitable for any static hosting
- **No Build Process**: Direct deployment without compilation or bundling
- **CDN Compatible**: All assets can be served from CDN
- **Mobile Optimized**: Responsive design works across all device sizes

### Hosting Options
- GitHub Pages, Netlify, Vercel for static hosting
- Any web server capable of serving static files
- No server-side requirements or database needed

## Changelog

- July 02, 2025: Initial setup with complete quiz functionality
- July 02, 2025: Added transformation testimonial image to welcome screen
- July 02, 2025: Fixed checkout button JavaScript error and updated redirect link to: https://paypagamentostx3.shop/checkout-white-7054/?add-to-cart=7054
- July 02, 2025: Major enhancement with doctor credibility section, additional questions phase, testimonials, and success gallery
- July 02, 2025: Added Dr. Emanuel Silva profile with medical credentials (CRM: 205937) as method creator
- July 02, 2025: Extended quiz from 12 to 16 questions with new "Validação Científica" phase
- July 02, 2025: Added comprehensive testimonials section with 4 detailed customer stories
- July 02, 2025: Added success gallery with 3 additional transformation images
- July 02, 2025: Enhanced conversion elements: urgency text, guarantee, pulsing CTA button

## User Preferences

Preferred communication style: Simple, everyday language.