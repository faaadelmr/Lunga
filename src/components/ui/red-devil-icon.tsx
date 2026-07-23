import React from "react";

export function RedDevilIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* Left Horn */}
      <path d="M3.5 2C3 6 5 9 8.5 10C7 7.5 6 4.5 3.5 2Z" />
      {/* Right Horn */}
      <path d="M20.5 2C21 6 19 9 15.5 10C17 7.5 18 4.5 20.5 2Z" />
      {/* Devil Face */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5C6.48 5 2 9.48 2 15C2 20.52 6.48 22 12 22C17.52 22 22 20.52 22 15C22 9.48 17.52 5 12 5ZM8 12.5L10 13.5L9 11.5L8 12.5ZM16 12.5L14 13.5L15 11.5L16 12.5ZM8.5 17.5C10 19.5 14 19.5 15.5 17.5H8.5Z"
      />
    </svg>
  );
}
