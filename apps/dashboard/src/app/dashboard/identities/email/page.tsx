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
  Mail, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  Send,
  CheckCircle,
  AlertTriangle,
  Clock,
  TestTube
} from 'lucide-react';

const emailProviders = [
  {
    id: 'smtp',
    name: 'SMTP',
    status: 'active',
    host: 'smtp.gmail.com',
    port: 587,
    username: 'noreply@company.com',
    password: 'smtp-password-123',
    encryption: 'TLS',
    lastTest: '2 minutes ago',
    success: true,
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    status: 'active',
    apiKey: 'SG.sendgrid-api-key-456',
    fromEmail: 'noreply@company.com',
    fromName: 'Company Auth',
    lastTest: '1 hour ago',
    success: true,
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    status: 'inactive',
    apiKey: 'mailgun-api-key-789',
    domain: 'mail.company.com',
    fromEmail: 'noreply@mail.company.com',
    lastTest: 'Never',
    success: false,
  },
];

const emailTemplates = [
  {
    id: 'verification',
    name: 'Email Verification',
    subject: 'Verify your email address',
    status: 'active',
    lastModified: '2 days ago',
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    subject: 'Reset your password',
    status: 'active',
    lastModified: '1 week ago',
  },
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to our platform',
    status: 'inactive',
    lastModified: '3 days ago',
  },
];

export default function EmailPage() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [providers, setProviders] = useState(emailProviders);
  const [templates, setTemplates] = useState(emailTemplates);

  const toggleProvider = (id: string) => {
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
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
          <h1 className="text-3xl font-bold tracking-tight">Email Authentication</h1>
          <p className="text-muted-foreground">
            Configure email providers and authentication templates
          </p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">Email Providers</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
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
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>
                          Last test: {provider.lastTest} • 
                          {provider.success ? (
                            <span className="text-green-600 ml-1">✓ Working</span>
                          ) : (
                            <span className="text-red-600 ml-1">✗ Failed</span>
                          )}
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
                  {provider.id === 'smtp' ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>SMTP Host</Label>
                        <Input value={provider.host} readOnly className="font-mono text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label>Port</Label>
                        <Input value={provider.port?.toString() || ''} readOnly className="font-mono text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input value={provider.username} readOnly className="font-mono text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showPasswords ? 'text' : 'password'}
                            value={provider.password}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showPasswords ? 'text' : 'password'}
                            value={provider.apiKey}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(provider.apiKey || '')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>From Email</Label>
                          <Input value={provider.fromEmail} readOnly className="font-mono text-sm" />
                        </div>
                        {provider.fromName && (
                          <div className="space-y-2">
                            <Label>From Name</Label>
                            <Input value={provider.fromName} readOnly className="font-mono text-sm" />
                          </div>
                        )}
                        {provider.domain && (
                          <div className="space-y-2">
                            <Label>Domain</Label>
                            <Input value={provider.domain} readOnly className="font-mono text-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>
                        Subject: {template.subject} • Last modified: {template.lastModified}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(template.status)}
                      <Switch
                        checked={template.status === 'active'}
                        onCheckedChange={() => toggleTemplate(template.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Subject</Label>
                    <Input value={template.subject} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Content</Label>
                    <Textarea
                      placeholder="Enter email template content..."
                      rows={6}
                      defaultValue={`Hello {{user.name}},

Please verify your email address by clicking the link below:

{{verification_link}}

If you didn't request this, please ignore this email.

Best regards,
The Team`}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Send Test
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Template
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
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Global email authentication configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require email verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Users must verify their email before accessing the platform
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow password reset via email</Label>
                  <p className="text-sm text-muted-foreground">
                    Users can reset their password using email links
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send welcome emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send welcome emails to new users
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email verification expiry</Label>
                  <p className="text-sm text-muted-foreground">
                    Set how long verification links remain valid
                  </p>
                </div>
                <Input type="number" defaultValue={24} className="w-20" />
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Logs</CardTitle>
              <CardDescription>
                Recent email authentication events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Verification email sent', user: 'john@example.com', time: '2 minutes ago', status: 'success' },
                  { action: 'Password reset email sent', user: 'jane@example.com', time: '5 minutes ago', status: 'success' },
                  { action: 'Email verification failed', user: 'mike@example.com', time: '10 minutes ago', status: 'error' },
                  { action: 'Welcome email sent', user: 'sarah@example.com', time: '1 hour ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.user} • {log.time}
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