"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface InvitationPopupProps {
  guestName?: string;
  onClose?: () => void;
}

export function InvitationPopup({ guestName, onClose }: InvitationPopupProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Prevent scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Call onClose callback when popup is closed
      if (onClose) onClose();
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
        {/* Background cover image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/COVER-UNDANGAN.png"
            alt="Wedding cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/75"></div>
        </div>
        <div className="relative z-10 p-6 text-center">
          <div className="mb-6">
            <Image
              src="/ring.png"
              alt="Wedding rings"
              width={60}
              height={60}
              className="mx-auto opacity-80"
            />
          </div>

          <h2 className="text-2xl font-serif mb-4">Wedding Invitation</h2>

          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>

          <p className="text-lg mb-2">Dear,</p>
          <p className="text-2xl font-serif mb-6 text-gray-800">
            {guestName || "Honored Guest"}
          </p>

          <p className="text-gray-700 mb-6">
            We joyfully invite you to share in our celebration of love and
            commitment.
          </p>

          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center border border-gray-300 rounded-none text-sm font-light tracking-widest uppercase transition-colors hover:bg-gray-50 px-8 py-3"
          >
            Open Invitation
          </button>
        </div>

        <div className="relative z-10 bg-gray-50/90 p-4 text-center text-sm text-gray-500">
          <p>Firly & Zulfa</p>
        </div>
      </div>
    </div>
  );
}
