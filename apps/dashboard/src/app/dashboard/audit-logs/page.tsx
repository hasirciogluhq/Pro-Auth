'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  User, 
  Shield,
  Key,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Eye,
  Settings,
  Calendar,
  Users,
  Activity
} from 'lucide-react';

const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2024-01-15 14:30:25',
    event: 'USER_LOGIN_SUCCESS',
    user: 'john.doe@company.com',
    userId: 1,
    realm: 'company-prod',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    provider: 'OAuth',
    providerType: 'Google',
    status: 'success',
    details: 'User logged in successfully via Google OAuth',
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:25:10',
    event: 'USER_LOGIN_FAILED',
    user: 'unknown@company.com',
    userId: null,
    realm: 'company-prod',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    provider: 'Email',
    providerType: 'SMTP',
    status: 'error',
    details: 'Invalid password provided',
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:20:15',
    event: 'IDENTITY_LINKED',
    user: 'jane.smith@company.com',
    userId: 2,
    realm: 'company-prod',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    provider: 'OAuth',
    providerType: 'GitHub',
    status: 'success',
    details: 'GitHub account linked to user profile',
  },
  {
    id: 4,
    timestamp: '2024-01-15 14:15:30',
    event: 'USER_REGISTERED',
    user: 'mike.johnson@company.com',
    userId: 3,
    realm: 'company-prod',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    provider: 'Email',
    providerType: 'SMTP',
    status: 'success',
    details: 'New user registered via email',
  },
  {
    id: 5,
    timestamp: '2024-01-15 14:10:45',
    event: 'PASSWORD_RESET_REQUESTED',
    user: 'sarah.wilson@company.com',
    userId: 4,
    realm: 'company-prod',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    provider: 'Email',
    providerType: 'SMTP',
    status: 'success',
    details: 'Password reset email sent',
  },
  {
    id: 6,
    timestamp: '2024-01-15 14:05:20',
    event: 'IDENTITY_VERIFIED',
    user: 'alex.brown@company.com',
    userId: 5,
    realm: 'company-prod',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    provider: 'Phone',
    providerType: 'Twilio',
    status: 'success',
    details: 'Phone number verified via SMS',
  },
  {
    id: 7,
    timestamp: '2024-01-15 14:00:10',
    event: 'SAML_LOGIN_SUCCESS',
    user: 'demo@client.com',
    userId: 6,
    realm: 'client-demo',
    ipAddress: '192.168.1.106',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    provider: 'SAML',
    providerType: 'Azure AD',
    status: 'success',
    details: 'User authenticated via SAML',
  },
  {
    id: 8,
    timestamp: '2024-01-15 13:55:35',
    event: 'USER_LOGOUT',
    user: 'john.doe@company.com',
    userId: 1,
    realm: 'company-prod',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    provider: 'Session',
    providerType: 'Internal',
    status: 'success',
    details: 'User logged out successfully',
  },
];

const auditStats = [
  {
    title: 'Total Events',
    value: '12,847',
    change: '+234',
    icon: Activity,
    description: 'today',
  },
  {
    title: 'Successful Logins',
    value: '8,234',
    change: '+156',
    icon: CheckCircle,
    description: 'today',
  },
  {
    title: 'Failed Attempts',
    value: '234',
    change: '+12',
    icon: XCircle,
    description: 'today',
  },
  {
    title: 'Security Events',
    value: '45',
    change: '+3',
    icon: AlertTriangle,
    description: 'today',
  },
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs] = useState(mockAuditLogs);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.realm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Success
        </Badge>;
      case 'error':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          Error
        </Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Warning
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventIcon = (event: string) => {
    if (event.includes('LOGIN')) return <User className="w-4 h-4" />;
    if (event.includes('REGISTER')) return <Users className="w-4 h-4" />;
    if (event.includes('IDENTITY')) return <Shield className="w-4 h-4" />;
    if (event.includes('PASSWORD')) return <Lock className="w-4 h-4" />;
    if (event.includes('SAML')) return <Lock className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'oauth':
        return <Key className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'saml':
        return <Lock className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">
            Monitor authentication events and security activities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {auditStats.map((stat) => (
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

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Audit Logs</CardTitle>
          <CardDescription>
            Find events by user, event type, provider, or realm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Events</CardTitle>
          <CardDescription>
            A chronological list of authentication and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Realm</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getEventIcon(log.event)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{log.event.replace(/_/g, ' ')}</div>
                        <div className="text-xs text-muted-foreground">{log.details}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getProviderIcon(log.provider)}
                      <div>
                        <div className="text-sm font-medium">{log.provider}</div>
                        <div className="text-xs text-muted-foreground">{log.providerType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {log.realm}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-muted-foreground">{log.ipAddress}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      <div>{log.timestamp.split(' ')[0]}</div>
                      <div>{log.timestamp.split(' ')[1]}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Event Types Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>
              Breakdown of audit events by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Login Events', count: 8234, icon: User, color: 'text-blue-600' },
                { type: 'Registration Events', count: 1234, icon: Users, color: 'text-green-600' },
                { type: 'Identity Events', count: 2345, icon: Shield, color: 'text-purple-600' },
                { type: 'Security Events', count: 1034, icon: AlertTriangle, color: 'text-orange-600' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <Badge variant="outline">{item.count.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>
              Recent security-related events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { alert: 'Multiple failed login attempts', user: 'unknown@company.com', time: '2 minutes ago', severity: 'high' },
                { alert: 'Suspicious IP address detected', user: 'john.doe@company.com', time: '15 minutes ago', severity: 'medium' },
                { alert: 'Password reset from new device', user: 'jane.smith@company.com', time: '1 hour ago', severity: 'low' },
                { alert: 'Account locked due to failed attempts', user: 'mike.johnson@company.com', time: '2 hours ago', severity: 'medium' },
              ].map((alert, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.alert}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.user} • {alert.time}
                    </p>
                  </div>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 