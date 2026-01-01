import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Switch } from '@/Components/ui/switch';
import { Button } from '@/Components/ui/button';
import { Slider } from '@/Components/ui/slider';
import {
    Lightbulb,
    Droplets,
    Wind,
    Zap,
    Power,
    PowerOff,
    Settings,
    Activity,
    Clock,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Gauge,
    Timer,
    RotateCcw
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

export default function Actuators() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [actuators, setActuators] = useState({
        growLights: {
            id: 'GL01',
            name: 'Grow Lights',
            status: 'on',
            power: 85,
            intensity: 75,
            schedule: {
                start: '06:00',
                end: '18:00',
                autoMode: true
            },
            lastReading: '09:45 AM',
            icon: Lightbulb,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            borderColor: 'border-yellow-200 dark:border-yellow-700'
        },
        waterPump: {
            id: 'WP01',
            name: 'Water Pump',
            status: 'off',
            power: 0,
            flowRate: 0,
            schedule: {
                nextActivation: '10:00 AM',
                duration: 5,
                autoMode: true
            },
            lastReading: '09:30 AM',
            icon: Droplets,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-700'
        },
        dehumidifier: {
            id: 'DH01',
            name: 'Dehumidifier',
            status: 'on',
            power: 60,
            humidity: 65,
            schedule: {
                targetHumidity: 70,
                autoMode: true
            },
            lastReading: '09:42 AM',
            icon: Wind,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-700'
        },
        fans: {
            id: 'FN01',
            name: 'Ventilation Fans',
            status: 'on',
            power: 40,
            speed: 60,
            schedule: {
                targetTemp: 24,
                autoMode: true
            },
            lastReading: '09:40 AM',
            icon: Wind,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-200 dark:border-purple-700'
        }
    });

    // Simulate real-time updates
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            // Simulate actuator data updates
            setActuators(prev => ({
                ...prev,
                growLights: {
                    ...prev.growLights,
                    power: prev.growLights.status === 'on' ? Math.max(0, Math.min(100, prev.growLights.power + (Math.random() - 0.5) * 5)) : 0
                },
                waterPump: {
                    ...prev.waterPump,
                    power: prev.waterPump.status === 'on' ? Math.max(0, Math.min(100, prev.waterPump.power + (Math.random() - 0.5) * 10)) : 0,
                    flowRate: prev.waterPump.status === 'on' ? Math.max(0, Math.min(200, prev.waterPump.flowRate + (Math.random() - 0.5) * 20)) : 0
                },
                dehumidifier: {
                    ...prev.dehumidifier,
                    power: prev.dehumidifier.status === 'on' ? Math.max(0, Math.min(100, prev.dehumidifier.power + (Math.random() - 0.5) * 8)) : 0,
                    humidity: Math.max(50, Math.min(90, prev.dehumidifier.humidity + (Math.random() - 0.5) * 3))
                },
                fans: {
                    ...prev.fans,
                    power: prev.fans.status === 'on' ? Math.max(0, Math.min(100, prev.fans.power + (Math.random() - 0.5) * 6)) : 0,
                    speed: prev.fans.status === 'on' ? Math.max(0, Math.min(100, prev.fans.speed + (Math.random() - 0.5) * 10)) : 0
                }
            }));
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const toggleActuator = (actuatorKey) => {
        setActuators(prev => ({
            ...prev,
            [actuatorKey]: {
                ...prev[actuatorKey],
                status: prev[actuatorKey].status === 'on' ? 'off' : 'on',
                power: prev[actuatorKey].status === 'on' ? 0 : (actuatorKey === 'growLights' ? 85 : actuatorKey === 'waterPump' ? 70 : actuatorKey === 'dehumidifier' ? 60 : 40)
            }
        }));
    };

    const updateIntensity = (actuatorKey, value) => {
        setActuators(prev => ({
            ...prev,
            [actuatorKey]: {
                ...prev[actuatorKey],
                intensity: value[0]
            }
        }));
    };

    const updateSpeed = (actuatorKey, value) => {
        setActuators(prev => ({
            ...prev,
            [actuatorKey]: {
                ...prev[actuatorKey],
                speed: value[0]
            }
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'on': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'off': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
            case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'on': return <Power className="h-4 w-4 text-green-600 dark:text-green-400" />;
            case 'off': return <PowerOff className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
            case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
            case 'error': return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
            default: return <PowerOff className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
        }
    };

    // Chart data for power consumption
    // const powerData = [
    //     { time: '00:00', growLights: 0, waterPump: 0, dehumidifier: 45, fans: 30 },
    //     { time: '04:00', growLights: 0, waterPump: 0, dehumidifier: 50, fans: 35 },
    //     { time: '06:00', growLights: 85, waterPump: 0, dehumidifier: 55, fans: 40 },
    //     { time: '08:00', growLights: 85, waterPump: 70, dehumidifier: 60, fans: 45 },
    //     { time: '12:00', growLights: 85, waterPump: 0, dehumidifier: 65, fans: 50 },
    //     { time: '16:00', growLights: 85, waterPump: 70, dehumidifier: 60, fans: 45 },
    //     { time: '18:00', growLights: 0, waterPump: 0, dehumidifier: 55, fans: 40 },
    //     { time: '20:00', growLights: 0, waterPump: 0, dehumidifier: 50, fans: 35 },
    //     { time: '24:00', growLights: 0, waterPump: 0, dehumidifier: 45, fans: 30 },
    // ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        AgriSense Controls
                    </h2>
                    <div className="flex items-center space-x-4 ml-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            All Systems Operational
                        </Badge>

                    </div>
                </div>
            }
        >
            <Head title="Actuator Control" />

            <div className="py-6">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Actuator Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {Object.entries(actuators).map(([key, actuator]) => (
                            <Card key={actuator.id} className={`${actuator.bgColor} ${actuator.borderColor} border-2 hover:shadow-lg transition-shadow`}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <actuator.icon className={`h-6 w-6 ${actuator.color}`} />
                                            <CardTitle className="text-lg font-semibold dark:text-white">
                                                {actuator.name}
                                            </CardTitle>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getStatusColor(actuator.status)}>
                                                {getStatusIcon(actuator.status)}
                                                {actuator.status}
                                            </Badge>
                                            <Switch
                                                checked={actuator.status === 'on'}
                                                onCheckedChange={() => toggleActuator(key)}
                                                className="data-[state=checked]:bg-green-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                        #{actuator.id}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Power Consumption */}
                                        {/* <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Power Consumption</span>
                                                <span className="font-medium">{actuator.power}W</span>
                                            </div>
                                            <Progress
                                                value={actuator.power}
                                                className="h-2"
                                            />
                                        </div> */}

                                        {/* Specific Controls */}
                                        {key === 'growLights' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-300">Intensity</span>
                                                    <span className="font-medium text-foreground">{actuator.intensity}%</span>
                                                </div>
                                                <Slider
                                                    value={[actuator.intensity]}
                                                    onValueChange={(value) => updateIntensity(key, value)}
                                                    max={100}
                                                    step={5}
                                                    className="w-full"
                                                />
                                            </div>
                                        )}

                                        {key === 'waterPump' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-300">Flow Rate</span>
                                                    <span className="font-medium text-foreground">{actuator.flowRate} mL/min</span>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Next: {actuator.schedule.nextActivation}
                                                </div>
                                            </div>
                                        )}

                                        {key === 'dehumidifier' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-300">Current Humidity</span>
                                                    <span className="font-medium text-foreground">{actuator.humidity}%</span>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Target: {actuator.schedule.targetHumidity}%
                                                </div>
                                            </div>
                                        )}

                                        {key === 'fans' && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-300">Speed</span>
                                                    <span className="font-medium text-foreground">{actuator.speed}%</span>
                                                </div>
                                                <Slider
                                                    value={[actuator.speed]}
                                                    onValueChange={(value) => updateSpeed(key, value)}
                                                    max={100}
                                                    step={10}
                                                    className="w-full"
                                                />
                                            </div>
                                        )}

                                        {/* Schedule Info */}
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Last Reading: {actuator.lastReading}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex space-x-2 pt-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Settings className="h-4 w-4 mr-1" />
                                                Configure
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Timer className="h-4 w-4 mr-1" />
                                                Schedule
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Power Consumption Chart */}
                    {/* <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Gauge className="h-5 w-5 mr-2 text-blue-600" />
                                Power Consumption Over Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{
                                growLights: { label: 'Grow Lights', color: '#F59E0B' },
                                waterPump: { label: 'Water Pump', color: '#3B82F6' },
                                dehumidifier: { label: 'Dehumidifier', color: '#10B981' },
                                fans: { label: 'Fans', color: '#8B5CF6' }
                            }}>
                                <LineChart data={powerData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="growLights" stroke="#F59E0B" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="waterPump" stroke="#3B82F6" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="dehumidifier" stroke="#10B981" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="fans" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card> */}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold dark:text-white">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center space-y-2"
                                    onClick={() => {
                                        setActuators(prev => ({
                                            ...prev,
                                            growLights: { ...prev.growLights, status: 'on' },
                                            waterPump: { ...prev.waterPump, status: 'on' },
                                            dehumidifier: { ...prev.dehumidifier, status: 'on' },
                                            fans: { ...prev.fans, status: 'on' }
                                        }));
                                    }}
                                >
                                    <Power className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    <span>All On</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center space-y-2"
                                    onClick={() => {
                                        setActuators(prev => ({
                                            ...prev,
                                            growLights: { ...prev.growLights, status: 'off' },
                                            waterPump: { ...prev.waterPump, status: 'off' },
                                            dehumidifier: { ...prev.dehumidifier, status: 'off' },
                                            fans: { ...prev.fans, status: 'off' }
                                        }));
                                    }}
                                >
                                    <PowerOff className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    <span>All Off</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center space-y-2"
                                >
                                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <span>Auto Mode</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center space-y-2"
                                >
                                    <RotateCcw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    <span>Reset All</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
