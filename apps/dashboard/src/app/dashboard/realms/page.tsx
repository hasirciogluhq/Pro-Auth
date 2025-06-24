'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Building2, 
  Users, 
  Settings,
  Globe,
  Lock,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react';

const mockRealms = [
  {
    id: 1,
    name: 'company-prod',
    displayName: 'Company Production',
    description: 'Production realm for company applications',
    users: 1247,
    status: 'active',
    createdAt: '2024-01-15',
    environment: 'Production',
    domain: 'company.com',
    adminEmail: 'admin@company.com',
    features: ['OAuth', 'SAML', 'Email', 'Phone'],
    settings: {
      registrationAllowed: true,
      emailVerification: true,
      passwordPolicy: 'strong',
      sessionTimeout: 24,
    }
  },
  {
    id: 2,
    name: 'company-staging',
    displayName: 'Company Staging',
    description: 'Staging realm for testing and development',
    users: 89,
    status: 'active',
    createdAt: '2024-01-10',
    environment: 'Staging',
    domain: 'staging.company.com',
    adminEmail: 'dev-admin@company.com',
    features: ['OAuth', 'Email'],
    settings: {
      registrationAllowed: false,
      emailVerification: false,
      passwordPolicy: 'medium',
      sessionTimeout: 8,
    }
  },
  {
    id: 3,
    name: 'client-demo',
    displayName: 'Client Demo',
    description: 'Demo realm for client presentations',
    users: 23,
    status: 'inactive',
    createdAt: '2024-01-05',
    environment: 'Demo',
    domain: 'demo.client.com',
    adminEmail: 'demo@client.com',
    features: ['OAuth'],
    settings: {
      registrationAllowed: true,
      emailVerification: false,
      passwordPolicy: 'weak',
      sessionTimeout: 2,
    }
  },
  {
    id: 4,
    name: 'internal-dev',
    displayName: 'Internal Development',
    description: 'Internal development and testing realm',
    users: 156,
    status: 'active',
    createdAt: '2024-01-01',
    environment: 'Development',
    domain: 'dev.internal.com',
    adminEmail: 'dev@internal.com',
    features: ['OAuth', 'GitHub', 'Email'],
    settings: {
      registrationAllowed: true,
      emailVerification: true,
      passwordPolicy: 'medium',
      sessionTimeout: 12,
    }
  },
];

export default function RealmsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [realms] = useState(mockRealms);

  const filteredRealms = realms.filter(realm =>
    realm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    realm.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    realm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        {status}
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
        {status}
      </Badge>
    );
  };

  const getEnvironmentBadge = (environment: string) => {
    const variants = {
      'Production': 'destructive',
      'Staging': 'secondary',
      'Development': 'outline',
      'Demo': 'outline'
    } as const;
    
    return <Badge variant={variants[environment as keyof typeof variants]}>{environment}</Badge>;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Realms</h1>
          <p className="text-muted-foreground">
            Manage authentication realms and organizations
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Realm
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Realms</CardTitle>
          <CardDescription>
            Find realms by name, display name, or description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search realms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Realms Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Realms</CardTitle>
          <CardDescription>
            A list of all authentication realms in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Realm</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRealms.map((realm) => (
                <TableRow key={realm.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          <Building2 className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{realm.displayName}</div>
                        <div className="text-sm text-muted-foreground">@{realm.name}</div>
                        <div className="text-xs text-muted-foreground">{realm.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getEnvironmentBadge(realm.environment)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{realm.users.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {realm.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(realm.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{realm.adminEmail}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {realm.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Realm Settings Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Realm Settings Overview</CardTitle>
          <CardDescription>
            Quick overview of realm configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {realms.map((realm) => (
              <div key={realm.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{realm.displayName}</h3>
                  {getStatusBadge(realm.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Registration:</span>
                    <Badge variant={realm.settings.registrationAllowed ? "default" : "secondary"} className="text-xs">
                      {realm.settings.registrationAllowed ? 'Allowed' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Verification:</span>
                    <Badge variant={realm.settings.emailVerification ? "default" : "secondary"} className="text-xs">
                      {realm.settings.emailVerification ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Password Policy:</span>
                    <Badge variant="outline" className="text-xs">
                      {realm.settings.passwordPolicy}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Timeout:</span>
                    <span className="text-muted-foreground">{realm.settings.sessionTimeout}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 