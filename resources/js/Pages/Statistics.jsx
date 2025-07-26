import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
    Calendar,
    Download,
    Filter,
    RefreshCw,
    Target,
    AlertTriangle,
    CheckCircle,
    Clock
} from 'lucide-react';
import { ChartContainer } from '@/Components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const vpdTrendData = [
    { day: 'Mon', vpd: 1.0 },
    { day: 'Tue', vpd: 1.1 },
    { day: 'Wed', vpd: 1.2 },
    { day: 'Thu', vpd: 1.05 },
    { day: 'Fri', vpd: 1.15 },
    { day: 'Sat', vpd: 1.08 },
    { day: 'Sun', vpd: 1.12 },
];

const waterUsageData = [
    { day: 'Mon', usage: 2.3 },
    { day: 'Tue', usage: 2.5 },
    { day: 'Wed', usage: 2.4 },
    { day: 'Thu', usage: 2.6 },
    { day: 'Fri', usage: 2.7 },
    { day: 'Sat', usage: 2.5 },
    { day: 'Sun', usage: 2.4 },
];

export default function Statistics() {
    const [timeRange, setTimeRange] = useState('7d');
    const [selectedMetric, setSelectedMetric] = useState('vpd');

    const metrics = {
        vpd: {
            current: 1.1,
            average: 1.05,
            trend: 'up',
            optimalRange: '0.8-1.2 kPa',
            compliance: 87
        },
        co2: {
            current: 450,
            average: 480,
            trend: 'down',
            optimalRange: '400-1200 ppm',
            compliance: 92
        },
        humidity: {
            current: 82,
            average: 78,
            trend: 'up',
            optimalRange: '60-80%',
            compliance: 85
        },
        temperature: {
            current: 24,
            average: 23.5,
            trend: 'up',
            optimalRange: '18-28°C',
            compliance: 94
        }
    };

    const performanceData = [
        { metric: 'System Uptime', value: '99.8%', status: 'excellent', trend: 'up' },
        { metric: 'Water Efficiency', value: '94.2%', status: 'good', trend: 'up' },
        { metric: 'Energy Consumption', value: '2.3 kWh', status: 'optimal', trend: 'down' },
        { metric: 'Maintenance Alerts', value: '2', status: 'warning', trend: 'stable' }
    ];

    const getTrendIcon = (trend) => {
        return trend === 'up' ?
            <TrendingUp className="h-4 w-4 text-green-600" /> :
            <TrendingDown className="h-4 w-4 text-red-600" />;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'excellent': return 'bg-green-100 text-green-800';
            case 'good': return 'bg-blue-100 text-blue-800';
            case 'optimal': return 'bg-green-100 text-green-800';
            case 'warning': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Analytics & Statistics
                    </h2>

                </div>
            }
        >
            <Head title="Analytics & Statistics" />
            <div className="flex justify-end">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="rounded-sm border border-gray-300 px-3 py-2 text-xs bg-white"
                        >
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>
                        <Button variant="outline" size="sm" className="ml-2">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Key Metrics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {Object.entries(metrics).map(([key, data]) => (
                            <Card key={key} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold capitalize">
                                            {key === 'vpd' ? 'VPD' : key === 'co2' ? 'CO₂' : key}
                                        </CardTitle>
                                        {getTrendIcon(data.trend)}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {data.current}
                                        {key === 'vpd' ? ' kPa' : key === 'co2' ? ' ppm' : key === 'humidity' ? '%' : '°C'}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        Avg: {data.average}
                                        {key === 'vpd' ? ' kPa' : key === 'co2' ? ' ppm' : key === 'humidity' ? '%' : '°C'}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-3">
                                        Optimal: {data.optimalRange}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Compliance</span>
                                        <Badge className="bg-green-100 text-green-800">
                                            {data.compliance}%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* VPD Analytics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                                    VPD Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{ vpd: { label: 'VPD', color: '#10B981' } }}>
                                    <LineChart data={vpdTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis domain={[0.8, 1.4]} />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="vpd" stroke="#10B981" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-lg font-bold text-green-600">87%</div>
                                        <div className="text-xs text-gray-600">Optimal Range</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-yellow-600">12%</div>
                                        <div className="text-xs text-gray-600">Warning Zone</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-red-600">1%</div>
                                        <div className="text-xs text-gray-600">Critical Zone</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CO₂ Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                                    CO₂ Level Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <span className="text-sm text-gray-500">Daily CO₂ Patterns</span>
                                        <div className="text-xs text-gray-400 mt-1">
                                            Enhancement Opportunities
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                                        <span className="text-sm">Peak Hours (10AM-2PM)</span>
                                        <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                                        <span className="text-sm">Night Hours (8PM-6AM)</span>
                                        <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Metrics */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Target className="h-5 w-5 mr-2 text-purple-600" />
                                System Performance Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {performanceData.map((item, index) => (
                                    <div key={index} className="text-center p-4 border rounded-lg">
                                        <div className="flex items-center justify-center mb-2">
                                            {getTrendIcon(item.trend)}
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            {item.value}
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            {item.metric}
                                        </div>
                                        <Badge className={getStatusColor(item.status)}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Humidity Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Humidity Management Trends
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                                    <div className="text-center">
                                        <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <span className="text-sm text-gray-500">Humidity Trends</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Fungal Risk Periods</span>
                                        <Badge className="bg-red-100 text-red-800">2 incidents</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Optimal Humidity</span>
                                        <Badge className="bg-green-100 text-green-800">85% time</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Temperature Control */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Temperature Control Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                                    <div className="text-center">
                                        <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <span className="text-sm text-gray-500">Temperature Cycles</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Heat Stress Incidents</span>
                                        <Badge className="bg-yellow-100 text-yellow-800">1 incident</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Optimal Range</span>
                                        <Badge className="bg-green-100 text-green-800">94% time</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Water Usage Statistics */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                                Water Usage Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{ usage: { label: 'Usage', color: '#3B82F6' } }}>
                                <BarChart data={waterUsageData} height={250} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="usage" fill="#3B82F6" />
                                </BarChart>
                            </ChartContainer>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">2.5L</div>
                                    <div className="text-sm text-gray-600 mb-2">Daily Usage</div>
                                    <div className="text-xs text-gray-500">Average over 7 days</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                                    <div className="text-sm text-gray-600 mb-2">Efficiency</div>
                                    <div className="text-xs text-gray-500">Water utilization rate</div>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                                    <div className="text-sm text-gray-600 mb-2">Sessions/Day</div>
                                    <div className="text-xs text-gray-500">Average watering sessions</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
