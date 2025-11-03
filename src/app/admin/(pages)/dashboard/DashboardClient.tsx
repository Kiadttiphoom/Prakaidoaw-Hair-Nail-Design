"use client";

import React, { useEffect, useState } from "react";
import {
    Calendar,
    Users,
    Scissors,
    Clock,
    UserCheck,
    AlertCircle,
    CheckCircle,
    XCircle,
    ArrowRight
} from "lucide-react";
import { usePopupMessenger } from "@/context/PopupBackofficeContext";

type DashboardItem = {
    booking_code: string;
    customer_name: string;
    customer_phone: string;
    service_title: string;
    stylist_name: string;
    date: string;
    time: string;
    price: string;
    status: "pending" | "success" | "cancel" | string;
    note: string;
    payment_status?: string | null;
};

type DashboardClientProps = {
    summary: {
        pending: number;
        confirmed: number;
        completed: number;
        canceled: number;
        total: number;
    };
    bookings: DashboardItem[];
};

export default function DashboardClient({ summary, bookings }: DashboardClientProps) {
    const { showPopup, closePopup } = usePopupMessenger();

    const handleError = () => {
        showPopup("error", "กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
    };

    const stats = [
        {
            label: "รอยืนยัน",
            count: summary.pending,
            colorClass: "text-pink-600",
            bgClass: "bg-pink-50",
            iconBg: "bg-white",
            borderClass: "border-pink-100",
            icon: AlertCircle,
            trend: "+2 จากเมื่อวาน",
        },
        {
            label: "ยืนยันแล้ว",
            count: summary.confirmed,
            colorClass: "text-purple-600",
            bgClass: "bg-purple-50",
            iconBg: "bg-white",
            borderClass: "border-purple-100",
            icon: CheckCircle,
            trend: "+8 เดือนนี้",
        },
        {
            label: "เสร็จสิ้น",
            count: summary.completed,
            colorClass: "text-cyan-600",
            bgClass: "bg-cyan-50",
            iconBg: "bg-white",
            borderClass: "border-cyan-100",
            icon: Scissors,
            trend: "ยอดนิยม 3 รายการ",
        },
        {
            label: "ยกเลิก",
            count: summary.canceled,
            colorClass: "text-amber-600",
            bgClass: "bg-amber-50",
            iconBg: "bg-white",
            borderClass: "border-amber-100",
            icon: XCircle,
            trend: "ทำงานวันนี้ 4 คน",
        },
    ];

    const quickActions = [
        {
            label: "จัดการรายการจอง",
            href: "/admin/bookings",
            icon: Calendar,
            color: "bg-rose-500 hover:bg-rose-600",
        },
        {
            label: "จัดการบริการ",
            href: "/admin/services",
            icon: Scissors,
            color: "bg-purple-500 hover:bg-purple-600",
        },
        {
            label: "จัดการพนักงาน",
            href: "/admin/staff",
            icon: Users,
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            label: "ตั้งเวลาทำการ",
            href: "/admin/schedule",
            icon: Clock,
            color: "bg-amber-500 hover:bg-amber-600",
        },
        {
            label: "ลูกค้าในระบบ",
            href: "/admin/customers",
            icon: UserCheck,
            color: "bg-pink-500 hover:bg-pink-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 rounded-xl">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Scissors className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                        <p className="text-slate-500 text-sm">
                            ยินดีต้อนรับเข้าสู่ระบบจัดการร้านทำผม
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-4">
                    <Clock className="w-4 h-4" />
                    <span>อัพเดทล่าสุด: วันนี้ 08:45 น.</span>
                </div>
            </header>

            {/* Stats - คัดลอกมาจากหน้าจองเป๊ะๆ */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`${stat.bgClass} ${stat.borderClass} border rounded-3xl p-6 hover:shadow-lg transition-all duration-300`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`${stat.iconBg} ${stat.colorClass} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="text-green-500">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-5xl font-bold ${stat.colorClass}`}>
                                        {stat.count}
                                    </span>
                                    <span className="text-gray-500 text-sm">รายการ</span>
                                </div>
                                <p className={`${stat.colorClass} font-semibold text-base`}>
                                    {stat.label}
                                </p>
                                <p className="text-gray-500 text-sm">{stat.trend}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">เมนูด่วน</h2>
                <div className="flex flex-wrap gap-3">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <a
                                key={index}
                                href={action.href}
                                className={`${action.color} text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 font-medium`}
                            >
                                <Icon className="w-5 h-5" />
                                {action.label}
                            </a>
                        );
                    })}
                    <button
                        onClick={handleError}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        ทดสอบ Popup
                    </button>
                </div>
            </section>

            {/* Recent Bookings */}
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6 w-[100%]">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-400" />
                        การจองวันนี้
                    </h2>
                    <a
                        href="/admin/bookings"
                        className="inline-flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 font-medium"
                    >
                        ดูทั้งหมด <ArrowRight className="w-3 h-3" />
                    </a>
                </div>

                <div className="space-y-3">
                    {bookings.map((data, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-white border-2 border-rose-200 rounded-lg px-3 py-2 text-center min-w-[70px]">
                                    <div className="text-lg font-bold text-slate-800">
                                        {data.date}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {data.customer_name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {data.service_title} . {data.stylist_name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                {data.status === "confirmed" ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        ยืนยันแล้ว
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                        รอยืนยัน
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
