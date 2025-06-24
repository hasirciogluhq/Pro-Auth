'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Key,
  Building2,
  LogOut,
  Menu,
  X,
  User,
  Globe,
  Mail,
  Phone,
  Github,
  Lock,
  FileText,
  Activity
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Realms',
    href: '/dashboard/realms',
    icon: Building2,
  },
  {
    title: 'Identities',
    href: '/dashboard/identities',
    icon: Shield,
    children: [
      { title: 'All Identities', href: '/dashboard/identities/all', icon: User },
      { title: 'Email Identities', href: '/dashboard/identities/email', icon: Mail },
      { title: 'Phone Identities', href: '/dashboard/identities/phone', icon: Phone },
      { title: 'OAuth Identities', href: '/dashboard/identities/oauth', icon: Key },
      { title: 'SAML Identities', href: '/dashboard/identities/saml', icon: Lock },
    ]
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/audit-logs',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { user, logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isChildActive = (children: any[]) => children?.some(child => pathname === child.href);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b px-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Auth Panel</h1>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.title);
              const active = isActive(item.href) || isChildActive(item.children || []);

              return (
                <div key={item.href}>
                  <Button
                    variant={active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      active && "bg-secondary"
                    )}
                    onClick={() => hasChildren ? toggleExpanded(item.title) : undefined}
                    asChild={!hasChildren}
                  >
                    {hasChildren ? (
                      <div className="flex items-center w-full">
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.title}
                        <div className="ml-auto">
                          <div className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded ? "rotate-180" : ""
                          )}>
                            ▼
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.title}
                      </Link>
                    )}
                  </Button>

                  {/* Children */}
                  {hasChildren && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={isActive(child.href) ? "secondary" : "ghost"}
                            size="sm"
                            className={cn(
                              "w-full justify-start text-sm",
                              isActive(child.href) && "bg-secondary"
                            )}
                          >
                            <child.icon className="w-3 h-3 mr-2" />
                            {child.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <Separator />

          {/* Logout */}
          <div className="p-4">
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-3" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 