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
  Phone, 
  Settings, 
  Eye, 
  EyeOff,
  Copy,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock,
  TestTube
} from 'lucide-react';

const smsProviders = [
  {
    id: 'twilio',
    name: 'Twilio',
    status: 'active',
    accountSid: 'AC.twilio-account-sid-123',
    authToken: 'twilio-auth-token-456',
    fromNumber: '+1234567890',
    lastTest: '2 minutes ago',
    success: true,
    messagesSent: 1247,
  },
  {
    id: 'vonage',
    name: 'Vonage',
    status: 'active',
    apiKey: 'vonage-api-key-789',
    apiSecret: 'vonage-api-secret-012',
    fromNumber: '+0987654321',
    lastTest: '1 hour ago',
    success: true,
    messagesSent: 892,
  },
  {
    id: 'aws-sns',
    name: 'AWS SNS',
    status: 'inactive',
    accessKeyId: 'AKIA.aws-access-key-345',
    secretAccessKey: 'aws-secret-key-678',
    region: 'us-east-1',
    lastTest: 'Never',
    success: false,
    messagesSent: 0,
  },
];

const phoneSettings = {
  verificationCodeLength: 6,
  codeExpiryMinutes: 10,
  maxAttempts: 3,
  allowInternational: true,
  defaultCountryCode: '+1',
};

export default function PhonePage() {
  const [showSecrets, setShowSecrets] = useState(false);
  const [providers, setProviders] = useState(smsProviders);

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
          <h1 className="text-3xl font-bold tracking-tight">Phone Authentication</h1>
          <p className="text-muted-foreground">
            Configure SMS providers and phone verification settings
          </p>
        </div>
        <Button>
          <Phone className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">SMS Providers</TabsTrigger>
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
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>
                          {provider.messagesSent.toLocaleString()} messages sent • 
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
                  {provider.id === 'twilio' ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Account SID</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.accountSid}
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
                            onClick={() => copyToClipboard(provider.accountSid)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Auth Token</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.authToken}
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
                            onClick={() => copyToClipboard(provider.authToken)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>From Number</Label>
                        <Input value={provider.fromNumber} readOnly className="font-mono text-sm" />
                      </div>
                    </div>
                  ) : provider.id === 'vonage' ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.apiKey}
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
                            onClick={() => copyToClipboard(provider.apiKey || '')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>API Secret</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.apiSecret}
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
                            onClick={() => copyToClipboard(provider.apiSecret || '')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>From Number</Label>
                        <Input value={provider.fromNumber} readOnly className="font-mono text-sm" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Access Key ID</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.accessKeyId}
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
                            onClick={() => copyToClipboard(provider.accessKeyId || '')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Secret Access Key</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showSecrets ? 'text' : 'password'}
                            value={provider.secretAccessKey}
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
                            onClick={() => copyToClipboard(provider.secretAccessKey || '')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>AWS Region</Label>
                        <Input value={provider.region} readOnly className="font-mono text-sm" />
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

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phone Authentication Settings</CardTitle>
              <CardDescription>
                Configure phone verification behavior and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Verification Code Length</Label>
                  <Input 
                    type="number" 
                    value={phoneSettings.verificationCodeLength} 
                    min={4} 
                    max={8}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Code Expiry (minutes)</Label>
                  <Input 
                    type="number" 
                    value={phoneSettings.codeExpiryMinutes} 
                    min={1} 
                    max={60}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Attempts</Label>
                  <Input 
                    type="number" 
                    value={phoneSettings.maxAttempts} 
                    min={1} 
                    max={10}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Default Country Code</Label>
                  <Input 
                    value={phoneSettings.defaultCountryCode} 
                    className="w-20"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow International Numbers</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable phone verification for international phone numbers
                  </p>
                </div>
                <Switch checked={phoneSettings.allowInternational} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Phone Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Users must verify their phone number before accessing the platform
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Phone as Primary Auth</Label>
                  <p className="text-sm text-muted-foreground">
                    Users can use phone number as their primary authentication method
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
              <CardTitle>Phone Authentication Logs</CardTitle>
              <CardDescription>
                Recent phone verification events and SMS delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'SMS verification sent', phone: '+1234567890', time: '2 minutes ago', status: 'success' },
                  { action: 'Verification code verified', phone: '+1234567890', time: '3 minutes ago', status: 'success' },
                  { action: 'SMS delivery failed', phone: '+0987654321', time: '5 minutes ago', status: 'error' },
                  { action: 'Max attempts exceeded', phone: '+1122334455', time: '10 minutes ago', status: 'warning' },
                  { action: 'Phone number linked', phone: '+1555666777', time: '1 hour ago', status: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      log.status === 'success' ? 'bg-green-500' : 
                      log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.phone} • {log.time}
                      </p>
                    </div>
                    <Badge variant={
                      log.status === 'success' ? 'default' : 
                      log.status === 'error' ? 'destructive' : 'secondary'
                    } className="text-xs">
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