'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Key, 
  Mail, 
  Phone, 
  Lock,
  Settings,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  Unlink,
  Link
} from 'lucide-react';

const mockIdentities = [
  {
    id: 1,
    type: 'email',
    value: 'john.doe@company.com',
    status: 'verified',
    userId: 1,
    userName: 'John Doe',
    realm: 'company-prod',
    createdAt: '2024-01-15',
    lastUsed: '2 minutes ago',
    provider: 'SMTP',
    linked: true,
  },
  {
    id: 2,
    type: 'oauth',
    value: 'john.doe@gmail.com',
    status: 'verified',
    userId: 1,
    userName: 'John Doe',
    realm: 'company-prod',
    createdAt: '2024-01-10',
    lastUsed: '1 hour ago',
    provider: 'Google',
    linked: true,
  },
  {
    id: 3,
    type: 'phone',
    value: '+1234567890',
    status: 'verified',
    userId: 2,
    userName: 'Jane Smith',
    realm: 'company-prod',
    createdAt: '2024-01-12',
    lastUsed: '30 minutes ago',
    provider: 'Twilio',
    linked: true,
  },
  {
    id: 4,
    type: 'oauth',
    value: 'jane.smith@github.com',
    status: 'verified',
    userId: 2,
    userName: 'Jane Smith',
    realm: 'company-prod',
    createdAt: '2024-01-08',
    lastUsed: '2 hours ago',
    provider: 'GitHub',
    linked: true,
  },
  {
    id: 5,
    type: 'email',
    value: 'mike.johnson@company.com',
    status: 'pending',
    userId: 3,
    userName: 'Mike Johnson',
    realm: 'company-prod',
    createdAt: '2024-01-14',
    lastUsed: 'Never',
    provider: 'SMTP',
    linked: false,
  },
  {
    id: 6,
    type: 'oauth',
    value: 'alex.brown@microsoft.com',
    status: 'verified',
    userId: null,
    userName: null,
    realm: 'company-prod',
    createdAt: '2024-01-13',
    lastUsed: '1 day ago',
    provider: 'Microsoft',
    linked: false,
  },
  {
    id: 7,
    type: 'saml',
    value: 'sarah.wilson@company.com',
    status: 'verified',
    userId: 4,
    userName: 'Sarah Wilson',
    realm: 'company-prod',
    createdAt: '2024-01-11',
    lastUsed: '3 hours ago',
    provider: 'Azure AD',
    linked: true,
  },
];

const identityStats = [
  {
    title: 'Total Identities',
    value: '1,847',
    change: '+23',
    icon: Shield,
    description: 'this month',
  },
  {
    title: 'Linked Identities',
    value: '1,234',
    change: '+15',
    icon: Link,
    description: 'this month',
  },
  {
    title: 'Unlinked Identities',
    value: '613',
    change: '+8',
    icon: Unlink,
    description: 'this month',
  },
  {
    title: 'Verification Rate',
    value: '94.2%',
    change: '+2.1%',
    icon: CheckCircle,
    description: 'from last month',
  },
];

export default function IdentitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [identities] = useState(mockIdentities);

  const filteredIdentities = identities.filter(identity =>
    identity.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    identity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'verified' ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'oauth':
        return <Key className="w-4 h-4" />;
      case 'saml':
        return <Lock className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getLinkedBadge = (linked: boolean) => {
    return linked ? (
      <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
        <Link className="w-3 h-3 mr-1" />
        Linked
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        <Unlink className="w-3 h-3 mr-1" />
        Unlinked
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Identities</h1>
        <p className="text-muted-foreground">
          Manage user identities and authentication methods
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {identityStats.map((stat) => (
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

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Identities</CardTitle>
          <CardDescription>
            Find identities by email, phone, user name, or provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search identities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Identities Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Identities</CardTitle>
          <CardDescription>
            A list of all identities in your authentication system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Linked</TableHead>
                <TableHead>Realm</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIdentities.map((identity) => (
                <TableRow key={identity.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getTypeIcon(identity.type)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{identity.value}</div>
                        <div className="text-xs text-muted-foreground">ID: {identity.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(identity.type)}
                      <span className="capitalize">{identity.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {identity.userName ? (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{identity.userName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No user</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {identity.provider}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(identity.status)}</TableCell>
                  <TableCell>{getLinkedBadge(identity.linked)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{identity.realm}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {identity.lastUsed}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      {identity.linked ? (
                        <Button variant="ghost" size="icon" className="text-orange-600">
                          <Unlink className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-blue-600">
                          <Link className="h-4 w-4" />
                        </Button>
                      )}
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

      {/* Identity Types Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity Types</CardTitle>
            <CardDescription>
              Overview of different identity types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Email', count: 892, icon: Mail, color: 'text-blue-600' },
                { type: 'Phone', count: 456, icon: Phone, color: 'text-green-600' },
                { type: 'OAuth', count: 1847, icon: Key, color: 'text-purple-600' },
                { type: 'SAML', count: 234, icon: Lock, color: 'text-orange-600' },
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common identity management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Email Identity
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Phone Identity
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Link OAuth Account
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Bulk Operations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 