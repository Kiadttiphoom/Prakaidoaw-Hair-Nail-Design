import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Calendar, Scissors, Users, Clock, UserCircle, LogOut } from 'lucide-react';

export default function SidebarAdmin() {
  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'จัดการรายการจอง', icon: Calendar },
    { href: '/admin/services', label: 'จัดการบริการ', icon: Scissors },
    { href: '/admin/staff', label: 'จัดการพนักงาน', icon: Users },
    { href: '/admin/schedule', label: 'ตั้งเวลาทำการ', icon: Clock },
    { href: '/admin/customers', label: 'ลูกค้าในระบบ', icon: UserCircle },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 p-6">
      {/* Logo/Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Scissors className="w-6 h-6 text-rose-400" />
          <h2 className="text-xl font-semibold text-slate-800">Salon Admin</h2>
        </div>
        <p className="text-xs text-slate-500">ระบบจัดการร้านทำผม</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-white hover:shadow-sm hover:text-rose-500 transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <div className="pt-4 mt-4 border-t border-slate-200">
          <Link
            href="/admin/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            <span className="text-sm font-medium">ออกจากระบบ</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}