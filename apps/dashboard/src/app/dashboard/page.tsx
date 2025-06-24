'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Shield, 
  Key, 
  Building2, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const authStats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12%',
    icon: Users,
    description: 'from last month',
  },
  {
    title: 'Active Sessions',
    value: '1,234',
    change: '+8%',
    icon: Shield,
    description: 'from last month',
  },
  {
    title: 'OAuth Providers',
    value: '6',
    change: '+2',
    icon: Key,
    description: 'new this month',
  },
  {
    title: 'Namespaces',
    value: '24',
    change: '+15%',
    icon: Building2,
    description: 'from last month',
  },
];

const recentActivities = [
  {
    action: 'New user registered via OAuth',
    time: '2 minutes ago',
    user: 'john.doe@example.com',
    status: 'success',
    provider: 'GitHub',
  },
  {
    action: 'Failed login attempt',
    time: '5 minutes ago',
    user: 'unknown@example.com',
    status: 'warning',
    provider: 'Email',
  },
  {
    action: 'User session expired',
    time: '10 minutes ago',
    user: 'jane.smith@example.com',
    status: 'info',
    provider: 'SAML',
  },
  {
    action: 'New OAuth provider added',
    time: '1 hour ago',
    user: 'Admin',
    status: 'success',
    provider: 'Google',
  },
  {
    action: 'Namespace created',
    time: '2 hours ago',
    user: 'admin@company.com',
    status: 'success',
    provider: 'System',
  },
];

const systemStatus = {
  overall: 'healthy',
  services: [
    { name: 'Authentication API', status: 'operational', uptime: '99.9%' },
    { name: 'OAuth Providers', status: 'operational', uptime: '99.8%' },
    { name: 'SAML Service', status: 'operational', uptime: '99.7%' },
    { name: 'Email Service', status: 'operational', uptime: '99.9%' },
  ]
};

export default function DashboardPage() {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Authentication Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}! Here's your authentication system overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {authStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest authentication events and user activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {activity.provider}
                      </Badge>
                    </div>
                  </div>
                  {getStatusIcon(activity.status)}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current status of authentication services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                  {systemStatus.overall}
                </Badge>
              </div>
              <div className="space-y-3">
                {systemStatus.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Detailed Status
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 