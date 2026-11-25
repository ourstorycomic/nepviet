import React from 'react';

/**
 * Traditional Vietnamese Lacquer Golden Wavy Divider
 * Inspired by antique lacquer gilding and Nguyen Art Gallery design language
 */
export function GoldWavyLine({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-5 overflow-hidden relative select-none pointer-events-none flex items-center justify-center ${className}`}>
      {/* Soft ambient golden glow behind the line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent blur-[4px]" />
      <div className="wavy-gold-line animate-gold-wave w-full h-full relative z-10 opacity-90" />
    </div>
  );
}

/**
 * Traditional Vietnamese Flourish (Họa tiết hoa văn trung tâm ❖ ✦ ❖)
 */
export function TraditionalFlourish({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#C5A880] py-2 select-none pointer-events-none ${className}`}>
      <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/60 to-[#D4AF37]" />
      <div className="flex items-center gap-1.5 text-[#D4AF37] opacity-90">
        <span className="text-[10px] text-[#C5A880]/70">❖</span>
        <span className="text-xs text-[#D4AF37] animate-pulse">✦</span>
        <span className="text-[10px] text-[#C5A880]/70">❖</span>
      </div>
      <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#C5A880]/60 to-[#D4AF37]" />
    </div>
  );
}

/**
 * Traditional Vietnamese Meander Ribbon (Hồi văn gợn sóng Đông Sơn)
 * Geometric historic border line with sharp yet graceful detailing
 */
export function DongSonMeanderLine({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center py-1 opacity-70 select-none pointer-events-none ${className}`}>
      <svg
        className="w-full max-w-4xl h-3 text-[#C5A880]"
        viewBox="0 0 800 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
      >
        <pattern id="meanderPattern" x="0" y="0" width="40" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 6 H10 V2 H18 V10 H26 V4 H34 V8 H40"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <circle cx="20" cy="6" r="1" fill="currentColor" opacity="0.8" />
        </pattern>
        <rect width="800" height="12" fill="url(#meanderPattern)" />
      </svg>
    </div>
  );
}

/**
 * Traditional Corner Flourish (Hoa văn góc di sản)
 */
export function TraditionalCornerFlourish({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`w-6 h-6 pointer-events-none select-none text-[#C5A880]/50 ${rotationClass}`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M2 12V3C2 2.44772 2.44772 2 3 2H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5 10V5C5 4.44772 5.44772 4 6 4H10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="1 2" />
        <circle cx="3" cy="3" r="1.5" fill="#D4AF37" />
      </svg>
    </div>
  );
}
