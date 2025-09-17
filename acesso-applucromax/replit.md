# LucroMax - Futuristic Web App

## Overview

LucroMax is a Portuguese-language training platform designed with a futuristic aesthetic. The application provides modular video-based training content through an interactive carousel interface. The platform features a secure login system and focuses on delivering educational content in an engaging, modern user interface with neon-style visual elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure HTML/CSS/JavaScript**: Single-page application built with vanilla web technologies for simplicity and direct control
- **Component-based Structure**: Modular design with separate login and main application views
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox for cross-device compatibility

### UI/UX Design Patterns
- **Futuristic Theme**: Neon green (#00FF88) color scheme with Orbitron font family for sci-fi aesthetic
- **Animation System**: CSS animations including pulse effects and smooth transitions for enhanced user experience
- **Carousel Navigation**: Interactive module browsing with smooth scrolling and visual feedback

### State Management
- **Local Storage Persistence**: Client-side session management using browser localStorage for login state
- **Simple Authentication**: Basic credential validation with persistent login sessions
- **Module Progress Tracking**: JavaScript-based state management for training module navigation

### Data Architecture
- **Static Content Structure**: Embedded YouTube videos organized in predefined modules
- **No Backend Database**: Content is hardcoded in the frontend, suitable for simple training delivery
- **Session-only Data**: User progress and login state stored locally without server persistence

### Security Approach
- **Client-side Authentication**: Basic login validation suitable for demonstration or internal use
- **localStorage Security**: Login state persisted locally for user convenience
- **Content Protection**: Login gate prevents unauthorized access to training materials

## External Dependencies

### Content Delivery
- **YouTube Embedded Videos**: Primary content delivery through YouTube iframe embeds
- **Google Fonts**: Orbitron font family loaded from Google Fonts CDN for consistent typography

### Browser APIs
- **LocalStorage API**: For persistent login state and user session management
- **DOM API**: For dynamic content manipulation and user interaction handling

### Development Dependencies
- **No Build Tools**: Direct browser execution without compilation or bundling requirements
- **No Framework Dependencies**: Vanilla JavaScript implementation for minimal overhead