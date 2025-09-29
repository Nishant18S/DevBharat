import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Old-fashioned 2D Vintage Icons Collection - Part 2

export const VintageMail = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor"/>
    <path d="M2 7L12 13L22 7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="4" y="7" width="16" height="10" fill="white" fillOpacity="0.1"/>
  </svg>
);

export const VintageExternal = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 9L21 3M21 3H15M21 3V9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="7" y="7" width="8" height="8" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);

export const VintageAward = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="9" r="6" fill="currentColor"/>
    <path d="M8 15L6 21L9 19L12 21L15 19L18 21L16 15" fill="currentColor"/>
    <circle cx="12" cy="9" r="3" fill="white"/>
    <path d="M11 8L12 9L13 8" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const VintageFlag = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="4" y="2" width="2" height="20" fill="currentColor"/>
    <path d="M6 2H18L16 6L18 10H6V2Z" fill="currentColor"/>
    <rect x="8" y="4" width="8" height="4" fill="white" fillOpacity="0.3"/>
  </svg>
);

export const VintagePhone = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6 3H18C19 3 20 4 20 5V19C20 20 19 21 18 21H6C5 21 4 20 4 19V5C4 4 5 3 6 3Z" fill="currentColor"/>
    <rect x="6" y="5" width="12" height="12" rx="1" fill="white"/>
    <circle cx="12" cy="19" r="1" fill="white"/>
    <rect x="8" y="7" width="8" height="1" fill="currentColor"/>
    <rect x="8" y="9" width="8" height="1" fill="currentColor"/>
    <rect x="8" y="11" width="8" height="1" fill="currentColor"/>
  </svg>
);

export const VintageFile = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6 2H14L20 8V20C20 21 19 22 18 22H6C5 22 4 21 4 20V4C4 3 5 2 6 2Z" fill="currentColor"/>
    <path d="M14 2V8H20" fill="white"/>
    <rect x="7" y="11" width="10" height="1" fill="white"/>
    <rect x="7" y="14" width="10" height="1" fill="white"/>
    <rect x="7" y="17" width="7" height="1" fill="white"/>
  </svg>
);

export const VintageMapPin = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C8.5 2 6 4.5 6 8C6 12 12 22 12 22S18 12 18 8C18 4.5 15.5 2 12 2Z" fill="currentColor"/>
    <circle cx="12" cy="8" r="3" fill="white"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
  </svg>
);

export const VintageGithub = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M8 14C8 16 9 17 10 17C11 17 12 16 12 14V12" fill="none" stroke="white" strokeWidth="1.5"/>
    <path d="M12 12C12 14 13 17 16 17C17 17 18 16 18 14" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="9" cy="9" r="1" fill="white"/>
    <circle cx="15" cy="9" r="1" fill="white"/>
  </svg>
);

export const VintageLinkedin = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/>
    <rect x="6" y="10" width="2" height="8" fill="white"/>
    <circle cx="7" cy="7" r="1" fill="white"/>
    <path d="M12 10V18M12 10C12 8 13 8 14 8S16 8 16 10V18" fill="none" stroke="white" strokeWidth="2"/>
  </svg>
);

export const VintageUserPlus = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="9" cy="7" r="4" fill="currentColor"/>
    <path d="M3 21V19C3 16.5 5.5 14 9 14C12.5 14 15 16.5 15 19V21" fill="currentColor"/>
    <circle cx="9" cy="7" r="1.5" fill="white"/>
    <path d="M19 8V14M16 11H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const VintageDashboard = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor"/>
    <rect x="13" y="3" width="8" height="5" rx="1" fill="currentColor"/>
    <rect x="3" y="13" width="8" height="8" rx="1" fill="currentColor"/>
    <rect x="13" y="10" width="8" height="11" rx="1" fill="currentColor"/>
    <circle cx="7" cy="7" r="1" fill="white"/>
    <circle cx="17" cy="5.5" r="0.5" fill="white"/>
    <circle cx="7" cy="17" r="1" fill="white"/>
    <circle cx="17" cy="15.5" r="1" fill="white"/>
  </svg>
);

export const VintageCheck = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M8 12L11 15L16 9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VintageBuilding = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="4" y="6" width="16" height="16" fill="currentColor"/>
    <polygon points="4,6 12,2 20,6" fill="currentColor"/>
    <rect x="7" y="10" width="2" height="3" fill="white"/>
    <rect x="11" y="10" width="2" height="3" fill="white"/>
    <rect x="15" y="10" width="2" height="3" fill="white"/>
    <rect x="9" y="16" width="6" height="6" fill="white"/>
    <rect x="11" y="18" width="2" height="4" fill="currentColor"/>
    <circle cx="13.5" cy="19" r="0.5" fill="white"/>
  </svg>
);

export const VintageCart = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 3H5L7 13H19L21 5H7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="20" r="1.5" fill="currentColor"/>
    <rect x="8" y="7" width="11" height="4" rx="1" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

export const VintageMessage = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21 15C21 16 20 17 19 17H7L3 21V5C3 4 4 3 5 3H19C20 3 21 4 21 5V15Z" fill="currentColor"/>
    <rect x="6" y="7" width="12" height="1" fill="white"/>
    <rect x="6" y="10" width="8" height="1" fill="white"/>
    <rect x="6" y="13" width="10" height="1" fill="white"/>
  </svg>
);

export const VintageSmartphone = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="6" y="2" width="12" height="20" rx="2" fill="currentColor"/>
    <rect x="8" y="4" width="8" height="14" rx="1" fill="white"/>
    <circle cx="12" cy="20" r="1" fill="white"/>
    <rect x="10" y="6" width="4" height="1" fill="currentColor"/>
    <rect x="9" y="8" width="6" height="6" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);