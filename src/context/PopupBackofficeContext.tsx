"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface PopupContextType {
  showPopup: (type: "error" | "success" | "warning", text: string) => void;
  closePopup: () => void;
}

const PopupBackofficeContext = createContext<PopupContextType | undefined>(undefined);

export function PopupBackofficeContextProvider({ children }: { children: ReactNode }) {
  const [popupMessenger, setPopupMessenger] = useState(false);
  const [popupMessenger_color, setPopupMessenger_color] = useState<"error" | "success" | "warning">("error");
  const [popupMessenger_text, setPopupMessenger_text] = useState("");

  const showPopup = (type: "error" | "success" | "warning", text: string) => {
    setPopupMessenger(true);
    setPopupMessenger_color(type);
    setPopupMessenger_text(text);

    setTimeout(() => {
      setPopupMessenger(false);
      setPopupMessenger_text("");
    }, 2500);
  };

  const closePopup = () => {
    setPopupMessenger(false);
    setPopupMessenger_color("error");
    setPopupMessenger_text("");
  };

  const value = useMemo(() => ({ showPopup, closePopup }), []);

  return (
    <PopupBackofficeContext.Provider value={{ showPopup,closePopup  }}>
      {children}

      {popupMessenger && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[999]">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 w-[90%] max-w-md text-center">
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg ${
                popupMessenger_color === "error"
                  ? "bg-gradient-to-br from-red-900 to-red-800"
                  : popupMessenger_color === "success"
                  ? "bg-gradient-to-br from-green-900 to-green-800"
                  : "bg-gradient-to-br from-yellow-900 to-yellow-800"
              }`}
            >
              {popupMessenger_color === "error" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : popupMessenger_color === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z" /></svg>
              )}
            </div>

            <h3 className="text-gray-900 text-2xl font-bold mb-3">
              {popupMessenger_color === "error"
                ? "เกิดข้อผิดพลาด"
                : popupMessenger_color === "success"
                ? "สำเร็จ"
                : "คำเตือน"}
            </h3>
            <p className="text-gray-600 text-sm mb-8">{popupMessenger_text}</p>

            <button
              onClick={closePopup}
              className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-md"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </PopupBackofficeContext.Provider>
  );
}

export function usePopupMessenger() {
  const context = useContext(PopupBackofficeContext);
  if (!context) throw new Error("usePopupMessenger must be used within PopupBackofficeContextProvider");
  return context;
}
