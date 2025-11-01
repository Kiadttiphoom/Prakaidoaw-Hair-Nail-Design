"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import { AlertCircle, CheckCircle, AlertTriangle, X } from "lucide-react";
import { NotificationType, Notification } from "@/../type";

export interface NotificationRef {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationUI = forwardRef<NotificationRef>((_, ref) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getStyles = (type: NotificationType) => {
    const styles = {
      success: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        icon: "text-green-500",
        Icon: CheckCircle,
      },
      warning: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        icon: "text-yellow-500",
        Icon: AlertTriangle,
      },
      error: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "text-red-500",
        Icon: AlertCircle,
      },
    };
    return styles[type];
  };

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setNotification(null), 300);
    }, 4000);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setNotification(null), 300);
  };

  // ✅ เปิดให้ component แม่เรียกใช้ได้ผ่าน ref
  useImperativeHandle(ref, () => ({
    showNotification,
  }));

  if (!notification) return null;
  const { Icon, bg, border, text, icon } = getStyles(notification.type);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`min-w-[320px] max-w-md p-4 rounded-xl border shadow-lg flex items-start gap-3 ${bg} ${border}`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${icon}`} />
        <p className={`flex-1 text-sm font-medium ${text}`}>
          {notification.message}
        </p>
        <button
          onClick={handleClose}
          className={`flex-shrink-0 hover:opacity-70 transition-opacity ${icon}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

NotificationUI.displayName = "NotificationUI";
export default NotificationUI;