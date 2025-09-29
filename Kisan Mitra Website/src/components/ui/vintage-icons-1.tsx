import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Old-fashioned 2D Vintage Icons Collection - Part 1
// These are designed to look like traditional farming/agricultural icons with vintage styling

export const VintageShield = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L4 6V12C4 16.5 7.5 20.9 12 22C16.5 20.9 20 16.5 20 12V6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 12L11 14L15 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageTractor = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="6" cy="18" r="3" fill="currentColor"/>
    <circle cx="18" cy="18" r="3" fill="currentColor"/>
    <rect x="8" y="8" width="8" height="6" rx="1" fill="currentColor"/>
    <rect x="10" y="4" width="4" height="4" rx="1" fill="currentColor"/>
    <path d="M16 14h3v4h-3z" fill="currentColor"/>
    <circle cx="6" cy="18" r="1" fill="white"/>
    <circle cx="18" cy="18" r="1" fill="white"/>
  </svg>
);

export const VintageBot = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="6" y="6" width="12" height="10" rx="2" fill="currentColor"/>
    <rect x="8" y="8" width="2" height="2" rx="1" fill="white"/>
    <rect x="14" y="8" width="2" height="2" rx="1" fill="white"/>
    <rect x="10" y="12" width="4" height="1" rx="0.5" fill="white"/>
    <rect x="11" y="4" width="2" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="10" width="2" height="1" rx="0.5" fill="currentColor"/>
    <rect x="18" y="10" width="2" height="1" rx="0.5" fill="currentColor"/>
    <rect x="9" y="17" width="2" height="3" rx="1" fill="currentColor"/>
    <rect x="13" y="17" width="2" height="3" rx="1" fill="currentColor"/>
  </svg>
);

export const VintageGlobe = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 3v18" stroke="currentColor" strokeWidth="1"/>
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1"/>
    <path d="M7.5 7.5C9 9 10.5 10.5 12 12s3 3 4.5 4.5" stroke="currentColor" strokeWidth="1"/>
    <path d="M16.5 7.5C15 9 13.5 10.5 12 12s-3 3-4.5 4.5" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const VintageLeaf = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M7 20C7 20 3 16 3 12C3 8 6 3 12 3C18 3 21 8 21 12C21 16 17 20 17 20" fill="currentColor"/>
    <path d="M12 3V20" stroke="white" strokeWidth="1.5"/>
    <path d="M12 8L17 12" stroke="white" strokeWidth="1"/>
    <path d="M12 12L7 16" stroke="white" strokeWidth="1"/>
  </svg>
);

export const VintageArrowRight = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M5 12h14M15 8l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageHome = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 12L12 3L21 12V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V12Z" fill="currentColor"/>
    <rect x="9" y="14" width="6" height="8" fill="white"/>
    <rect x="11" y="16" width="2" height="4" fill="currentColor"/>
    <circle cx="13.5" cy="17.5" r="0.5" fill="white"/>
    <polygon points="5,12 12,6 19,12" fill="none" stroke="white" strokeWidth="1"/>
  </svg>
);

export const VintageAlert = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L2 20H22L12 2Z" fill="currentColor"/>
    <rect x="11" y="8" width="2" height="6" fill="white"/>
    <circle cx="12" cy="17" r="1" fill="white"/>
  </svg>
);

export const VintageBulb = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M9 21H15M12 3C8.5 3 6 5.5 6 9C6 11 7 12.5 8 14H16C17 12.5 18 11 18 9C18 5.5 15.5 3 12 3Z" fill="currentColor"/>
    <rect x="9" y="16" width="6" height="3" rx="1" fill="white"/>
    <path d="M10 7L14 11M14 7L10 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const VintageUsers = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="8" cy="7" r="3" fill="currentColor"/>
    <circle cx="16" cy="7" r="3" fill="currentColor"/>
    <path d="M2 19V17C2 15.5 3 14 5 14H11C13 14 14 15.5 14 17V19" fill="currentColor"/>
    <path d="M10 19V17C10 15.5 11 14 13 14H19C21 14 22 15.5 22 17V19" fill="currentColor"/>
    <circle cx="8" cy="7" r="1" fill="white"/>
    <circle cx="16" cy="7" r="1" fill="white"/>
  </svg>
);