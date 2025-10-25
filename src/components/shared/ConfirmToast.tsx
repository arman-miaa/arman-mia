"use client";

import { toast } from "react-hot-toast";

interface ConfirmToastOptions {
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void; 
}

export const showConfirmToast = ({
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmToastOptions) => {
  toast.custom(
    (t) => (
      <div
        className={`fixed h-screen flex items-center justify-center  z-60 transition-opacity duration-300 ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => toast.dismiss(t.id)} 
      >
        <div
          className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col gap-5 w-[90%] max-w-sm transition-transform duration-300 ${
            t.visible ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Message */}
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
              {message}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-100 transition"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                toast.dismiss(t.id); 
                onConfirm(); 
              }}
              className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold text-white transition shadow-md"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
};
