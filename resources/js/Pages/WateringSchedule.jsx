import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Switch } from '@/Components/ui/switch';
import {
    Clock,
    Droplets,
    Settings,
    Play,
    Pause,
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { ChartContainer } from '@/Components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WateringSchedule() {
    const [schedule, setSchedule] = useState([
        { time: '7:00 AM', volume: 0, status: 'skip', condition: 'Low light' },
        { time: '8:00 AM', volume: 100, status: 'active', condition: 'Light rising' },
        { time: '9:00 AM', volume: 150, status: 'active', condition: 'VPD ~0.9 kPa' },
        { time: '10:00 AM', volume: 200, status: 'active', condition: 'Optimal conditions' },
        { time: '11:00 AM', volume: 250, status: 'active', condition: 'High VPD' },
        { time: '12:00 PM', volume: 300, status: 'active', condition: 'Peak conditions' },
        { time: '1:00 PM', volume: 250, status: 'active', condition: 'Afternoon' },
        { time: '2:00 PM', volume: 200, status: 'active', condition: 'Stable' },
        { time: '3:00 PM', volume: 150, status: 'active', condition: 'Cooling' },
        { time: '4:00 PM', volume: 100, status: 'active', condition: 'Evening' },
        { time: '5:00 PM', volume: 50, status: 'active', condition: 'Sunset' },
        { time: '6:00 PM', volume: 0, status: 'skip', condition: 'Night mode' }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [autoMode, setAutoMode] = useState(true);
    const [growthStage, setGrowthStage] = useState('vegetative');

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'skip': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
            case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <Play className="h-3 w-3" />;
            case 'skip': return <X className="h-3 w-3" />;
            case 'paused': return <Pause className="h-3 w-3" />;
            default: return <Clock className="h-3 w-3" />;
        }
    };

    const volumeData = schedule.map(item => ({ time: item.time, volume: item.volume }));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        AgriSense Schedule
                    </h2>

                </div>
            }
        >
            <Head title="Watering Schedule" />
            <div className="flex justify-end">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Auto Mode</span>
                            <Switch
                                checked={autoMode}
                                onCheckedChange={setAutoMode}
                                className="data-[state=checked]:bg-green-600"
                            />
                        </div>
                        <Button className="ml-2"
                            variant="outline"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </div>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Schedule Overview */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                Daily Watering Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {schedule.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`agrisense-card p-4 ${
                                            item.status === 'active'
                                                ? 'border-green-200 dark:border-green-700 dark:bg-green-900/20 dark:border-green-700'
                                                : item.status === 'skip'
                                                ? 'border-gray-200 dark:border-gray-700 dark:bg-gray-900/20 dark:border-gray-700'
                                                : 'border-yellow-200 dark:border-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {item.time}
                                            </span>
                                            <Badge className={getStatusColor(item.status)}>
                                                {getStatusIcon(item.status)}
                                                <span className="ml-1 capitalize">{item.status}</span>
                                            </Badge>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Droplets className="h-4 w-4 text-blue-600" />
                                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                {item.volume} mL
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.condition}
                                        </div>
                                        {isEditing && (
                                            <div className="mt-3 flex space-x-2">
                                                <Button size="sm" variant="outline" className="flex-1">
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-300 dark:text-red-400 dark:border-red-600">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customization Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Growth Stage Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Growth Stage Configuration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Current Growth Stage
                                    </label>
                                    <select
                                        value={growthStage}
                                        onChange={(e) => setGrowthStage(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-green-400"
                                    >
                                        <option value="seedling">Seedling (0.4-0.8 kPa)</option>
                                        <option value="vegetative">Vegetative (0.8-1.2 kPa)</option>
                                        <option value="flowering">Flowering (1.2-1.6 kPa)</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">VPD Thresholds</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Foggers Trigger</div>
                                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{'>1.6 kPa'}</div>
                                        </div>
                                        <div className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Ventilation Trigger</div>
                                            <div className="text-lg font-bold text-green-600 dark:text-green-400">{'<0.4 kPa'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Conditional Rules</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div>
                                                <div className="font-medium dark:text-gray-100">CO₂ Enhancement</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    +50 mL if CO₂ {'>'} 1000 ppm
                                                </div>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-green-600" />
                                            <div>
                                                <div className="font-medium dark:text-gray-100">High VPD Response</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    +100 mL if VPD {'>'} 1.4 kPa
                                                </div>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-green-600" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Volume Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Volume Controls
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Base Volume Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Minimum</label>
                                            <input
                                                type="number"
                                                defaultValue="0"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Maximum</label>
                                            <input
                                                type="number"
                                                defaultValue="300"
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Plant Type Profile
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-green-400">
                                        <option>Spinach (High Water)</option>
                                        <option>Tomato (Medium Water)</option>
                                        <option>Lettuce (Moderate Water)</option>
                                        <option>Herbs (Low Water)</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Emergency Protocols</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div>
                                                <div className="font-medium dark:text-gray-100">Drought Mode</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Reduce watering by 50%</div>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-red-600" />
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                                            <div>
                                                <div className="font-medium dark:text-gray-100">Flood Prevention</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Pause if soil {'>'} 90%</div>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-green-600" defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <Button className="w-full bg-green-600 hover:bg-green-700">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Configuration
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Water Volume by Hour
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{ volume: { label: 'Volume', color: '#3B82F6' } }}>
                                    <BarChart data={volumeData} height={250} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="volume" fill="#3B82F6" />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
