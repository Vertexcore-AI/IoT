### UI/UX Build Manual for AgriTech Web Platform

#### Executive Summary
This manual outlines the frontend design and implementation details for a mobile-first AgriTech web platform. The platform integrates real-time monitoring, VPD (Vapor Pressure Deficit) management, automated irrigation, and environmental control for greenhouse farming. The design prioritizes a responsive, user-friendly interface optimized for mobile devices, with desktop scalability, based on the provided design images and document draft.

#### Project Overview
- **Purpose**: Develop a web-based platform for greenhouse automation, focusing on mobile usability with features like sensor monitoring, watering schedules, and analytics.
- **Target Devices**: Primarily mobile (smartphones, tablets), with responsive design for desktops.
- **Design Inspiration**: The uploaded images showcase a clean, card-based dashboard with real-time data, navigation, and task tracking.

#### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Responsive Design**: Mobile-first approach with media queries

#### Platform Architecture
- **Core Components**:
  - **Navigation System**: Fixed top navigation bar with a hamburger menu for mobile, collapsible sidebar for desktop.
  - **Dashboard Layout**: Grid-based layout with status cards, charts, and task sections, adaptable to mobile single-column views.
- **Responsive Breakpoints**:
  - Mobile: `<640px` (single column)
  - Tablet: `640px-1024px` (two-column layout)
  - Desktop: `>1024px` (sidebar + main content)

#### Page Specifications

AgriTech Web Platform
    index (Root Page)
│   ├── Top Navigation
│   │   ├── Logo (AgriTech)
│   │   ├── Sector Selector (e.g., Spinach Garden 08)
│   │   ├── Alert Icon (with badge, e.g., 3 Alerts)
│   │   ├── User Profile Icon
│   │   └── Hamburger Menu (mobile toggle)
│   ├── Main Content
│   │   ├── Dashboard Page
│   │   │   ├── Status Cards Section
│   │   │   │   ├── VPD Status Card
│   │   │   │   │   ├── Current VPD Value (e.g., 1.1 kPa)
│   │   │   │   │   ├── Status Indicator (Optimal/Warning/Critical)
│   │   │   │   │   ├── Color Coding (Green/Yellow/Red)
│   │   │   │   │   └── Mini Trend Chart
│   │   │   │   ├── CO₂ Levels Card
│   │   │   │   │   ├── Current ppm Reading (e.g., 450 ppm)
│   │   │   │   │   ├── Target Range Indicator (400-1200 ppm)
│   │   │   │   │   └── Trend Arrow (↑/↓/→)
│   │   │   │   ├── Humidity Card
│   │   │   │   │   ├── Current RH Percentage (e.g., 82%)
│   │   │   │   │   ├── Comfort Zone Indicator
│   │   │   │   │   └── Dew Point Calculation (e.g., 15°C)
│   │   │   │   ├── Temperature Card
│   │   │   │   │   ├── Current Temperature (e.g., 24°C)
│   │   │   │   │   ├── Heat Index (e.g., H: 26°C, L: 22°C)
│   │   │   │   │   └── Min/Max Daily Readings
│   │   │   │   ├── Water Pump Status Card
│   │   │   │   │   ├── Active/Inactive Toggle
│   │   │   │   │   ├── Current Flow Rate (e.g., 150 mL/min)
│   │   │   │   │   ├── Next Scheduled Activation (e.g., 10:00 AM)
│   │   │   │   │   └── Total Daily Usage (e.g., 2.5L)
│   │   │   │   ├── Fan Status Card
│   │   │   │   │   ├── Speed Percentage (e.g., 40%)
│   │   │   │   │   ├── Power Consumption (e.g., 50W)
│   │   │   │   │   └── Auto/Manual Mode Toggle
│   │   │   ├── Charts Section
│   │   │   │   ├── VPD Trend Over Time Chart
│   │   │   │   │   ├── 24-hour Line Chart
│   │   │   │   │   ├── Growth Stage Zones (Seedling/Vegetative/Flowering)
│   │   │   │   │   └── Optimal Range Shading (0.8-1.2 kPa)
│   │   │   │   ├── Environmental Conditions Chart
│   │   │   │   │   ├── Multi-line Chart (CO₂, Light Intensity, Temperature)
│   │   │   │   │   └── Tooltip for Data Points
│   │   │   └── Water Schedule Status
│   │   │       ├── Current Time Marker (e.g., 11:14 AM)
│   │   │       ├── Next Watering Session Countdown (e.g., 46 min to 12:00 PM)
│   │   │       ├── Volume to be Dispensed (e.g., 300 mL)
│   │   │       └── Status (Active/Paused/Maintenance)
│   │   ├── Sensors Page
│   │   │   ├── Sensor Grid
│   │   │   │   ├── Temperature Sensors Card
│   │   │   │   │   ├── Sensor Name/ID (e.g., ACE Temperature #TH01)
│   │   │   │   │   ├── Connection Status
│   │   │   │   │   ├── Battery Level
│   │   │   │   │   ├── Last Reading
│   │   │   │   │   ├── Calibration Status
│   │   │   │   │   └── Signal Strength
│   │   │   │   ├── Humidity Sensors Card
│   │   │   │   ├── CO₂ Sensors Card
│   │   │   │   ├── Light Intensity Sensors Card
│   │   │   │   ├── Soil Moisture Sensors Card
│   │   │   │   └── pH Sensors Card
│   │   │   └── Sensor Management
│   │   │       ├── Add New Sensor Button
│   │   │       ├── Configuration Modal
│   │   │       ├── Calibration Scheduler
│   │   │       ├── Alert Threshold Settings
│   │   │       └── Data Logging Interval Selector
│   │   ├── Watering Schedule Page
│   │   │   ├── Schedule Overview
│   │   │   │   ├── Time-based Display (e.g., 7:00 AM Skip, 8:00 AM 100 mL)
│   │   │   │   └── Conditions (e.g., Low light, VPD ~0.9 kPa)
│   │   │   ├── Customization Features
│   │   │   │   ├── Drag-and-drop Time Adjustment
│   │   │   │   ├── Volume Sliders
│   │   │   │   ├── Conditional Rules Editor
│   │   │   │   ├── Growth Stage Dropdown
│   │   │   │   └── Plant Type Profiles
│   │   │   └── Dynamic Adjustments
│   │   │       ├── VPD Threshold Triggers
│   │   │       ├── Emergency Protocols
│   │   │       ├── Weather Integration
│   │   │       └── Manual Override
│   │   └── Statistics Page
│   │       ├── VPD Analytics
│   │       │   ├── Historical Trends
│   │       │   ├── Growth Stage Correlation
│   │       │   └── Optimal Range Compliance
│   │       ├── CO₂ Level Analysis
│   │       ├── Humidity Management
│   │       ├── Temperature Control
│   │       ├── Water Usage Statistics
│   │       └── System Performance Metrics
│   └── Sidebar (Desktop Only)
│       ├── Dashboard Link
│       ├── Sensors Link
│       ├── Schedule Link
        └── Stats Link


##### 1. Dashboard Page (Main)
- **Layout**: Single-column stack on mobile, transitioning to a 2x3 grid for status cards and a separate charts section on larger screens.
- **Components**:
  - **Top Navigation Bar**:
    - Logo (left-aligned)
    - Sector selector (e.g., "Spinach Garden 08")
    - Alert icon with badge (e.g., "3 Alerts")
    - User profile icon (right-aligned)
    - Hamburger menu for mobile (toggles sidebar)
  - **Status Cards Section** (2x3 Grid on Desktop, Stacked on Mobile):
    - **Card 1: VPD Status**
      - Current VPD value (e.g., "1.1 kPa")
      - Status indicator (Optimal/Warning/Critical)
      - Color coding: Green (#10B981) for 0.8-1.2 kPa, Yellow (#F59E0B) for 0.4-0.8 or 1.2-1.6 kPa, Red (#EF4444) for <0.4 or >1.6 kPa
      - Mini trend chart (line graph, 6-hour window)
    - **Card 2: CO₂ Levels**
      - Current ppm reading (e.g., "450 ppm")
      - Target range indicator (400-1200 ppm)
      - Historical trend arrow (↑/↓/→)
    - **Card 3: Humidity**
      - Current RH percentage (e.g., "82%")
      - Comfort zone indicator
      - Dew point calculation (e.g., "15°C")
    - **Card 4: Temperature**
      - Current temperature (e.g., "24°C")
      - Heat index (e.g., "H: 26°C, L: 22°C")
      - Min/Max daily readings
    - **Card 5: Water Pump Status**
      - Active/Inactive toggle
      - Current flow rate (e.g., "150 mL/min")
      - Next scheduled activation (e.g., "10:00 AM")
      - Total daily usage (e.g., "2.5L")
    - **Card 6: Fan Status**
      - Speed percentage (e.g., "40%")
      - Power consumption (e.g., "50W")
      - Auto/Manual mode toggle
  - **Charts Section**:
    - **Chart 1: VPD Trend Over Time**
      - Line chart (24-hour data)
      - Growth stage zones (Seedling, Vegetative, Flowering) as shaded areas
      - Optimal range (0.8-1.2 kPa) highlighted
    - **Chart 2: Environmental Conditions**
      - Multi-line chart (CO₂, Light Intensity, Temperature)
      - Tooltip for data points
  - **Water Schedule Status**:
    - Current time marker (e.g., "10:14 AM")
    - Next watering session countdown (e.g., "46 min to 11:00 AM")
    - Volume to be dispensed (e.g., "250 mL")
    - Status: Active/Paused/Maintenance (color-coded)

##### 2. Sensors Page
- **Layout**: Single-column list on mobile, grid on desktop.
- **Components**:
  - **Sensor Grid**:
    - Cards for each sensor type (Temperature, Humidity, CO₂, Light, Soil Moisture, pH)
    - Card Details:
      - Sensor Name/ID (e.g., "JLNew H10: Soil Moisture #SM201")
      - Connection Status (Online/Offline/Error, color-coded)
      - Battery Level (for wireless, e.g., "85%")
      - Last Reading (e.g., "09:37 AM")
      - Calibration Status (e.g., "Calibrated")
      - Signal Strength (bars or percentage)
  - **Sensor Management**:
    - "Add New Sensor" button
    - Modal for configuration (name, type, zone)
    - Calibration scheduler
    - Alert threshold settings
    - Data logging interval selector

##### 3. Watering Schedule Page
- **Layout**: Timeline view on mobile, table on desktop.
- **Components**:
  - **Schedule Overview**:
    - Time-based display with volumes and conditions (e.g., 8:00 AM: 100 mL, Light rising)
    - Data from document: 7:00 AM Skip, 8:00 AM 100 mL, etc.
  - **Customization Features**:
    - Drag-and-drop time adjustment
    - Volume sliders (e.g., 0-300 mL)
    - Conditional rules editor (e.g., +50 mL if CO₂ > 1000 ppm)
    - Growth stage dropdown (Seedling, Vegetative, Flowering)
    - Plant type profiles
  - **Dynamic Adjustments**:
    - VPD threshold triggers (foggers >1.6 kPa, ventilation <0.4 kPa)
    - Manual override switch
  - **Schedule Templates**:
    - Predefined templates (Seedling: 0.4-0.8 kPa, etc.)
    - Custom template save option

##### 4. Statistics Page
- **Layout**: Single-column charts on mobile, multi-column on desktop.
- **Components**:
  - **VPD Analytics**: Historical trends, growth stage correlation
  - **CO₂ Analysis**: Daily patterns, enhancement opportunities
  - **Humidity Management**: Trends, fungal risk periods
  - **Temperature Control**: Cycles, heat stress incidents
  - **Water Usage**: Consumption, efficiency metrics
  - **System Performance**: Uptime, maintenance alerts

#### Technical Implementation Details

- **Responsive Design Strategy**:
  - Mobile: `<640px` - Stack cards vertically, hide sidebar
  - Tablet: `640px-1024px` - Two-column grid
  - Desktop: `>1024px` - Sidebar + main content
- **Real-time Data Integration**:
  - WebSocket for live updates
  - Chart.js for dynamic rendering
- **Data Storage**:
  - LocalStorage for preferences
  - Offline caching
- **Performance Optimization**:
  - Lazy loading for charts
  - Efficient polling (e.g., 5s intervals)

#### User Experience Features
- **Dashboard Customization**:
  - Draggable cards (desktop)
  - Visibility toggles
  - Theme selector (light/dark)
- **Alert System**:
  - Visual badges, configurable sounds
  - Priority levels (Critical, Warning, Info)
- **Mobile Optimization**:
  - Touch-friendly buttons
  - Swipe navigation
  - Simplified dashboard

#### Color Scheme and Branding
- **Primary Colors**:
  - Green: `#10B981` (brand color)
  - Dark Green: `#059669` (accents)
  - Light Green: `#D1FAE5` (success)
- **Status Colors**:
  - Success: `#10B981`
  - Warning: `#F59E0B`
  - Error: `#EF4444`
  - Info: `#3B82F6`
- **Neutral Colors**:
  - Background: `#F9FAFB`
  - Cards: `#FFFFFF`
  - Text: `#111827`

