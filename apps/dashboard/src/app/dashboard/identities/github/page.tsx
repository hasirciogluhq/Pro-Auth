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
  Github, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Code
} from 'lucide-react';

const githubConfig = {
  clientId: 'github-client-id-789',
  clientSecret: 'github-secret-012',
  redirectUri: 'https://app.company.com/auth/github/callback',
  scopes: ['user:email', 'read:user', 'read:org'],
  status: 'active',
  users: 234,
  lastSync: '5 minutes ago',
  organizations: ['company-org', 'dev-team', 'open-source'],
  webhookUrl: 'https://app.company.com/webhooks/github',
  webhookSecret: 'github-webhook-secret-345',
};

const githubStats = [
  {
    title: 'Connected Users',
    value: '234',
    change: '+12',
    icon: Users,
    description: 'this month',
  },
  {
    title: 'Organizations',
    value: '3',
    change: '+1',
    icon: Github,
    description: 'this month',
  },
  {
    title: 'Repositories',
    value: '156',
    change: '+23',
    icon: Code,
    description: 'this month',
  },
  {
    title: 'Success Rate',
    value: '99.2%',
    change: '+0.3%',
    icon: CheckCircle,
    description: 'from last month',
  },
];

export default function GitHubPage() {
  const [showSecrets, setShowSecrets] = useState(false);
  const [config, setConfig] = useState(githubConfig);

  const toggleStatus = () => {
    setConfig(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active'
    }));
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
          <h1 className="text-3xl font-bold tracking-tight">GitHub OAuth</h1>
          <p className="text-muted-foreground">
            Configure GitHub OAuth integration and organization access
          </p>
        </div>
        <Button>
          <Github className="w-4 h-4 mr-2" />
          Configure GitHub App
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {githubStats.map((stat) => (
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

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">GitHub OAuth App</CardTitle>
                    <CardDescription>
                      {config.users} users • Last sync: {config.lastSync}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(config.status)}
                  <Switch
                    checked={config.status === 'active'}
                    onCheckedChange={toggleStatus}
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
                      value={config.clientId}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(config.clientId)}
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
                      value={config.clientSecret}
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
                      onClick={() => copyToClipboard(config.clientSecret)}
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
                    value={config.redirectUri}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(config.redirectUri)}
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
                  {config.scopes.map((scope) => (
                    <Badge key={scope} variant="outline" className="text-xs">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Configuration
                </Button>
                <Button variant="outline">
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Organizations</CardTitle>
              <CardDescription>
                Manage access to GitHub organizations and teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {config.organizations.map((org) => (
                  <div key={org} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{org}</h3>
                        <p className="text-sm text-muted-foreground">GitHub Organization</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Connected</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  Add Organization
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Webhooks</CardTitle>
              <CardDescription>
                Configure webhooks for real-time GitHub events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={config.webhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(config.webhookUrl)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type={showSecrets ? 'text' : 'password'}
                    value={config.webhookSecret}
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
                    onClick={() => copyToClipboard(config.webhookSecret)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time updates from GitHub
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Authentication Logs</CardTitle>
              <CardDescription>
                Recent GitHub OAuth events and organization access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'GitHub login successful', user: 'john@example.com', org: 'company-org', time: '2 minutes ago', status: 'success' },
                  { action: 'Organization access granted', user: 'jane@example.com', org: 'dev-team', time: '5 minutes ago', status: 'success' },
                  { action: 'GitHub token refreshed', user: 'mike@example.com', org: 'company-org', time: '10 minutes ago', status: 'success' },
                  { action: 'Repository access denied', user: 'sarah@example.com', org: 'open-source', time: '1 hour ago', status: 'error' },
                  { action: 'Team membership updated', user: 'alex@example.com', org: 'dev-team', time: '2 hours ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user} • {log.org} • {log.time}
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