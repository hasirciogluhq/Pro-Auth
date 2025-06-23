'use client';

import { useAuth } from '@/hooks/useAuth';
import { Users, FileText, BarChart3, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Toplam Kullanıcı',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Toplam Doküman',
    value: '567',
    change: '+8%',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    title: 'Aylık Rapor',
    value: '89',
    change: '+15%',
    icon: BarChart3,
    color: 'bg-purple-500',
  },
  {
    title: 'Büyüme Oranı',
    value: '23%',
    change: '+5%',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Hoş geldin, {user?.username}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
              <span className="text-sm text-gray-600"> geçen aya göre</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Son Aktiviteler</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'Yeni kullanıcı kaydoldu',
                time: '2 saat önce',
                user: 'Ahmet Yılmaz',
              },
              {
                action: 'Doküman yüklendi',
                time: '4 saat önce',
                user: 'Fatma Demir',
              },
              {
                action: 'Rapor oluşturuldu',
                time: '6 saat önce',
                user: 'Mehmet Kaya',
              },
              {
                action: 'Sistem güncellendi',
                time: '1 gün önce',
                user: 'Admin',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 