import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Button } from '@/Components/ui/button';
import {
    Thermometer,
    Droplets,
    Wind,
    Activity,
    Wifi,
    WifiOff,
    Battery,
    BatteryCharging,
    Settings,
    Plus,
    Signal,
    SignalHigh,
    SignalMedium,
    SignalLow
} from 'lucide-react';
import { ChartContainer } from '@/Components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Sensors() {
    const [sensors, setSensors] = useState([
        {
            id: 'TH01',
            name: 'ACE Temperature',
            type: 'Temperature',
            status: 'online',
            battery: 85,
            lastReading: '09:37 AM',
            calibration: 'calibrated',
            signalStrength: 'high',
            value: '24.2°C',
            icon: Thermometer
        },
        {
            id: 'SM201',
            name: 'JLNew H10: Soil Moisture',
            type: 'Soil Moisture',
            status: 'online',
            battery: 92,
            lastReading: '09:35 AM',
            calibration: 'calibrated',
            signalStrength: 'high',
            value: '65%',
            icon: Droplets
        },
        {
            id: 'CO201',
            name: 'SenseAir CO₂',
            type: 'CO₂',
            status: 'online',
            battery: 78,
            lastReading: '09:36 AM',
            calibration: 'calibrated',
            signalStrength: 'medium',
            value: '450 ppm',
            icon: Activity
        },
        {
            id: 'LI101',
            name: 'Apogee Light Sensor',
            type: 'Light Intensity',
            status: 'warning',
            battery: 45,
            lastReading: '09:30 AM',
            calibration: 'needs_calibration',
            signalStrength: 'low',
            value: '850 lux',
            icon: Activity
        },
        {
            id: 'PH01',
            name: 'Atlas Scientific pH',
            type: 'pH',
            status: 'offline',
            battery: 12,
            lastReading: '08:45 AM',
            calibration: 'expired',
            signalStrength: 'none',
            value: '6.8',
            icon: Activity
        },
        {
            id: 'HU01',
            name: 'Sensirion Humidity',
            type: 'Humidity',
            status: 'online',
            battery: 95,
            lastReading: '09:38 AM',
            calibration: 'calibrated',
            signalStrength: 'high',
            value: '82%',
            icon: Droplets
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-100 text-green-800';
            case 'warning': return 'bg-yellow-100 text-yellow-800';
            case 'offline': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSignalIcon = (strength) => {
        switch (strength) {
            case 'high': return <SignalHigh className="h-4 w-4 text-green-600" />;
            case 'medium': return <SignalMedium className="h-4 w-4 text-yellow-600" />;
            case 'low': return <SignalLow className="h-4 w-4 text-red-600" />;
            default: return <WifiOff className="h-4 w-4 text-gray-400" />;
        }
    };

    const getCalibrationColor = (calibration) => {
        switch (calibration) {
            case 'calibrated': return 'bg-green-100 text-green-800';
            case 'needs_calibration': return 'bg-yellow-100 text-yellow-800';
            case 'expired': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const batteryData = sensors.map(sensor => ({ name: sensor.name, battery: sensor.battery }));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Sensor Management
                    </h2>

                </div>
            }
        >
            <Head title="Sensor Management" />
            <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Sensor
                </Button>
            </div>
            <div className="py-6">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Sensor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sensors.map((sensor) => (
                            <Card key={sensor.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <sensor.icon className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-lg font-semibold dark:text-white">
                                                {sensor.name}
                                            </CardTitle>
                                        </div>
                                        <Badge className={getStatusColor(sensor.status)}>
                                            {sensor.status === 'online' ? (
                                                <Wifi className="h-3 w-3 mr-1" />
                                            ) : sensor.status === 'warning' ? (
                                                <Activity className="h-3 w-3 mr-1" />
                                            ) : (
                                                <WifiOff className="h-3 w-3 mr-1" />
                                            )}
                                            {sensor.status}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500 font-mono">
                                        #{sensor.id}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Current Value */}
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {sensor.value}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Last Reading: {sensor.lastReading}
                                            </div>
                                        </div>

                                        {/* Battery Level */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Battery</span>
                                                <span className="font-medium dark:text-gray-200">{sensor.battery}%</span>
                                            </div>
                                            <Progress
                                                value={sensor.battery}
                                                className="h-2"
                                            />
                                        </div>

                                        {/* Signal Strength */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Signal</span>
                                            <div className="flex items-center space-x-1">
                                                {getSignalIcon(sensor.signalStrength)}
                                                <span className="text-sm font-medium capitalize">
                                                    {sensor.signalStrength}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Calibration Status */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Calibration</span>
                                            <Badge className={getCalibrationColor(sensor.calibration)}>
                                                {sensor.calibration.replace('_', ' ')}
                                            </Badge>
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
                                                <Activity className="h-4 w-4 mr-1" />
                                                Calibrate
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sensor Management Section */}
                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold dark:text-white">
                                    Sensor Management Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Add New Sensor */}
                                    <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors">
                                        <Plus className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Add New Sensor</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            Configure and add a new sensor to your network
                                        </p>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Add Sensor
                                        </Button>
                                    </div>

                                    {/* Calibration Scheduler */}
                                    <div className="text-center p-4 border rounded-lg bg-blue-50">
                                        <Settings className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Calibration Scheduler</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            Schedule automatic calibration for your sensors
                                        </p>
                                        <Button variant="outline" className="border-blue-300 text-blue-700">
                                            Schedule
                                        </Button>
                                    </div>

                                    {/* Alert Settings */}
                                    <div className="text-center p-4 border rounded-lg bg-yellow-50">
                                        <Activity className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Alert Thresholds</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            Configure alert thresholds for sensor readings
                                        </p>
                                        <Button variant="outline" className="border-yellow-300 text-yellow-700">
                                            Configure
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className="mt-8">
                                    <h3 className="font-semibold text-gray-900 mb-2">Sensor Battery Levels</h3>
                                    <ChartContainer config={{ battery: { label: 'Battery', color: '#10B981' } }}>
                                        <BarChart data={batteryData} height={250} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Bar dataKey="battery" fill="#10B981" />
                                        </BarChart>
                                    </ChartContainer>
                                </div> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
