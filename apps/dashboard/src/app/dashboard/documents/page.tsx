'use client';

import { useState } from 'react';
import { FileText, Upload, Search, Download, Trash2, Folder } from 'lucide-react';

const mockDocuments = [
  {
    id: 1,
    name: 'Kullanıcı Kılavuzu.pdf',
    type: 'PDF',
    size: '2.5 MB',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-15',
    category: 'Kılavuzlar',
  },
  {
    id: 2,
    name: 'Sistem Gereksinimleri.docx',
    type: 'DOCX',
    size: '1.8 MB',
    uploadedBy: 'Fatma Demir',
    uploadDate: '2024-01-14',
    category: 'Dokümantasyon',
  },
  {
    id: 3,
    name: 'API Dokümantasyonu.pdf',
    type: 'PDF',
    size: '3.2 MB',
    uploadedBy: 'Mehmet Kaya',
    uploadDate: '2024-01-13',
    category: 'Teknik',
  },
  {
    id: 4,
    name: 'Veritabanı Şeması.sql',
    type: 'SQL',
    size: '0.5 MB',
    uploadedBy: 'Admin',
    uploadDate: '2024-01-12',
    category: 'Teknik',
  },
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [documents] = useState(mockDocuments);

  const categories = ['Tümü', 'Kılavuzlar', 'Dokümantasyon', 'Teknik'];

  const filteredDocuments = documents.filter(doc =>
    (selectedCategory === 'Tümü' || doc.category === selectedCategory) &&
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dokümanlar</h1>
          <p className="text-gray-600">Sistem dokümanlarını yönetin</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Doküman Yükle</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Doküman ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Folder className="w-4 h-4" />
                <span>{doc.category}</span>
              </div>
              <div className="text-sm text-gray-500">
                <p>Boyut: {doc.size}</p>
                <p>Yükleyen: {doc.uploadedBy}</p>
                <p>Tarih: {doc.uploadDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Doküman bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            Arama kriterlerinize uygun doküman bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
} 