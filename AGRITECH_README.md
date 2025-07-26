# AgriTech Dashboard Implementation

## Overview

This implementation creates a comprehensive AgriTech web platform dashboard using Laravel, Inertia.js, React, and shadcn/ui components. The platform provides real-time monitoring, VPD (Vapor Pressure Deficit) management, automated irrigation, and environmental control for greenhouse farming.

## Features Implemented

### 1. Dashboard Page (`/dashboard`)
- **Real-time Status Cards**: VPD, CO₂, Humidity, Temperature, Water Pump, Fan Status
- **Dynamic Status Indicators**: Color-coded status badges (Optimal/Warning/Critical)
- **Interactive Controls**: Toggle switches for water pump and fan controls
- **Live Data Simulation**: Simulated sensor data updates every 5 seconds
- **Water Schedule Status**: Countdown timer and volume indicators
- **Chart Placeholders**: Ready for Chart.js integration

### 2. Sensors Page (`/sensors`)
- **Sensor Grid**: Cards for Temperature, Humidity, CO₂, Light, Soil Moisture, pH sensors
- **Real-time Status**: Online/Offline/Warning status indicators
- **Battery Monitoring**: Progress bars for battery levels
- **Signal Strength**: Visual indicators for wireless signal quality
- **Calibration Status**: Badge indicators for sensor calibration
- **Management Tools**: Add new sensor, calibration scheduler, alert thresholds

### 3. Watering Schedule Page (`/watering-schedule`)
- **Timeline View**: 24-hour watering schedule with volumes and conditions
- **Interactive Controls**: Edit mode for schedule customization
- **Growth Stage Configuration**: Seedling, Vegetative, Flowering stages
- **VPD Thresholds**: Automatic triggers for foggers and ventilation
- **Conditional Rules**: CO₂ enhancement and high VPD response rules
- **Emergency Protocols**: Drought mode and flood prevention settings

### 4. Statistics Page (`/statistics`)
- **Analytics Dashboard**: VPD, CO₂, Humidity, Temperature analytics
- **Performance Metrics**: System uptime, water efficiency, energy consumption
- **Compliance Tracking**: Percentage compliance for optimal ranges
- **Trend Analysis**: Historical data visualization placeholders
- **Export Functionality**: Data export capabilities

## Technical Implementation

### Technology Stack
- **Backend**: Laravel 11 with Inertia.js
- **Frontend**: React 19 with TypeScript support
- **UI Components**: shadcn/ui v4 components
- **Styling**: Tailwind CSS with custom AgriTech theme
- **Icons**: Lucide React icons
- **State Management**: React hooks for local state

### Key Components Used
- **Card**: Primary container for all dashboard elements
- **Badge**: Status indicators and labels
- **Progress**: Battery levels and percentage displays
- **Switch**: Toggle controls for automation
- **Button**: Action buttons with variants
- **Sheet**: Mobile navigation overlay

### Design System
- **Color Scheme**: Green-based theme (#10B981 primary)
- **Status Colors**: Green (Optimal), Yellow (Warning), Red (Critical)
- **Responsive Design**: Mobile-first approach with breakpoints
- **Typography**: Consistent font hierarchy and spacing

### Responsive Breakpoints
- **Mobile**: <640px (single column)
- **Tablet**: 640px-1024px (two-column grid)
- **Desktop**: >1024px (full grid with sidebar)

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - Navigate to the dashboard at `/dashboard`
   - Use the navigation to access Sensors, Schedule, and Statistics pages

## File Structure

```
resources/js/
├── Components/
│   └── ui/                    # shadcn/ui components
│       ├── card.jsx
│       ├── badge.jsx
│       ├── progress.jsx
│       ├── switch.jsx
│       ├── button.jsx
│       └── sheet.jsx
├── Layouts/
│   └── AuthenticatedLayout.jsx # Updated with navigation
├── Pages/
│   ├── Dashboard.jsx          # Main dashboard
│   ├── Sensors.jsx            # Sensor management
│   ├── WateringSchedule.jsx   # Schedule management
│   └── Statistics.jsx         # Analytics
└── lib/
    └── utils.js               # Utility functions
```

## Routes Added

- `/dashboard` - Main AgriTech dashboard
- `/sensors` - Sensor management interface
- `/watering-schedule` - Watering schedule management
- `/statistics` - Analytics and statistics

## Customization

### Adding Real Charts
Replace chart placeholders with Chart.js integration:
```javascript
import { Line } from 'react-chartjs-2';
```

### Real-time Data Integration
Replace simulated data with WebSocket connections or API calls:
```javascript
// Example WebSocket integration
useEffect(() => {
  const ws = new WebSocket('ws://your-api/sensors');
  ws.onmessage = (event) => {
    setSensorData(JSON.parse(event.data));
  };
}, []);
```

### Adding More Sensors
Extend the sensors array in `Sensors.jsx` with new sensor types and configurations.

## Future Enhancements

1. **Real-time Charts**: Integrate Chart.js for live data visualization
2. **WebSocket Integration**: Real-time sensor data updates
3. **Mobile App**: React Native companion app
4. **AI Integration**: Predictive analytics and automated adjustments
5. **Weather Integration**: External weather API for enhanced scheduling
6. **Multi-tenant Support**: Multiple greenhouse management

## Performance Optimizations

- Lazy loading for chart components
- Efficient polling intervals (5-second updates)
- Optimistic UI updates for better UX
- Proper error boundaries and fallbacks

This implementation provides a solid foundation for a modern AgriTech dashboard with all the essential features for greenhouse automation and monitoring. 
