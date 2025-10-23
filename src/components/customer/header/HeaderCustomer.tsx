"use client";
import Link from "next/link";
import { Scissors} from 'lucide-react';

export default function HeaderCustomer() {
  return (
    <header className="w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          Fin Herbal
        </Link>
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scissors className="w-6 h-6 text-gray-800" strokeWidth={1} />
            <span className="text-xl tracking-widest text-gray-800 font-light">ATELIER</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors font-light">บริการ</a>
            <a href="#stylists" className="text-gray-600 hover:text-gray-900 transition-colors font-light">ช่างผม</a>
            <a href="#gallery" className="text-gray-600 hover:text-gray-900 transition-colors font-light">ผลงาน</a>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light">
              จองคิว
            </button>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}
