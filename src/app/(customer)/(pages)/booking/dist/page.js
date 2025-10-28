"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function BookingPage() {
    var _this = this;
    var _a = react_1.useState(false), popupAuth = _a[0], setPopupAuth = _a[1];
    var _b = react_1.useState(1), step = _b[0], setStep = _b[1];
    var _c = react_1.useState({
        service: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
        note: ""
    }), formData = _c[0], setFormData = _c[1];
    var services = [
        {
            id: "haircut",
            title: "Haircut",
            description: "ตัดผมและออกแบบทรงผมที่เข้ากับบุคลิกของคุณ",
            price: "เริ่มต้น ฿450",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
        },
        {
            id: "coloring",
            title: "Coloring",
            description: "ย้อมสี ไฮไลท์ บาลายาจ ด้วยสีระดับพรีเมียม",
            price: "เริ่มต้น  ฿1,800",
            image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
        },
        {
            id: "treatment",
            title: "Treatment",
            description: "บำรุงผมเข้มข้น ฟื้นฟูเส้นผมให้แข็งแรง",
            price: "เริ่มต้น ฿800",
            image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80"
        },
        {
            id: "hair-spa",
            title: "Hair Spa",
            description: "ผ่อนคลายพร้อมบำรุงผมอย่างล้ำลึก",
            price: "เริ่มต้น ฿1,200",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
        },
        {
            id: "styling",
            title: "Styling",
            description: "จัดแต่งทรงผมสำหรับงานพิเศษและโอกาสสำคัญ",
            price: "เริ่มต้น ฿600",
            image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
        },
        {
            id: "perm",
            title: "Perm",
            description: "ดัดผม เพิ่มวอลุ่ม สร้างลูกเวฟสวยธรรมชาติ",
            price: "เริ่มต้น ฿2,200",
            image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800&q=80"
        },
    ];
    var timeSlots = [
        "08:00", "09:00", "10:00", "11:00",
        "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00", "19:00", "20:00"
    ];
    react_1.useEffect(function () {
        fetch("/api/auth", {
            method: "POST",
            credentials: "include"
        })
            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, res.json()];
                    case 1:
                        data = _a.sent();
                        if (res.status === 200 && data.message === "Success") {
                            // ✅ ผู้ใช้ล็อกอินอยู่แล้ว
                            document.body.style.overflow = "";
                            setPopupAuth(false);
                        }
                        else if (res.status === 401 || data.message === "Unauthorized") {
                            // ✅ ยังไม่ได้ล็อกอิน
                            document.body.style.overflow = "hidden";
                            setPopupAuth(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) { return console.error("Error:", err); });
    }, []);
    var handleLineLogin = function () {
        var clientId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
        var redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINE_CALLBACK_URL);
        // 👉 เก็บ path ปัจจุบัน (เช่น /home, /services, /booking)
        var currentPath = window.location.pathname;
        var state = encodeURIComponent(currentPath); // ปลอดภัยกับ URL ที่มี /
        var scope = "profile openid email";
        // 👉 ส่ง state ไปด้วย เพื่อให้ callback รู้ว่าต้องกลับมาหน้าไหน
        window.location.href = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri + "&state=" + state + "&scope=" + scope;
    };
    var handleSubmit = function () {
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            alert("จองคิวสำเร็จ! เราจะติดต่อกลับไปยืนยันในไม่ช้า");
        }
    };
    var canProceed = function () {
        if (step === 1)
            return formData.service;
        if (step === 2)
            return formData.date && formData.time;
        if (step === 3)
            return formData.name && formData.phone;
        return false;
    };
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white" },
        popupAuth && (React.createElement("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] overflow-hidden" },
            React.createElement("div", { className: "bg-white rounded-2xl shadow-xl px-8 py-8 w-[90%] max-w-sm text-center animate-fade-in-up relative" },
                React.createElement("h3", { className: "text-gray-800 text-xl font-medium mb-3" }, "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A"),
                React.createElement("p", { className: "text-gray-600 text-sm mb-6 leading-relaxed" },
                    "\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E32\u0E23",
                    " ",
                    React.createElement("span", { className: "font-medium text-gray-800" }, "\u0E08\u0E2D\u0E07\u0E04\u0E34\u0E27\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"),
                    " \u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19",
                    " ",
                    React.createElement("br", null),
                    React.createElement("span", { className: "font-semibold text-gray-900" }, "Prakaidoaw Hair&Nail Design"),
                    React.createElement("br", null),
                    "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E14\u0E49\u0E27\u0E22\u0E1A\u0E31\u0E0D\u0E0A\u0E35 LINE \u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E44\u0E14\u0E49\u0E40\u0E25\u0E22\u0E04\u0E48\u0E30"),
                React.createElement("button", { onClick: handleLineLogin, className: "w-full bg-gray-900 text-white px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-all font-light shadow-md" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E14\u0E49\u0E27\u0E22 LINE")))),
        React.createElement("div", { className: "max-w-7xl mx-auto px-5 sm:px-8 py-5 sm:py-6 mt-20" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("a", { href: "/", className: "text-sm text-gray-500 hover:text-gray-900 transition-colors" }, "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A")))),
        React.createElement("div", { className: "max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20" },
            React.createElement("div", { className: "text-center mb-12 sm:mb-16" },
                React.createElement("div", { className: "inline-block mb-4" },
                    React.createElement("span", { className: "text-xs text-gray-400 tracking-[0.3em] font-light uppercase" }, "Booking")),
                React.createElement("h2", { className: "text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light mb-4" }, "\u0E08\u0E2D\u0E07\u0E04\u0E34\u0E27"),
                React.createElement("p", { className: "text-base sm:text-lg text-gray-500 font-light" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E2A\u0E30\u0E14\u0E27\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E38\u0E13")),
            React.createElement("div", { className: "flex items-center justify-center mb-12 sm:mb-16" }, [
                { num: 1, label: "เลือกบริการ" },
                { num: 2, label: "เลือกวันเวลา" },
                { num: 3, label: "ข้อมูลติดต่อ" }
            ].map(function (item, index) { return (React.createElement("div", { key: item.num, className: "flex items-center" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 " + (step >= item.num
                            ? "bg-gray-900 border-gray-900 text-white"
                            : "bg-white border-gray-200 text-gray-400") }, step > item.num ? (React.createElement(lucide_react_1.Check, { className: "w-5 h-5", strokeWidth: 2 })) : (React.createElement("span", { className: "text-sm sm:text-base font-light" }, item.num))),
                    React.createElement("span", { className: "text-xs sm:text-sm text-gray-500 mt-2 font-light hidden sm:block" }, item.label)),
                index < 2 && (React.createElement("div", { className: "w-16 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-all duration-300 " + (step > item.num ? "bg-gray-900" : "bg-gray-200") })))); })),
            React.createElement("div", { className: "bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-10 shadow-sm" },
                step === 1 && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("h3", { className: "text-2xl sm:text-3xl text-gray-900 font-light mb-8" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23"),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, services.map(function (service) { return (React.createElement("button", { key: service.id, onClick: function () { return setFormData(__assign(__assign({}, formData), { service: service.id })); }, className: "relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left " + (formData.service === service.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300") },
                        React.createElement("div", { className: "relative h-32 sm:h-40 overflow-hidden" },
                            React.createElement("img", { src: service.image, alt: service.title, className: "w-full h-full object-cover" }),
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
                            React.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-4" },
                                React.createElement("h4", { className: "text-lg sm:text-xl text-white font-light mb-0.5" }, service.title))),
                        React.createElement("div", { className: "p-5" },
                            React.createElement("p", { className: "text-sm text-gray-600 font-light mb-3 leading-relaxed" }, service.description),
                            React.createElement("div", { className: "text-base sm:text-lg text-gray-900 font-light" }, service.price)),
                        formData.service === service.id && (React.createElement("div", { className: "absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg z-10" },
                            React.createElement(lucide_react_1.Check, { className: "w-4 h-4 text-gray-900", strokeWidth: 2.5 }))))); })))),
                step === 2 && (React.createElement("div", { className: "space-y-8" },
                    React.createElement("h3", { className: "text-2xl sm:text-3xl text-gray-900 font-light mb-8" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E41\u0E25\u0E30\u0E40\u0E27\u0E25\u0E32"),
                    React.createElement("div", null,
                        React.createElement("label", { className: "flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4" },
                            React.createElement(lucide_react_1.Calendar, { className: "w-5 h-5", strokeWidth: 1.5 }),
                            "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"),
                        React.createElement("input", { type: "date", value: formData.date, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { date: e.target.value })); }, min: new Date().toISOString().split('T')[0], className: "w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-base" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "flex items-center gap-2 text-base sm:text-lg text-gray-700 font-light mb-4" },
                            React.createElement(lucide_react_1.Clock, { className: "w-5 h-5", strokeWidth: 1.5 }),
                            "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E27\u0E25\u0E32"),
                        React.createElement("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3" }, timeSlots.map(function (time) { return (React.createElement("button", { key: time, onClick: function () { return setFormData(__assign(__assign({}, formData), { time: time })); }, className: "py-3 px-4 rounded-xl border-2 text-sm sm:text-base font-light transition-all duration-300 " + (formData.time === time
                                ? "border-gray-900 bg-gray-900 text-white"
                                : "border-gray-200 text-gray-700 hover:border-gray-300") }, time)); }))))),
                step === 3 && (React.createElement("div", { className: "space-y-6" },
                    React.createElement("h3", { className: "text-2xl sm:text-3xl text-gray-900 font-light mb-8" }, "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D"),
                    React.createElement("div", null,
                        React.createElement("label", { className: "flex items-center gap-2 text-base text-gray-700 font-light mb-3" },
                            React.createElement(lucide_react_1.User, { className: "w-5 h-5", strokeWidth: 1.5 }),
                            "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25"),
                        React.createElement("input", { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, placeholder: "\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13", className: "w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "flex items-center gap-2 text-base text-gray-700 font-light mb-3" },
                            React.createElement(lucide_react_1.Phone, { className: "w-5 h-5", strokeWidth: 1.5 }),
                            "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C"),
                        React.createElement("input", { type: "tel", value: formData.phone, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { phone: e.target.value })); }, placeholder: "0xx-xxx-xxxx", className: "w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "flex items-center gap-2 text-base text-gray-700 font-light mb-3" },
                            React.createElement(lucide_react_1.Mail, { className: "w-5 h-5", strokeWidth: 1.5 }),
                            "\u0E2D\u0E35\u0E40\u0E21\u0E25 (\u0E44\u0E21\u0E48\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A)"),
                        React.createElement("input", { type: "email", value: formData.email, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); }, placeholder: "your@email.com", className: "w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "text-base text-gray-700 font-light mb-3 block" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21 (\u0E44\u0E21\u0E48\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A)"),
                        React.createElement("textarea", { value: formData.note, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { note: e.target.value })); }, rows: 4, placeholder: "\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21...", className: "w-full px-5 py-4 rounded-2xl text-gray-500 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none" })))),
                React.createElement("div", { className: "flex gap-4 mt-10 pt-8 border-t border-gray-200" },
                    step > 1 && (React.createElement("button", { onClick: function () { return setStep(step - 1); }, className: "flex-1 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-light hover:border-gray-300 transition-all duration-300" }, "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A")),
                    React.createElement("button", { onClick: handleSubmit, disabled: !canProceed(), className: "flex-1 px-8 py-4 rounded-full bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" },
                        step === 3 ? "ยืนยันการจอง" : "ถัดไป",
                        React.createElement(lucide_react_1.ChevronRight, { className: "w-5 h-5", strokeWidth: 2 })))),
            React.createElement("div", { className: "text-center mt-12" },
                React.createElement("p", { className: "text-sm text-gray-500 font-light mb-2" }, "\u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07\u0E17\u0E35\u0E48"),
                React.createElement("a", { href: "tel:0902136159", className: "text-lg text-gray-900 font-light hover:text-gray-600 transition-colors" }, "090 213 6159")))));
}
exports["default"] = BookingPage;
