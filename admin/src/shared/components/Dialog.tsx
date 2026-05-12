"use client";

import React from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";

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
  if (!isOpen || typeof document === "undefined") return null;

  const icons = {
    success: <CheckCircle2 size={40} className="text-[var(--admin-success)]" />,
    warning: <AlertTriangle size={40} className="text-[var(--admin-warning)]" />,
    info: <Info size={40} className="text-[var(--admin-accent)]" />,
    confirm: <HelpCircle size={40} className="text-[var(--admin-accent-strong)]" />,
  };

  const dialogContent = (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_30px_70px_-42px_rgba(54,43,34,0.22)] relative z-10 overflow-hidden animate-in zoom-in duration-200 border border-[var(--admin-border)]">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">{icons[type]}</div>
          <h3 className="text-xl font-bold text-[var(--admin-heading)] mb-2 tracking-tight">{title}</h3>
          <p className="text-[14px] text-[var(--admin-text-muted)] font-medium leading-relaxed tracking-tight">{message}</p>
        </div>
        
        <div className="p-4 bg-[var(--admin-surface-strong)] border-t border-[var(--admin-border)] flex items-center justify-center gap-3">
          {type === "confirm" ? (
            <>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[var(--admin-border)] rounded-xl text-[13px] font-bold text-[var(--admin-text-muted)] hover:bg-[var(--admin-surface-muted)] transition-all tracking-tight"
              >
                {cancelText}
              </button>
              <button 
                onClick={() => { onConfirm?.(); onClose(); }}
                className="flex-1 px-4 py-2.5 bg-[var(--admin-accent-strong)] text-white rounded-xl text-[13px] font-bold hover:opacity-95 shadow-lg shadow-[rgba(95,81,71,0.16)] transition-all tracking-tight"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="w-full max-w-[150px] px-6 py-2.5 bg-[var(--admin-accent-strong)] text-white rounded-xl text-[13px] font-bold hover:opacity-95 shadow-lg shadow-[rgba(95,81,71,0.16)] transition-all tracking-tight"
            >
              Đã hiểu
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
