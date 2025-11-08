export default function AdminModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-[90%] max-w-xl rounded-2xl shadow-xl border border-gray-200 animate-scaleIn">
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
