import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Old-fashioned 2D Vintage Icons Collection - Part 3

export const VintageTarget = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const VintageCode = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 4L14 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const VintagePalette = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C10.5 22 9 21.5 8 20.5C7 19.5 6.5 18 6.5 16.5C6.5 15 7 13.5 8 12.5L12 2Z" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.5" fill="white"/>
    <circle cx="12" cy="6" r="1.5" fill="white"/>
    <circle cx="16" cy="8" r="1.5" fill="white"/>
    <circle cx="18" cy="12" r="1.5" fill="white"/>
    <circle cx="16" cy="16" r="1.5" fill="white"/>
  </svg>
);

export const VintageChart = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <rect x="7" y="14" width="2" height="4" fill="currentColor"/>
    <rect x="11" y="10" width="2" height="8" fill="currentColor"/>
    <rect x="15" y="6" width="2" height="12" fill="currentColor"/>
  </svg>
);

export const VintagePlay = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <polygon points="10,8 16,12 10,16" fill="white"/>
  </svg>
);

export const VintageEye = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="white"/>
  </svg>
);

export const VintageCloud = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18 10H17C16.5 6.5 13.5 4 10 4C6.5 4 4 6.5 4 10C2.5 10 1 11.5 1 13S2.5 16 4 16H18C20 16 22 14 22 12S20 10 18 10Z" fill="currentColor"/>
    <circle cx="8" cy="12" r="1" fill="white"/>
    <circle cx="12" cy="11" r="1" fill="white"/>
    <circle cx="16" cy="12" r="1" fill="white"/>
  </svg>
);

export const VintageStore = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 7L5 3H19L21 7V9C21 10 20 11 19 11C18 11 17 10 17 9C17 10 16 11 15 11C14 11 13 10 13 9C13 10 12 11 11 11C10 11 9 10 9 9C9 10 8 11 7 11C6 11 5 10 5 9C5 10 4 11 3 11V9Z" fill="currentColor"/>
    <rect x="4" y="11" width="16" height="10" fill="currentColor"/>
    <rect x="9" y="14" width="6" height="7" fill="white"/>
    <rect x="11" y="16" width="2" height="5" fill="currentColor"/>
    <circle cx="13.5" cy="17.5" r="0.5" fill="white"/>
  </svg>
);

export const VintageChevronLeft = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M15 18L9 12L15 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageChevronRight = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M9 18L15 12L9 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageMenu = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
    <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
  </svg>
);

export const VintageX = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18 6L6 18M6 6L18 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageDown = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6 9L12 15L18 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageUp = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18 15L12 9L6 15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageMore = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

export const VintageSearch = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M21 21L16.65 16.65" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const VintageDot = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export const VintageCloudOff = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18 10H17C16.5 6.5 13.5 4 10 4C6.5 4 4 6.5 4 10C2.5 10 1 11.5 1 13S2.5 16 4 16H18C20 16 22 14 22 12S20 10 18 10Z" fill="currentColor"/>
    <path d="M3 3L21 21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const VintageTrendingDown = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23 18L13.5 8.5L8.5 13.5L1 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 18H23V12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageHandCoins = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11 15H7C6 15 5 14 5 13V10C5 9 6 8 7 8H11" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M11 8C12 8 13 7 13 6S12 4 11 4S9 5 9 6S10 8 11 8Z" fill="currentColor"/>
    <circle cx="16" cy="8" r="3" fill="currentColor"/>
    <circle cx="20" cy="12" r="2" fill="currentColor"/>
    <circle cx="16" cy="8" r="1" fill="white"/>
    <circle cx="20" cy="12" r="0.5" fill="white"/>
  </svg>
);

export const VintageUserCheck = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="9" cy="7" r="4" fill="currentColor"/>
    <path d="M3 21V19C3 16.5 5.5 14 9 14C12.5 14 15 16.5 15 19V21" fill="currentColor"/>
    <circle cx="9" cy="7" r="1.5" fill="white"/>
    <path d="M16 11L18 13L22 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);