# UI/UX Implementation Guide - AgriTech Dashboard

## Executive Summary

This document provides comprehensive implementation instructions for building the AgriTech web platform using shadcn/ui components, following the design system specifications outlined in Design.json. The implementation focuses on creating a responsive, mobile-first interface with real-time monitoring capabilities.

## Technology Stack & Setup

### Prerequisites

-   React/Next.js project with TypeScript
-   Tailwind CSS configured
-   shadcn/ui CLI installed and configured
-   Chart.js for data visualization
-   Lucide React for icons

### Required shadcn/ui Components

Install the following components using `npx shadcn@latest add [component-name]`:

**Core Layout Components:**

-   `card` - Primary container for all dashboard elements
-   `sidebar` - Desktop navigation sidebar
-   `sheet` - Mobile navigation overlay
-   `menubar` - Top navigation bar

**Data Display Components:**

-   `badge` - Status indicators and labels
-   `progress` - Battery levels and percentage displays
-   `chart` - Data visualization
-   `table` - Structured data display

**Interactive Components:**

-   `button` - All action buttons
-   `switch` - Toggle controls
-   `dialog` - Modal windows
-   `form` - Configuration forms
-   `input` - Text inputs
-   `select` - Dropdown selections
-   `slider` - Range controls

**Utility Components:**

-   `separator` - Visual dividers
-   `skeleton` - Loading states
-   `tooltip` - Hover information
-   `alert` - System notifications
-   `sonner` - Toast notifications

## Implementation Architecture

### 1. Layout Structure

#### Main Container Setup

-   Use CSS Grid for responsive layout management
-   Implement mobile-first approach with breakpoints:
    -   Mobile: `<640px` (single column)
    -   Tablet: `640px-1024px` (two-column grid)
    -   Desktop: `>1024px` (sidebar + main content)

#### Navigation System

-   **Desktop**: Fixed sidebar with collapsible navigation
-   **Mobile**: Top navigation bar with hamburger menu triggering sheet overlay
-   **Responsive**: Smooth transitions between mobile and desktop layouts

### 2. Component Implementation Strategy

#### Dashboard Cards (Primary Metric Cards)

**Component**: `card`
**Styling Approach**:

-   Apply `card.primary` styling from Design.json
-   Use consistent 16px border radius
-   Implement hover effects with 0.2s ease transitions
-   Maintain 24px padding and 1px border with #E5E7EB color

**Layout Structure**:

-   Mobile: Single column stack
-   Tablet: 2x3 grid layout
-   Desktop: 2x3 grid with sidebar

**Card Types**:

1. **VPD Status Card**: Green gradient background for optimal status
2. **CO₂ Levels Card**: Standard white background with trend indicators
3. **Humidity Card**: Standard white background with comfort zone indicators
4. **Temperature Card**: Standard white background with heat index
5. **Water Pump Card**: Standard white background with toggle controls
6. **Fan Status Card**: Standard white background with speed controls

#### Status Indicators

**Component**: `badge`
**Implementation**:

-   Use semantic colors from Design.json status palette
-   Apply consistent 6px border radius
-   Implement proper contrast ratios for accessibility
-   Use appropriate padding (4px 8px) and font weights

**Status Types**:

-   **Online**: Green background (#DCFCE7) with dark green text (#166534)
-   **Warning**: Yellow background (#FEF3C7) with dark yellow text (#92400E)
-   **Offline**: Red background (#FEE2E2) with dark red text (#991B1B)

#### Progress Indicators

**Component**: `progress`
**Styling**:

-   Use 8px height with rounded corners
-   Implement color-coded fills based on status
-   Apply smooth transitions for value changes
-   Use consistent background (#F3F4F6)

#### Interactive Controls

**Component**: `switch`
**Implementation**:

-   Use for binary states (Active/Inactive, Auto/Manual)
-   Apply consistent sizing and spacing
-   Implement proper accessibility labels
-   Use semantic colors for different states

### 3. Page-Specific Implementation

#### Dashboard Page

**Layout Structure**:

1. **Top Navigation**: `menubar` with logo, sector selector, alerts, and user profile
2. **Status Cards Section**: 2x3 grid of `card` components
3. **Charts Section**: `chart` components with responsive containers
4. **Water Schedule Status**: `card` with countdown timer and status indicators

**Responsive Behavior**:

-   Mobile: Stack all elements vertically
-   Tablet: Maintain grid layout with adjusted spacing
-   Desktop: Full grid layout with sidebar navigation

#### Sensors Page

**Component Structure**:

1. **Sensor Grid**: `card` components arranged in responsive grid
2. **Sensor Cards**: Individual `card` elements with:
    - Device name and ID using monospace font
    - Status `badge` for connection state
    - `progress` for battery levels
    - Last reading timestamp
    - Calibration status `badge`

**Interactive Elements**:

-   "Add New Sensor" button using `button` component
-   Configuration modal using `dialog` component
-   Form inputs using `form`, `input`, and `select` components

#### Watering Schedule Page

**Layout Components**:

1. **Schedule Overview**: `table` component for time-based display
2. **Customization Panel**: `card` with form controls
3. **Volume Controls**: `slider` components for volume adjustments
4. **Conditional Rules**: `form` with `input` and `select` components

**Interactive Features**:

-   Drag-and-drop functionality for time adjustments
-   Real-time volume preview
-   Conditional rule editor with form validation

#### Statistics Page

**Component Structure**:

1. **Analytics Tabs**: `tabs` component for organizing different metrics
2. **Chart Containers**: `card` components housing `chart` elements
3. **Metric Summaries**: `card` components with key statistics
4. **Data Tables**: `table` components for detailed statistics

### 4. Design System Integration

#### Color Implementation

**Primary Colors**:

-   Use `#22C55E` as primary green for buttons and highlights
-   Apply `#4ADE80` for light green accents
-   Use `#16A34A` for dark green hover states

**Status Colors**:

-   Success: `#10B981`
-   Warning: `#F59E0B`
-   Error: `#EF4444`
-   Info: `#3B82F6`

**Neutral Colors**:

-   Background: `#F9FAFB`
-   Cards: `#FFFFFF`
-   Borders: `#E5E7EB`
-   Text: `#111827` (primary), `#6B7280` (secondary)

#### Typography Implementation

**Font Sizes**:

-   Main Title: 48px (700 weight)
-   Section Title: 24px (600 weight)
-   Card Title: 16px (600 weight)
-   Metric Value: 36px (700 weight)
-   Body Text: 14px (400 weight)
-   Caption: 12px (400 weight)

**Font Weights**:

-   Use consistent weight hierarchy
-   Apply proper line heights for readability
-   Maintain letter spacing for headings

#### Spacing System

**Consistent Spacing**:

-   XS: 4px
-   SM: 8px
-   MD: 16px
-   LG: 24px
-   XL: 32px
-   2XL: 48px

**Application**:

-   Use 24px spacing between major sections
-   Apply 16px padding within cards
-   Maintain 8px spacing between related elements

#### Shadow System

**Shadow Hierarchy**:

-   Small: `0 1px 2px rgba(0, 0, 0, 0.05)`
-   Medium: `0 1px 3px rgba(0, 0, 0, 0.1)`
-   Large: `0 4px 12px rgba(0, 0, 0, 0.15)`
-   Colored: `0 4px 12px rgba(34, 197, 94, 0.2)` for green elements

### 5. Responsive Design Implementation

#### Mobile-First Approach

**Breakpoint Strategy**:

-   Start with mobile layout (single column)
-   Add tablet breakpoints for grid layouts
-   Implement desktop sidebar navigation

**Touch Optimization**:

-   Minimum 44px touch targets
-   Adequate spacing between interactive elements
-   Swipe gestures for navigation
-   Simplified dashboard for mobile

#### Tablet Optimization

**Layout Adjustments**:

-   Two-column grid for status cards
-   Maintained card sizes with adjusted spacing
-   Optimized chart sizes for medium screens
-   Collapsible sidebar with overlay

#### Desktop Enhancement

**Full Feature Set**:

-   Permanent sidebar navigation
-   Multi-column layouts
-   Hover effects and advanced interactions
-   Full chart functionality

### 6. Interactive Features

#### Real-Time Updates

**Implementation Strategy**:

-   WebSocket connections for live data
-   Optimistic UI updates
-   Loading states using `skeleton` components
-   Error handling with `alert` components

#### Data Visualization

**Chart Implementation**:

-   Use `chart` component with Chart.js integration
-   Implement responsive chart containers
-   Apply consistent color schemes
-   Add interactive tooltips and legends

#### Form Handling

**Form Components**:

-   Use `form` component with validation
-   Implement proper error states
-   Apply consistent styling across all forms
-   Use appropriate input types and constraints

### 7. Accessibility Implementation

#### WCAG Compliance

**Color Contrast**:

-   Maintain 4.5:1 contrast ratio for text
-   Use semantic colors for status indicators
-   Provide alternative text for icons

**Keyboard Navigation**:

-   Implement proper tab order
-   Add keyboard shortcuts for common actions
-   Ensure all interactive elements are keyboard accessible

**Screen Reader Support**:

-   Use semantic HTML structure
-   Provide descriptive labels for all controls
-   Implement proper ARIA attributes

### 8. Performance Optimization

#### Loading Strategy

**Component Loading**:

-   Use `skeleton` components for initial loading states
-   Implement lazy loading for charts
-   Optimize image and icon loading

#### Data Management

**State Management**:

-   Efficient data polling (5-second intervals)
-   Optimistic updates for better UX
-   Proper error boundaries and fallbacks

### 9. Testing Strategy

#### Component Testing

**Test Coverage**:

-   Unit tests for individual components
-   Integration tests for component interactions
-   Visual regression tests for design consistency

#### Responsive Testing

**Device Testing**:

-   Test on multiple screen sizes
-   Verify touch interactions on mobile
-   Ensure proper layout on all breakpoints

### 10. Deployment Considerations

#### Build Optimization

**Production Build**:

-   Optimize bundle size
-   Implement proper caching strategies
-   Use CDN for static assets

#### Monitoring

**Performance Monitoring**:

-   Track Core Web Vitals
-   Monitor real-time data performance
-   Implement error tracking and reporting

## Implementation Checklist

### Phase 1: Foundation

-   [ ] Set up project with shadcn/ui
-   [ ] Implement basic layout structure
-   [ ] Create responsive navigation system
-   [ ] Set up design system tokens

### Phase 2: Core Components

-   [ ] Implement status cards with proper styling
-   [ ] Create chart components with data integration
-   [ ] Build sensor management interface
-   [ ] Develop watering schedule system

### Phase 3: Advanced Features

-   [ ] Add real-time data integration
-   [ ] Implement form validation and error handling
-   [ ] Create responsive chart interactions
-   [ ] Add accessibility features

### Phase 4: Optimization

-   [ ] Performance optimization
-   [ ] Mobile experience refinement
-   [ ] Cross-browser testing
-   [ ] User acceptance testing

**Usage Rule**
When asked to use shaden components, use the MCP server.
Planning Rule
When asked to plan using anything related to shaden:
Use the MCP server during planning
Apply components wherever components are applicable Use whole blocks where possible (e.g., login page, calendar)
Implementation Rule
When implementing:
First call the demo tool to see how it is used Then implement it so that it is implemented correctly
