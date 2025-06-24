'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Key, 
  Plus, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const oauthProviders = [
  {
    id: 'google',
    name: 'Google',
    status: 'active',
    clientId: 'google-client-id-123',
    clientSecret: 'google-secret-456',
    redirectUri: 'https://app.company.com/auth/google/callback',
    scopes: ['openid', 'email', 'profile'],
    lastSync: '2 minutes ago',
    users: 847,
  },
  {
    id: 'github',
    name: 'GitHub',
    status: 'active',
    clientId: 'github-client-id-789',
    clientSecret: 'github-secret-012',
    redirectUri: 'https://app.company.com/auth/github/callback',
    scopes: ['user:email', 'read:user'],
    lastSync: '5 minutes ago',
    users: 234,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    status: 'inactive',
    clientId: 'ms-client-id-345',
    clientSecret: 'ms-secret-678',
    redirectUri: 'https://app.company.com/auth/microsoft/callback',
    scopes: ['openid', 'email', 'profile'],
    lastSync: 'Never',
    users: 0,
  },
  {
    id: 'apple',
    name: 'Apple',
    status: 'active',
    clientId: 'apple-client-id-901',
    clientSecret: 'apple-secret-234',
    redirectUri: 'https://app.company.com/auth/apple/callback',
    scopes: ['name', 'email'],
    lastSync: '1 hour ago',
    users: 156,
  },
];

export default function OAuthPage() {
  const [showSecrets, setShowSecrets] = useState(false);
  const [providers, setProviders] = useState(oauthProviders);

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
          <h1 className="text-3xl font-bold tracking-tight">OAuth Configuration</h1>
          <p className="text-muted-foreground">
            Manage OAuth 2.0 and OpenID Connect providers
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">Providers</TabsTrigger>
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
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>
                          {provider.users} users • Last sync: {provider.lastSync}
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
                      <Label>Client ID</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={provider.clientId}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(provider.clientId)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Client Secret</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type={showSecrets ? 'text' : 'password'}
                          value={provider.clientSecret}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowSecrets(!showSecrets)}
                        >
                          {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(provider.clientSecret)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Redirect URI</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={provider.redirectUri}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(provider.redirectUri)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Scopes</Label>
                    <div className="flex flex-wrap gap-1">
                      {provider.scopes.map((scope) => (
                        <Badge key={scope} variant="outline" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>

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

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>OAuth Settings</CardTitle>
              <CardDescription>
                Global OAuth configuration options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-redirect to OAuth</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically redirect users to OAuth providers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow multiple providers</Label>
                  <p className="text-sm text-muted-foreground">
                    Users can link multiple OAuth accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require email verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Verify email addresses from OAuth providers
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
              <CardTitle>OAuth Logs</CardTitle>
              <CardDescription>
                Recent OAuth authentication events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'OAuth login successful', provider: 'Google', user: 'john@example.com', time: '2 minutes ago', status: 'success' },
                  { action: 'OAuth login failed', provider: 'GitHub', user: 'unknown', time: '5 minutes ago', status: 'error' },
                  { action: 'OAuth account linked', provider: 'Microsoft', user: 'jane@example.com', time: '10 minutes ago', status: 'success' },
                  { action: 'OAuth token refreshed', provider: 'Apple', user: 'mike@example.com', time: '1 hour ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.provider} • {log.user} • {log.time}
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