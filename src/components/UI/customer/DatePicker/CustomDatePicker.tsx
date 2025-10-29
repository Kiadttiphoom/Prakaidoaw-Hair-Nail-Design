import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react';

// เพิ่ม component นี้เข้าไปใน artifact
const CustomDatePicker = ({ value, onChange, min }: { value: string; onChange: (date: string) => void; min: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const dayNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];
        // เติมวันว่างก่อนวันที่ 1
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // เติมวันในเดือน
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const formatDate = (date: string) => {
        if (!date) return 'เลือกวันที่';
        const d = new Date(date);
        return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear() + 543}`;
    };

    const isToday = (date: Date | null) => {
        if (!date) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date | null) => {
        if (!date || !value) return false;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        return dateString === value;
    };

    const isDisabled = (date: Date | null) => {
        if (!date || !min) return false;
        const minDate = new Date(min);
        // Reset เวลาให้เป็น 00:00:00 เพื่อเปรียบเทียบแค่วันที่
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        return dateOnly < minDateOnly;
    };

    const handleDateClick = (date: Date) => {
        if (isDisabled(date)) return;
        // แก้ไขเพื่อหลีกเลี่ยง timezone issue
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        onChange(dateString);
        setIsOpen(false);
    };

    const days = getDaysInMonth(currentMonth);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-gray-300 focus:border-gray-900 focus:outline-none transition-all duration-300 text-left bg-white flex items-center justify-between group"
            >
                <span className="text-base sm:text-lg font-light text-gray-700">
                    {formatDate(value)}
                </span>
                <Calendar className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-50 mt-2 p-4 bg-white rounded-2xl shadow-xl border-2 border-gray-200 w-full sm:w-80">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <h3 className="text-lg font-light text-gray-900">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear() + 543}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Day Names */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map(day => (
                                <div key={day} className="text-center text-xs font-light text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((date, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => date && handleDateClick(date)}
                                    disabled={!date || isDisabled(date)}
                                    className={`
                    aspect-square p-2 rounded-lg text-sm font-light transition-all duration-200
                    ${!date ? 'invisible' : ''}
                    ${date && isDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                    ${date && isSelected(date) ? 'bg-gray-900 text-white hover:bg-gray-800' : ''}
                    ${date && isToday(date) && !isSelected(date) ? 'border-2 border-gray-900 text-gray-900' : 'text-gray-700'}
                  `}
                                >
                                    {date?.getDate()}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomDatePicker;