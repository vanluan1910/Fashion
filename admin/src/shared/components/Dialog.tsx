"use client";

import React from "react";
import { X, CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "warning" | "info" | "confirm";
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
}: DialogProps) {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 size={40} className="text-green-500" />,
    warning: <AlertTriangle size={40} className="text-orange-500" />,
    info: <Info size={40} className="text-blue-500" />,
    confirm: <HelpCircle size={40} className="text-[#f74f2e]" />,
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">{icons[type]}</div>
          <h3 className="text-xl font-bold text-[#333] mb-2 tracking-tight">{title}</h3>
          <p className="text-[14px] text-[#666] font-medium leading-relaxed tracking-tight">{message}</p>
        </div>
        
        <div className="p-4 bg-[#fcfcff] border-t border-[#eee] flex items-center justify-center gap-3">
          {type === "confirm" ? (
            <>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#eee] rounded-xl text-[13px] font-bold text-[#666] hover:bg-white transition-all tracking-tight"
              >
                {cancelText}
              </button>
              <button 
                onClick={() => { onConfirm?.(); onClose(); }}
                className="flex-1 px-4 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] shadow-lg shadow-[#f74f2e]/20 transition-all tracking-tight"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="w-full max-w-[150px] px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] shadow-lg shadow-[#f74f2e]/20 transition-all tracking-tight"
            >
              Đã hiểu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
