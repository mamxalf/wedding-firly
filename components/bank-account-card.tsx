"use client";

import Image from "next/image";
import { useState } from "react";

interface BankAccountCardProps {
  accountNumber: string;
  accountName: string;
  bankLogoSrc: string;
}

export function BankAccountCard({
  accountNumber,
  accountName,
  bankLogoSrc,
}: BankAccountCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={bankLogoSrc}
          alt="Bank Logo"
          width={80}
          height={30}
          className="object-contain"
        />
      </div>
      <div className="text-left">
        <div>
          <p className="text-sm text-gray-500 mb-1">Bank Account Details</p>
          <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
            <p className="font-mono">
              <span className="text-lg">{accountNumber}</span>
              <span className="mx-2 text-gray-400">a.n</span>
              <span className="font-medium">{accountName}</span>
            </p>
            <button
              className="text-primary hover:text-primary-dark transition-colors ml-3 flex-shrink-0"
              onClick={handleCopy}
              aria-label="Copy account number"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
