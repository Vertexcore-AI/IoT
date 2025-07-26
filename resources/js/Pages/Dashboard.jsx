import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import {
    Thermometer,
    Droplets,
    Wind,
    Zap,
    Activity,
    Clock,
    TrendingUp,
    TrendingDown,
    Minus,
    AlertTriangle,
    CheckCircle,
    XCircle,
    MapPin,
    Sun,
    Cloud,
    CloudRain,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { ChartContainer } from '@/Components/ui/chart';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Button } from '@/Components/ui/button';

const vpdData = [
    { time: '00:00', vpd: 1.0 },
    { time: '04:00', vpd: 1.1 },
    { time: '08:00', vpd: 1.2 },
    { time: '12:00', vpd: 1.3 },
    { time: '16:00', vpd: 1.1 },
    { time: '20:00', vpd: 1.0 },
    { time: '24:00', vpd: 1.05 },
];

const envData = [
    { time: '00:00', co2: 450, temp: 22, light: 0 },
    { time: '04:00', co2: 460, temp: 21, light: 10 },
    { time: '08:00', co2: 470, temp: 23, light: 100 },
    { time: '12:00', co2: 480, temp: 25, light: 300 },
    { time: '16:00', co2: 460, temp: 24, light: 200 },
    { time: '20:00', co2: 450, temp: 22, light: 50 },
    { time: '24:00', co2: 440, temp: 21, light: 0 },
];

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sensorData, setSensorData] = useState({
        vpd: 1.1,
        co2: 450,
        humidity: 82,
        temperature: 24,
        waterPump: {
            active: true,
            flowRate: 150,
            nextActivation: '10:00 AM',
            dailyUsage: 2.5
        },
        fan: {
            speed: 40,
            powerConsumption: 50,
            autoMode: true
        }
    });
    const [selectedPlot, setSelectedPlot] = useState('PL-02J'); // default to first plot

    // Simulate real-time updates
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            // Simulate sensor data updates
            setSensorData(prev => ({
                ...prev,
                vpd: prev.vpd + (Math.random() - 0.5) * 0.1,
                co2: prev.co2 + (Math.random() - 0.5) * 20,
                humidity: Math.max(60, Math.min(95, prev.humidity + (Math.random() - 0.5) * 2)),
                temperature: Math.max(18, Math.min(30, prev.temperature + (Math.random() - 0.5) * 0.5))
            }));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const getVPDStatus = (vpd) => {
        if (vpd >= 0.8 && vpd <= 1.2) return { status: 'Optimal', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle };
        if (vpd >= 0.4 && vpd <= 1.6) return { status: 'Warning', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: AlertTriangle };
        return { status: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: XCircle };
    };

    const getTrendIcon = (value, previousValue) => {
        if (value > previousValue) return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />;
        if (value < previousValue) return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />;
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    };

    const vpdStatus = getVPDStatus(sensorData.vpd);

    // Weather data simulation
    const weatherData = {
        location: "Uplands , Kandy",
        temperature: 24,
        weather: "Sunny",
        high: 26,
        low: 22,
        humidity: 65,
        windSpeed: 12
    };
    // Plot details for each plot
    const plotDetails = {
        'PL-02J': {
            name: 'Spinach Garden 08',
            id: 'PL-02J',
            area: '200 m²',
            color: 'text-green-800 dark:text-green-200',
            bg: 'bg-green-50 dark:bg-green-800',
            img: '/images/leaf.png',
            imgAlt: 'Spinach',
        },
        'PL-701': {
            name: 'Bell Pepper Patch',
            id: 'PL-701',
            area: '180 m²',
            color: 'text-orange-800 dark:text-orange-200',
            bg: 'bg-orange-50 dark:bg-orange-800',
            img: '/images/bell-pepper.png',
            imgAlt: 'Bell Pepper',
        },
    };

    // Collapsible status cards for mobile
    const statusCardKeys = [
        'vpd', 'co2', 'humidity', 'temperature', 'waterPump', 'fan'
    ];
    const [expandedCards, setExpandedCards] = useState(() => {
        // On mobile, all collapsed by default; on desktop, all expanded
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
            return Object.fromEntries(statusCardKeys.map(k => [k, true]));
        }
        return Object.fromEntries(statusCardKeys.map(k => [k, false]));
    });
    // Listen for resize to auto-expand on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setExpandedCards(Object.fromEntries(statusCardKeys.map(k => [k, true])));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleCard = (key) => {
        if (window.innerWidth >= 1024) return; // No toggle on desktop
        setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    AgriTech Dashboard
                </h2>
            }
        >
            <Head title="AgriTech Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Location and Weather Card */}
                    <div className="mb-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Location, Time, and Weather */}
                                    <div className="space-y-6">
                                        {/* Location and Time */}
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                <span className="text-lg font-medium text-foreground">
                                                    {weatherData.location}
                                                </span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {currentTime.toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {currentTime.toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </div>
                                        </div>

                                        {/* Weather Information */}
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-4xl font-bold text-foreground">
                                                    {weatherData.temperature}°C
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Sun className="h-8 w-8 text-yellow-500" />
                                                    <span className="text-lg font-medium text-muted-foreground">
                                                        {weatherData.weather}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                H: {weatherData.high}°C L: {weatherData.low}°C
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Droplets className="h-4 w-4 text-blue-500" />
                                                    <span>{weatherData.humidity}%</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Wind className="h-4 w-4 text-muted-foreground" />
                                                    <span>{weatherData.windSpeed} km/h</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Map/Plot Visualization */}
                                    <div className="space-y-4">
                                        <div className="bg-card rounded-lg p-4 border border-border">
                                            <div className="text-sm font-medium text-muted-foreground mb-3">Plot Overview</div>
                                            <div className="relative bg-muted rounded-lg p-3 h-32">
                                                {/* Interactive map representation */}
                                                <div className="grid grid-cols-2 gap-2 h-full">
                                                    {/* Spinach Plot */}
                                                    <div
                                                        className={`rounded border-2 relative overflow-hidden cursor-pointer transition-all duration-200 ${selectedPlot === 'PL-02J' ? 'bg-green-50 dark:bg-green-800 border-green-300 dark:border-green-600 scale-105 shadow-lg' : 'bg-card border-border'}`}
                                                        onClick={() => setSelectedPlot('PL-02J')}
                                                        style={{ zIndex: selectedPlot === 'PL-02J' ? 1 : 0 }}
                                                        aria-label="Select Spinach Plot"
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <img
                                                                src="/images/leaf.png"
                                                                alt="Spinach"
                                                                className="w-8 h-8 object-contain opacity-80"
                                                            />
                                                        </div>
                                                        <div className="absolute top-1 right-1">
                                                            <div className="bg-card rounded-full w-2 h-2 shadow-sm"></div>
                                                        </div>
                                                        <div className="absolute bottom-1 left-1 text-xs font-medium text-green-800 dark:text-green-200 bg-card/80 px-1 rounded">
                                                            PL-02J
                                                        </div>
                                                    </div>
                                                    {/* Bell Pepper Plot */}
                                                    <div
                                                        className={`rounded border-2 relative overflow-hidden cursor-pointer transition-all duration-200 ${selectedPlot === 'PL-701' ? 'bg-orange-50 dark:bg-orange-800 border-orange-200 dark:border-orange-600 scale-105 shadow-lg' : 'bg-card border-border'}`}
                                                        onClick={() => setSelectedPlot('PL-701')}
                                                        style={{ zIndex: selectedPlot === 'PL-701' ? 1 : 0 }}
                                                        aria-label="Select Bell Pepper Plot"
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <img
                                                                src="/images/bell-pepper.png"
                                                                alt="Bell Pepper"
                                                                className="w-8 h-8 object-contain opacity-80"
                                                            />
                                                        </div>
                                                        <div className="absolute top-1 right-1">
                                                            <div className="bg-card rounded-full w-2 h-2 shadow-sm"></div>
                                                        </div>
                                                        <div className="absolute bottom-1 left-1 text-xs font-medium text-orange-800 dark:text-orange-200 bg-card/80 px-1 rounded">
                                                            PL-701
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Plot Details (dynamic) */}
                                        <div className="bg-card rounded-lg p-4 transition-all duration-200">
                                            <div className="text-lg font-semibold text-foreground">{plotDetails[selectedPlot].name}</div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                ID: <span className={plotDetails[selectedPlot].color}>{plotDetails[selectedPlot].id}</span> • Area: {plotDetails[selectedPlot].area}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sector Selector */}


                    {/* Status Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* VPD Status Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold text-foreground">VPD Status</CardTitle>
                                    <Badge className={vpdStatus.color + ' ml-2'}>
                                        <vpdStatus.icon className="h-3 w-3 mr-1" />
                                        {vpdStatus.status}
                                    </Badge>
                                </div>
                                {/* Expand/Collapse button (mobile only) */}
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('vpd')} aria-label="Expand/collapse VPD card">
                                        {expandedCards.vpd ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.vpd || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground mb-2">
                                        {sensorData.vpd.toFixed(1)} kPa
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-4">
                                        Optimal Range: 0.8 - 1.2 kPa
                                    </div>

                                </CardContent>
                            )}
                        </Card>

                        {/* CO₂ Levels Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold text-foreground">CO₂ Levels</CardTitle>
                                    <span className="ml-2">{getTrendIcon(sensorData.co2, 440)}</span>
                                </div>
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('co2')} aria-label="Expand/collapse CO₂ card">
                                        {expandedCards.co2 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.co2 || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground mb-2">
                                        {sensorData.co2.toFixed(2)} ppm
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Target: 400-1200 ppm
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Humidity Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                                                                                        <Droplets className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                                        Humidity
                                    </CardTitle>
                                </div>
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('humidity')} aria-label="Expand/collapse Humidity card">
                                        {expandedCards.humidity ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.humidity || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground mb-2">
                                        {sensorData.humidity.toFixed(2)}%
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Comfort Zone: 60-80%
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Dew Point: 15°C
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Temperature Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                                        <Thermometer className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                                        Temperature
                                    </CardTitle>
                                </div>
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('temperature')} aria-label="Expand/collapse Temperature card">
                                        {expandedCards.temperature ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.temperature || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground mb-2">
                                        {sensorData.temperature.toFixed(2)}°C
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Heat Index: H: 26°C, L: 22°C
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Daily Range: 18-28°C
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Water Pump Status Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                                        <Zap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                                        Water Pump
                                    </CardTitle>
                                </div>
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('waterPump')} aria-label="Expand/collapse Water Pump card">
                                        {expandedCards.waterPump ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.waterPump || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-2xl font-bold text-foreground mb-2">
                                        {sensorData.waterPump.flowRate} mL/min
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Next: {sensorData.waterPump.nextActivation}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Daily: {sensorData.waterPump.dailyUsage}L
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Fan Status Card */}
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                                        <Wind className="h-5 w-5 mr-2 text-muted-foreground" />
                                        Fan Status
                                    </CardTitle>
                                </div>
                                <div className="lg:hidden">
                                    <Button variant="ghost" size="icon" onClick={() => toggleCard('fan')} aria-label="Expand/collapse Fan card">
                                        {expandedCards.fan ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            {(expandedCards.fan || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                                <CardContent>
                                    <div className="text-2xl font-bold text-foreground mb-2">
                                        {sensorData.fan.speed}%
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Power: {sensorData.fan.powerConsumption}W
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Mode: {sensorData.fan.autoMode ? 'Auto' : 'Manual'}
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* VPD Trend Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">VPD Trend Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{ vpd: { label: 'VPD', color: '#10B981' } }}>
                                    <LineChart data={vpdData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis domain={[0.8, 1.4]} />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="vpd" stroke="#10B981" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Environmental Conditions Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Environmental Conditions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{ co2: { label: 'CO₂', color: '#3B82F6' }, temp: { label: 'Temp', color: '#F59E0B' }, light: { label: 'Light', color: '#A3E635' } }}>
                                    <LineChart data={envData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="co2" stroke="#3B82F6" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="temp" stroke="#F59E0B" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="light" stroke="#A3E635" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Water Schedule Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                                Water Schedule Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Current Time</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">46 min</div>
                                    <div className="text-sm text-muted-foreground">To Next Session</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">300 mL</div>
                                    <div className="text-sm text-muted-foreground">Volume to Dispense</div>
                                </div>
                                <div className="text-center">
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Active
                                    </Badge>
                                    <div className="text-sm text-muted-foreground mt-1">Status</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
