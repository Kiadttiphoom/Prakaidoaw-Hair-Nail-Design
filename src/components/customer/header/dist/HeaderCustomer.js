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
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var UserContext_1 = require("@/context/UserContext");
var navigation_1 = require("next/navigation");
function HeaderCustomer() {
    var _this = this;
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = react_1.useState(false), showLogout = _b[0], setShowLogout = _b[1];
    var user = UserContext_1.useUser().user;
    var logoutRef = react_1.useRef(null);
    var pathname = navigation_1.usePathname();
    var isBookingPage = pathname === "/booking";
    react_1.useEffect(function () {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);
    react_1.useEffect(function () {
        function handleClickOutside(e) {
            if (logoutRef.current && !logoutRef.current.contains(e.target)) {
                setShowLogout(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
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
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, fetch("/api/line/logout", { method: "POST" })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    console.error("Logout error:", err_1);
                    return [3 /*break*/, 4];
                case 3:
                    window.location.href = "/";
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("img", { src: "/logo.png", alt: "Logo Text", className: "h-10 w-auto" }),
                    React.createElement("span", { className: "text-xl tracking-widest text-gray-800 font-light" }, "Prakaidoaw Hair&Nail Design")),
                React.createElement("button", { className: "md:hidden text-gray-700 hover:text-gray-900 transition", onClick: function () { return setIsOpen(!isOpen); } }, isOpen ? React.createElement(lucide_react_1.X, { className: "w-6 h-6" }) : React.createElement(lucide_react_1.Menu, { className: "w-6 h-6" })),
                React.createElement("div", { className: "hidden md:flex items-center justify-between gap-10 text-sm tracking-wide" },
                    !isBookingPage && (React.createElement(React.Fragment, null,
                        React.createElement(link_1["default"], { href: "#services", className: "text-gray-600 hover:text-gray-900 font-light" }, "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"),
                        React.createElement(link_1["default"], { href: "#stylists", className: "text-gray-600 hover:text-gray-900 font-light" }, "\u0E0A\u0E48\u0E32\u0E07\u0E1C\u0E21"),
                        React.createElement(link_1["default"], { href: "#gallery", className: "text-gray-600 hover:text-gray-900 font-light" }, "\u0E1C\u0E25\u0E07\u0E32\u0E19"))),
                    React.createElement("div", { className: "flex items-center gap-4 relative", ref: logoutRef },
                        !isBookingPage && (React.createElement("button", { className: "bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light" },
                            React.createElement("a", { href: "/booking" }, "\u0E08\u0E2D\u0E07\u0E04\u0E34\u0E27"))),
                        user ? (React.createElement(React.Fragment, null,
                            React.createElement("button", { onClick: function () { return setShowLogout(function (prev) { return !prev; }); }, className: "bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light" }, user.displayName),
                            React.createElement(framer_motion_1.AnimatePresence, null, showLogout && (React.createElement(framer_motion_1.motion.div, __assign({}, {
                                initial: { opacity: 0, y: -5 },
                                animate: { opacity: 1, y: 0 },
                                exit: { opacity: 0, y: -5 },
                                transition: { duration: 0.2 },
                                className: "absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-xl py-2 w-36 text-sm"
                            }),
                                React.createElement("button", { onClick: handleLogout, className: "flex items-center w-full gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all" },
                                    React.createElement(lucide_react_1.LogOut, { className: "w-4 h-4 text-gray-500" }),
                                    "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A")))))) : (React.createElement("button", { onClick: handleLineLogin, className: "bg-gray-900 text-white px-6 py-2 rounded-full text-xs tracking-wider hover:bg-gray-800 transition-all font-light" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A")))))),
        React.createElement(framer_motion_1.AnimatePresence, null, isOpen && (React.createElement(React.Fragment, null,
            React.createElement(framer_motion_1.motion.div, __assign({}, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.3 },
                onClick: function () { return setIsOpen(false); },
                className: "md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            })),
            React.createElement(framer_motion_1.motion.div, __assign({}, {
                initial: { x: "100%" },
                animate: { x: 0 },
                exit: { x: "100%" },
                transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 300
                },
                className: "md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-[70] flex flex-col"
            }),
                React.createElement("div", { className: "flex items-center justify-between p-6 border-b border-gray-200" },
                    React.createElement("h2", { className: "text-lg font-light text-gray-900" }, "\u0E40\u0E21\u0E19\u0E39"),
                    React.createElement("button", { onClick: function () { return setIsOpen(false); }, className: "p-2 hover:bg-gray-100 rounded-lg transition-colors" },
                        React.createElement(lucide_react_1.X, { className: "w-5 h-5 text-gray-600" }))),
                React.createElement("div", { className: "flex-1 overflow-y-auto p-6" },
                    React.createElement("nav", { className: "space-y-1" },
                        React.createElement(link_1["default"], { href: "#services", onClick: function () { return setIsOpen(false); }, className: "block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light" }, "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"),
                        React.createElement(link_1["default"], { href: "#stylists", onClick: function () { return setIsOpen(false); }, className: "block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light" }, "\u0E0A\u0E48\u0E32\u0E07\u0E1C\u0E21"),
                        React.createElement(link_1["default"], { href: "#gallery", onClick: function () { return setIsOpen(false); }, className: "block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all font-light" }, "\u0E1C\u0E25\u0E07\u0E32\u0E19"))),
                React.createElement("div", { className: "p-6 border-t border-gray-200 space-y-3" },
                    React.createElement(link_1["default"], { href: "/booking", onClick: function () { return setIsOpen(false); } },
                        React.createElement("button", { className: "w-full bg-gray-900 text-white px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-800 transition-all font-light shadow-sm" }, "\u0E08\u0E2D\u0E07\u0E04\u0E34\u0E27")),
                    user ? (React.createElement(React.Fragment, null,
                        React.createElement("button", { onClick: function () { return setShowLogout(function (prev) { return !prev; }); }, className: "w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-200 transition-all font-light flex items-center justify-center gap-2" },
                            React.createElement("span", null, user.displayName)),
                        React.createElement(framer_motion_1.AnimatePresence, null, showLogout && (React.createElement(framer_motion_1.motion.div, __assign({}, {
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.95 },
                            transition: { duration: 0.15 },
                            className: "bg-gray-50 rounded-lg overflow-hidden"
                        }),
                            React.createElement("button", { onClick: handleLogout, className: "flex items-center w-full gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all" },
                                React.createElement(lucide_react_1.LogOut, { className: "w-4 h-4 text-gray-500" }),
                                React.createElement("span", { className: "font-light" }, "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A"))))))) : (React.createElement("button", { onClick: handleLineLogin, className: "w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-sm tracking-wider hover:bg-gray-200 transition-all font-light" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A")))))))));
}
exports["default"] = HeaderCustomer;
