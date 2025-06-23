'use client';

import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react';

const reports = [
  {
    id: 1,
    title: 'Aylık Kullanıcı Raporu',
    description: 'Ocak 2024 kullanıcı aktivite raporu',
    date: '2024-01-15',
    type: 'PDF',
    size: '2.3 MB',
  },
  {
    id: 2,
    title: 'Sistem Performans Raporu',
    description: 'Sistem performans metrikleri ve analizi',
    date: '2024-01-14',
    type: 'Excel',
    size: '1.8 MB',
  },
  {
    id: 3,
    title: 'Güvenlik Denetim Raporu',
    description: 'Güvenlik denetimi sonuçları',
    date: '2024-01-13',
    type: 'PDF',
    size: '3.1 MB',
  },
  {
    id: 4,
    title: 'Veritabanı Yedekleme Raporu',
    description: 'Veritabanı yedekleme durumu',
    date: '2024-01-12',
    type: 'CSV',
    size: '0.9 MB',
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
          <p className="text-gray-600">Sistem raporlarını görüntüleyin ve indirin</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>Yeni Rapor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Rapor</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bu Ay</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Büyüme</p>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Son Raporlar</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-500">{report.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{report.date}</p>
                    <p className="text-xs text-gray-500">{report.type} • {report.size}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 