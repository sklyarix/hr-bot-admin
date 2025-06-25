import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center backdrop-blur-sm backdrop-brightness-75">
      <div className=" bg-white dark:bg-gray-900 rounded-2xl shadow-lg mx-4 p-6 relative animate-fade-in max-h-[80vh]">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          XXXX
        </button>

        <div className="">{children}</div>
      </div>
    </div>
  );
};
