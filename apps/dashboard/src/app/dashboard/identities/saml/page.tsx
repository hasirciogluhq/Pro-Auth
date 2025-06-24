'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Building2
} from 'lucide-react';

const samlProviders = [
  {
    id: 'azure-ad',
    name: 'Azure Active Directory',
    status: 'active',
    entityId: 'https://sts.windows.net/company-tenant-id/',
    ssoUrl: 'https://login.microsoftonline.com/company-tenant-id/saml2',
    x509Certificate: 'MIIDXTCCAkWgAwIBAgIJAKoK...',
    lastSync: '2 minutes ago',
    users: 847,
    groups: ['All Users', 'Developers', 'Admins'],
  },
  {
    id: 'okta',
    name: 'Okta',
    status: 'active',
    entityId: 'https://company.okta.com/app/company-app-id',
    ssoUrl: 'https://company.okta.com/app/company-app-id/sso/saml',
    x509Certificate: 'MIIDXTCCAkWgAwIBAgIJAKoK...',
    lastSync: '1 hour ago',
    users: 234,
    groups: ['Engineering', 'Sales', 'Marketing'],
  },
  {
    id: 'onelogin',
    name: 'OneLogin',
    status: 'inactive',
    entityId: 'https://company.onelogin.com/saml/metadata/app-id',
    ssoUrl: 'https://company.onelogin.com/trust/saml2/http-post/sso/app-id',
    x509Certificate: 'MIIDXTCCAkWgAwIBAgIJAKoK...',
    lastSync: 'Never',
    users: 0,
    groups: [],
  },
];

const samlStats = [
  {
    title: 'Connected Users',
    value: '1,081',
    change: '+45',
    icon: Users,
    description: 'this month',
  },
  {
    title: 'Active Providers',
    value: '2',
    change: '+1',
    icon: Lock,
    description: 'this month',
  },
  {
    title: 'Groups Synced',
    value: '5',
    change: '+2',
    icon: Building2,
    description: 'this month',
  },
  {
    title: 'Success Rate',
    value: '99.5%',
    change: '+0.1%',
    icon: CheckCircle,
    description: 'from last month',
  },
];

export default function SAMLPage() {
  const [showCertificates, setShowCertificates] = useState(false);
  const [providers, setProviders] = useState(samlProviders);

  const toggleProvider = (id: string) => {
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        <Clock className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SAML Configuration</h1>
          <p className="text-muted-foreground">
            Configure SAML 2.0 enterprise authentication providers
          </p>
        </div>
        <Button>
          <Lock className="w-4 h-4 mr-2" />
          Add SAML Provider
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {samlStats.map((stat) => (
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

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">SAML Providers</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid gap-6">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>
                          {provider.users} users • {provider.groups.length} groups • Last sync: {provider.lastSync}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(provider.status)}
                      <Switch
                        checked={provider.status === 'active'}
                        onCheckedChange={() => toggleProvider(provider.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Entity ID</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={provider.entityId}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(provider.entityId)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>SSO URL</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={provider.ssoUrl}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(provider.ssoUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>X.509 Certificate</Label>
                    <div className="flex items-center space-x-2">
                      <Textarea
                        value={provider.x509Certificate}
                        readOnly
                        rows={4}
                        className="font-mono text-xs"
                      />
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowCertificates(!showCertificates)}
                        >
                          {showCertificates ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(provider.x509Certificate)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {provider.groups.length > 0 && (
                    <div className="space-y-2">
                      <Label>Synced Groups</Label>
                      <div className="flex flex-wrap gap-1">
                        {provider.groups.map((group) => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline">
                      Test Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SAML Metadata</CardTitle>
              <CardDescription>
                Download and configure SAML metadata for your identity providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Service Provider Entity ID</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value="https://app.company.com/saml/metadata"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard('https://app.company.com/saml/metadata')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>ACS URL (Assertion Consumer Service)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value="https://app.company.com/saml/acs"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard('https://app.company.com/saml/acs')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>SAML Metadata XML</Label>
                <div className="flex items-start space-x-2">
                  <Textarea
                    value={`<?xml version="1.0"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="https://app.company.com/saml/metadata">
  <md:SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://app.company.com/saml/acs"/>
  </md:SPSSODescriptor>
</md:EntityDescriptor>`}
                    readOnly
                    rows={8}
                    className="font-mono text-xs"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard('SAML metadata XML content')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import IdP Metadata
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download SP Metadata
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SAML Settings</CardTitle>
              <CardDescription>
                Configure SAML authentication behavior and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable SAML Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to authenticate via SAML providers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-provision Users</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create user accounts for new SAML users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sync User Attributes</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync user profile data from SAML assertions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Signed Assertions</Label>
                  <p className="text-sm text-muted-foreground">
                    Require SAML assertions to be digitally signed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Just-in-Time Provisioning</Label>
                  <p className="text-sm text-muted-foreground">
                    Create user accounts on first SAML login
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SAML Authentication Logs</CardTitle>
              <CardDescription>
                Recent SAML authentication events and user provisioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'SAML login successful', user: 'john@company.com', provider: 'Azure AD', time: '2 minutes ago', status: 'success' },
                  { action: 'User provisioned', user: 'jane@company.com', provider: 'Okta', time: '5 minutes ago', status: 'success' },
                  { action: 'SAML assertion invalid', user: 'unknown@company.com', provider: 'Azure AD', time: '10 minutes ago', status: 'error' },
                  { action: 'Group membership synced', user: 'mike@company.com', provider: 'Okta', time: '1 hour ago', status: 'success' },
                  { action: 'SAML logout successful', user: 'sarah@company.com', provider: 'Azure AD', time: '2 hours ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user} • {log.provider} • {log.time}
                      </p>
                    </div>
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                      {log.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 