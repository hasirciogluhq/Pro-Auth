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
  Settings, 
  Shield, 
  Key, 
  Mail, 
  Phone, 
  Lock,
  Globe,
  Users,
  Bell,
  Database,
  Save,
  RefreshCw
} from 'lucide-react';

const securitySettings = {
  sessionTimeout: 24,
  maxLoginAttempts: 5,
  lockoutDuration: 30,
  requireMFA: true,
  passwordMinLength: 8,
  passwordRequireSpecial: true,
  passwordRequireNumbers: true,
  passwordRequireUppercase: true,
};

const notificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  securityAlerts: true,
  userActivityReports: false,
  weeklyDigest: true,
};

export default function SettingsPage() {
  const [security, setSecurity] = useState(securitySettings);
  const [notifications, setNotifications] = useState(notificationSettings);

  const updateSecuritySetting = (key: string, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure authentication system settings and preferences
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and session management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Session Timeout (hours)</Label>
                  <Input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
                    min={1}
                    max={168}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={security.maxLoginAttempts}
                    onChange={(e) => updateSecuritySetting('maxLoginAttempts', parseInt(e.target.value))}
                    min={1}
                    max={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lockout Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={security.lockoutDuration}
                    onChange={(e) => updateSecuritySetting('lockoutDuration', parseInt(e.target.value))}
                    min={5}
                    max={1440}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password Min Length</Label>
                  <Input
                    type="number"
                    value={security.passwordMinLength}
                    onChange={(e) => updateSecuritySetting('passwordMinLength', parseInt(e.target.value))}
                    min={6}
                    max={50}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Multi-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Force users to enable MFA for their accounts
                    </p>
                  </div>
                  <Switch
                    checked={security.requireMFA}
                    onCheckedChange={(checked) => updateSecuritySetting('requireMFA', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain special characters
                    </p>
                  </div>
                  <Switch
                    checked={security.passwordRequireSpecial}
                    onCheckedChange={(checked) => updateSecuritySetting('passwordRequireSpecial', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Numbers</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain numbers
                    </p>
                  </div>
                  <Switch
                    checked={security.passwordRequireNumbers}
                    onCheckedChange={(checked) => updateSecuritySetting('passwordRequireNumbers', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Uppercase Letters</Label>
                    <p className="text-sm text-muted-foreground">
                      Passwords must contain uppercase letters
                    </p>
                  </div>
                  <Switch
                    checked={security.passwordRequireUppercase}
                    onCheckedChange={(checked) => updateSecuritySetting('passwordRequireUppercase', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  OAuth Settings
                </CardTitle>
                <CardDescription>
                  Configure OAuth provider behavior
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
                    <Label>Allow Multiple Providers</Label>
                    <p className="text-sm text-muted-foreground">
                      Users can link multiple OAuth accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Verify email addresses from OAuth providers
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Configure email authentication behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email before accessing
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Password Reset</Label>
                    <p className="text-sm text-muted-foreground">
                      Users can reset passwords via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Welcome Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send welcome emails
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone Settings
                </CardTitle>
                <CardDescription>
                  Configure phone authentication behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Phone Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their phone number
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow International Numbers</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable verification for international numbers
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Phone as Primary Auth</Label>
                    <p className="text-sm text-muted-foreground">
                      Users can use phone as primary method
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  SAML Settings
                </CardTitle>
                <CardDescription>
                  Configure SAML authentication behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SAML Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to authenticate via SAML
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-provision Users</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create accounts for new users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Signed Assertions</Label>
                    <p className="text-sm text-muted-foreground">
                      Require SAML assertions to be signed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure notification settings for authentication events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => updateNotificationSetting('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => updateNotificationSetting('smsNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about security events
                  </p>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => updateNotificationSetting('securityAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>User Activity Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reports about user activity
                  </p>
                </div>
                <Switch
                  checked={notifications.userActivityReports}
                  onCheckedChange={(checked) => updateNotificationSetting('userActivityReports', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summary emails
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) => updateNotificationSetting('weeklyDigest', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Advanced configuration options for the authentication system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Rate Limiting</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  defaultValue={1000}
                />
                <p className="text-sm text-muted-foreground">
                  Maximum API requests per minute per IP
                </p>
              </div>
              <div className="space-y-2">
                <Label>Log Retention (days)</Label>
                <Input
                  type="number"
                  placeholder="90"
                  defaultValue={90}
                />
                <p className="text-sm text-muted-foreground">
                  How long to keep authentication logs
                </p>
              </div>
              <div className="space-y-2">
                <Label>Custom CSS</Label>
                <Textarea
                  placeholder="Enter custom CSS for login pages..."
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Custom styles for authentication pages
                </p>
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  placeholder="https://your-app.com/webhooks/auth"
                />
                <p className="text-sm text-muted-foreground">
                  URL to receive authentication events
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 