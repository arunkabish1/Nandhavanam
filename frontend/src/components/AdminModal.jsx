import React from "react";

export default function AdminModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-zinc-200 p-6 rounded-lg relative w-[90%] max-w-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}
