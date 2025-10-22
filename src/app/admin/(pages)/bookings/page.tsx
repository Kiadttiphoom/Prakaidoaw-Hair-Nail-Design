'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Scissors, Search, Filter, Plus, Phone, Mail, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Eye } from 'lucide-react';

type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  date: string;
  time: string;
  customer: string;
  phone: string;
  email: string;
  service: string;
  stylist: string;
  duration: string;
  price: string;
  status: BookingStatus;
  notes?: string;
}

export default function AdminBooking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const bookings: Booking[] = [
    {
      id: 'BK001',
      date: '2025-10-22',
      time: '09:00',
      customer: 'คุณสมหญิง ใจดี',
      phone: '081-234-5678',
      email: 'somying@email.com',
      service: 'ตัดผม + สระ',
      stylist: 'พี่มิ้น',
      duration: '1 ชม.',
      price: '350',
      status: 'confirmed',
      notes: 'ต้องการทรงสั้น'
    },
    {
      id: 'BK002',
      date: '2025-10-22',
      time: '10:30',
      customer: 'คุณนภา สวยงาม',
      phone: '082-345-6789',
      email: 'napa@email.com',
      service: 'ดัดผม',
      stylist: 'พี่เจน',
      duration: '2.5 ชม.',
      price: '1,800',
      status: 'pending'
    },
    {
      id: 'BK003',
      date: '2025-10-22',
      time: '13:00',
      customer: 'คุณอารยา มีสไตล์',
      phone: '083-456-7890',
      email: 'araya@email.com',
      service: 'ย้อมสี',
      stylist: 'พี่มิ้น',
      duration: '2 ชม.',
      price: '2,500',
      status: 'confirmed'
    },
    {
      id: 'BK004',
      date: '2025-10-22',
      time: '14:30',
      customer: 'คุณวิภา สุขใจ',
      phone: '084-567-8901',
      email: 'wipa@email.com',
      service: 'ทรีทเมนท์',
      stylist: 'พี่นุ่น',
      duration: '1 ชม.',
      price: '800',
      status: 'completed'
    },
    {
      id: 'BK005',
      date: '2025-10-22',
      time: '16:00',
      customer: 'คุณสุดา รักสวย',
      phone: '085-678-9012',
      email: 'suda@email.com',
      service: 'ตัดผม',
      stylist: 'พี่เบล',
      duration: '45 นาที',
      price: '250',
      status: 'cancelled',
      notes: 'ลูกค้ายกเลิก มีธุระด่วน'
    },
  ];

  const getStatusConfig = (status: BookingStatus) => {
    const configs = {
      confirmed: { label: 'ยืนยันแล้ว', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      pending: { label: 'รอยืนยัน', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertCircle },
      completed: { label: 'เสร็จสิ้น', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
      cancelled: { label: 'ยกเลิก', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
    };
    return configs[status];
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { 
      label: 'รอยืนยัน', 
      count: bookings.filter(b => b.status === 'pending').length, 
      colorClass: 'text-pink-600', 
      bgClass: 'bg-pink-50',
      iconBg: 'bg-white',
      borderClass: 'border-pink-100',
      icon: AlertCircle
    },
    { 
      label: 'ยืนยันแล้ว', 
      count: bookings.filter(b => b.status === 'confirmed').length, 
      colorClass: 'text-purple-600', 
      bgClass: 'bg-purple-50',
      iconBg: 'bg-white',
      borderClass: 'border-purple-100',
      icon: CheckCircle
    },
    { 
      label: 'เสร็จสิ้น', 
      count: bookings.filter(b => b.status === 'completed').length, 
      colorClass: 'text-cyan-600', 
      bgClass: 'bg-cyan-50',
      iconBg: 'bg-white',
      borderClass: 'border-cyan-100',
      icon: Scissors
    },
    { 
      label: 'ยกเลิก', 
      count: bookings.filter(b => b.status === 'cancelled').length, 
      colorClass: 'text-amber-600', 
      bgClass: 'bg-amber-50',
      iconBg: 'bg-white',
      borderClass: 'border-amber-100',
      icon: XCircle
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">จัดการรายการจอง</h1>
                <p className="text-slate-500 text-sm">ดูและจัดการนัดหมายทั้งหมด</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
          >
            <Plus className="w-5 h-5" />
            เพิ่มการจองใหม่
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgClass} ${stat.borderClass} border rounded-3xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.iconBg} ${stat.colorClass} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-green-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${stat.colorClass}`}>{stat.count}</span>
                  <span className="text-gray-500 text-sm">รายการ</span>
                </div>
                <p className={`${stat.colorClass} font-semibold text-base`}>{stat.label}</p>
                <p className="text-gray-500 text-sm">+{Math.floor(Math.random() * 5)} จากเมื่อวาน</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="ค้นหา ชื่อลูกค้า, เบอร์โทร, บริการ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
                className="pl-10 pr-8 py-3 border border-slate-300 text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="pending">รอยืนยัน</option>
                <option value="confirmed">ยืนยันแล้ว</option>
                <option value="completed">เสร็จสิ้น</option>
                <option value="cancelled">ยกเลิก</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">รหัส</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">วันที่/เวลา</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ลูกค้า</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">บริการ</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ช่าง</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ราคา</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBookings.map((booking) => {
                const statusConfig = getStatusConfig(booking.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-slate-700">{booking.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-800">{new Date(booking.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time} ({booking.duration})
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800 flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          {booking.customer}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" />
                          {booking.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Scissors className="w-4 h-4 text-rose-400" />
                        <span className="font-medium text-slate-700">{booking.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700">{booking.stylist}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{booking.price} ฿</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="ดูรายละเอียด">
                          <Eye className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        </button>
                        <button className="p-2 hover:bg-amber-50 rounded-lg transition-colors group" title="แก้ไข">
                          <Edit className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group" title="ลบ">
                          <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">ไม่พบรายการจอง</h3>
          <p className="text-slate-500">ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
        </div>
      )}
    </div>
  );
}