import React from 'react';

// Color Palette Constants
export const HH_COLORS = {
  green: '#063B21',
  greenDark: '#021B0F',
  greenLight: '#094029',
  yellow: '#F9D312',
  pink: '#FF3B9A',
  cream: '#FAF7EE',
  white: '#FFFFFF',
  textDark: '#063B21'
};

// 1. Sidebar Logo Emblem: Pink H + Yellow H with Palm Center
export const SidebarLogoEmblem = ({ width = 46, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pink Left H */}
    <path d="M 4 4 H 11 V 15 H 17 V 4 H 24 V 32 H 17 V 21 H 11 V 32 H 4 Z" fill="#FF3B9A" />
    {/* Yellow Right H */}
    <path d="M 22 4 H 29 V 15 H 35 V 4 H 42 V 32 H 35 V 21 H 29 V 32 H 22 Z" fill="#F9D312" />
    {/* Overlap center Palm Silhouette */}
    <g transform="translate(17, 8) scale(0.6)">
      <path d="M 10 24 Q 11 14 9 4" stroke="#021B0F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 9 4 Q 2 3 0 0 Q 5 2 9 4 Z" fill="#021B0F" />
      <path d="M 9 4 Q 10 -2 14 -1 Q 12 2 9 4 Z" fill="#021B0F" />
      <path d="M 9 4 Q 16 3 18 0 Q 13 2 9 4 Z" fill="#021B0F" />
    </g>
  </svg>
);

// 2. Sidebar Bottom Palm + Setting Sun + Waves
export const SidebarBottomOrnament = () => (
  <svg width="60" height="75" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pink Half Sun */}
    <path d="M 22 55 A 18 18 0 0 1 58 55 Z" fill="#FF3B9A" />
    
    {/* Palm Tree */}
    <path d="M 22 60 Q 28 35 18 16" stroke="#F9D312" strokeWidth="3" strokeLinecap="round" />
    <path d="M 18 16 Q 4 14 0 4 Q 10 10 18 16 Z" fill="#F9D312" />
    <path d="M 18 16 Q 16 0 24 2 Q 20 11 18 16 Z" fill="#F9D312" />
    <path d="M 18 16 Q 32 10 38 20 Q 27 16 18 16 Z" fill="#F9D312" />
    <path d="M 18 16 Q 30 26 26 36 Q 22 26 18 16 Z" fill="#F9D312" />

    {/* 3 Wave Lines at bottom */}
    <path d="M 4 64 Q 14 61 24 64 T 44 64 T 58 64" stroke="#FAF7EE" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 4 69 Q 14 66 24 69 T 44 69 T 58 69" stroke="#FAF7EE" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 4 74 Q 14 71 24 74 T 44 74 T 58 74" stroke="#FAF7EE" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3. Builders on Board Pink Circular Stamp (Top Right)
export const BuildersOnBoardBadge = ({ size = 84 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Double Rings */}
    <circle cx="50" cy="50" r="47" fill="#FAF7EE" stroke="#063B21" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#063B21" strokeWidth="1.2" strokeDasharray="3 2" />
    
    {/* Center Palm Tree in Pink */}
    <path d="M 49 65 Q 51 52 48 40 Q 50 39 53 52 Q 52 65 49 65 Z" fill="#FF3B9A" />
    <path d="M 48 40 Q 34 38 29 46 Q 38 43 48 40 Z" fill="#FF3B9A" />
    <path d="M 48 40 Q 48 28 55 30 Q 50 37 48 40 Z" fill="#FF3B9A" />
    <path d="M 48 40 Q 62 38 67 47 Q 58 43 48 40 Z" fill="#FF3B9A" />

    {/* Side Accent Stars */}
    <path d="M 19 50 L 21 52 L 19 54 L 17 52 Z" fill="#FF3B9A" />
    <path d="M 81 50 L 83 52 L 81 54 L 79 52 Z" fill="#FF3B9A" />

    {/* Top Text: BUILDERS (Pink, Bold) */}
    <text 
      fontFamily="'Space Grotesk', sans-serif" 
      fontSize="10.5" 
      fontWeight="900" 
      fill="#FF3B9A" 
      textAnchor="middle" 
      letterSpacing="0.12em"
    >
      <textPath href="#bob-arc-top" startOffset="50%">
        BUILDERS
      </textPath>
    </text>

    {/* Bottom Text: ON BOARD (Dark Green, Bold) */}
    <text 
      fontFamily="'Space Grotesk', sans-serif" 
      fontSize="9.5" 
      fontWeight="900" 
      fill="#063B21" 
      textAnchor="middle" 
      letterSpacing="0.12em"
    >
      <textPath href="#bob-arc-bottom" startOffset="50%">
        ON BOARD
      </textPath>
    </text>

    <defs>
      {/* Top Arc (Clockwise over the top) */}
      <path id="bob-arc-top" d="M 18,50 A 32,32 0 1,1 82,50" />
      {/* Bottom Arc (Clockwise along the bottom curve for correct orientation) */}
      <path id="bob-arc-bottom" d="M 82,50 A 32,32 0 0,1 18,50" />
    </defs>
  </svg>
);

// 4. Goa India Postage Stamp with Cancellation Wavy Lines
export const GoaPostageStamp = ({ width = 76, height = 65 }) => (
  <svg width={width} height={height} viewBox="0 0 88 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Scalloped Postage Stamp Border */}
    <path 
      d="
        M 8,8 
        A 3,3 0 0 1 16,8 A 3,3 0 0 1 24,8 A 3,3 0 0 1 32,8 A 3,3 0 0 1 40,8 A 3,3 0 0 1 48,8 A 3,3 0 0 1 56,8 A 3,3 0 0 1 64,8 A 3,3 0 0 1 72,8 A 3,3 0 0 1 80,8
        L 80,16 A 3,3 0 0 1 80,24 A 3,3 0 0 1 80,32 A 3,3 0 0 1 80,40 A 3,3 0 0 1 80,48 A 3,3 0 0 1 80,56 A 3,3 0 0 1 80,64
        L 72,64 A 3,3 0 0 1 64,64 A 3,3 0 0 1 56,64 A 3,3 0 0 1 48,64 A 3,3 0 0 1 40,64 A 3,3 0 0 1 32,64 A 3,3 0 0 1 24,64 A 3,3 0 0 1 16,64 A 3,3 0 0 1 8,64
        L 8,56 A 3,3 0 0 1 8,48 A 3,3 0 0 1 8,40 A 3,3 0 0 1 8,32 A 3,3 0 0 1 8,24 A 3,3 0 0 1 8,16
        Z
      " 
      fill="#FAF7EE" 
      stroke="#063B21" 
      strokeWidth="1.8" 
    />
    
    {/* Inner Stamp Canvas */}
    <rect x="13" y="13" width="62" height="46" rx="2" fill="#FAF7EE" stroke="#063B21" strokeWidth="1" />
    
    {/* Text: GOA INDIA */}
    <text x="17" y="24" fontFamily="'Space Grotesk', sans-serif" fontSize="8" fontWeight="900" fill="#FF3B9A" letterSpacing="0.04em">
      GOA
    </text>
    <text x="17" y="32" fontFamily="'Space Grotesk', sans-serif" fontSize="6.5" fontWeight="900" fill="#063B21" letterSpacing="0.04em">
      INDIA
    </text>

    {/* Ocean Blue base */}
    <rect x="13" y="42" width="62" height="17" fill="#0E6B65" />
    
    {/* Yellow Sun */}
    <circle cx="48" cy="42" r="8" fill="#F9D312" />

    {/* Palm Tree on Right */}
    <path d="M 68 56 Q 66 40 68 28" stroke="#063B21" strokeWidth="2" strokeLinecap="round" />
    <path d="M 68 28 Q 54 26 52 20 Q 60 24 68 28 Z" fill="#063B21" />
    <path d="M 68 28 Q 68 18 73 19 Q 70 24 68 28 Z" fill="#063B21" />
    <path d="M 68 28 Q 78 26 80 32 Q 74 30 68 28 Z" fill="#063B21" />

    {/* Pink Postmark Waves overlapping to the left */}
    <g transform="translate(-18, 15)">
      <path d="M 0 10 C 10 5 20 15 30 10 T 50 10" stroke="#FF3B9A" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 0 16 C 10 11 20 21 30 16 T 50 16" stroke="#FF3B9A" strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M 0 22 C 10 17 20 27 30 22 T 50 22" stroke="#FF3B9A" strokeWidth="1.2" fill="none" opacity="0.8" />
    </g>
  </svg>
);

// 5. Tropical Coastal Scene (Right of Photo - Sun, Sailboat, Waves, Surfboard, Coffee)
export const CoastalSunsetScenery = () => (
  <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fluffy clouds behind sun */}
    <path d="M 0 60 Q 8 48 20 52 Q 28 42 42 46 Q 52 48 55 60 Z" fill="#FAF7EE" opacity="0.9" />
    
    {/* Large Golden Setting Sun */}
    <circle cx="28" cy="62" r="20" fill="#F9D312" />

    {/* Blue Ocean Waves with reflection */}
    <path d="M 0 76 C 20 72 40 78 60 74 C 80 70 100 76 120 74 L 120 120 L 0 120 Z" fill="#0A7570" />
    <path d="M 0 86 C 20 83 40 88 60 85 C 80 82 100 87 120 85" stroke="#FAF7EE" strokeWidth="1.2" opacity="0.6" />
    <path d="M 0 96 C 20 93 40 98 60 95 C 80 92 100 97 120 95" stroke="#FAF7EE" strokeWidth="1.2" opacity="0.6" />
    <path d="M 0 106 C 20 103 40 108 60 105 C 80 102 100 107 120 105" stroke="#FAF7EE" strokeWidth="1.2" opacity="0.6" />

    {/* Sailboat gliding on water */}
    <polygon points="38,82 43,68 43,82" fill="#FAF7EE" stroke="#021B0F" strokeWidth="1" />
    <polygon points="44,82 44,72 48,82" fill="#FAF7EE" stroke="#021B0F" strokeWidth="1" />
    <polygon points="36,83 50,83 46,86 40,86" fill="#063B21" />

    {/* Flying birds */}
    <path d="M 10 20 Q 14 16 17 20 Q 20 16 23 20" stroke="#021B0F" strokeWidth="1.2" fill="none" />
    <path d="M 30 28 Q 33 25 36 28 Q 39 25 42 28" stroke="#021B0F" strokeWidth="1" fill="none" />

    {/* Palm Trees on the Right */}
    <path d="M 105 130 Q 98 75 92 48" stroke="#021B0F" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 92 48 Q 72 44 68 34 Q 80 40 92 48 Z" fill="#063B21" stroke="#021B0F" strokeWidth="1" />
    <path d="M 92 48 Q 90 30 98 32 Q 95 40 92 48 Z" fill="#063B21" stroke="#021B0F" strokeWidth="1" />
    <path d="M 92 48 Q 112 40 118 52 Q 105 47 92 48 Z" fill="#063B21" stroke="#021B0F" strokeWidth="1" />
    <path d="M 92 48 Q 110 60 104 72 Q 98 58 92 48 Z" fill="#063B21" stroke="#021B0F" strokeWidth="1" />

    {/* Surfboard on the right */}
    <path d="M 88 126 Q 83 95 91 95 Q 98 95 97 126 Z" fill="#F9D312" stroke="#021B0F" strokeWidth="1.8" />
    <path d="M 88 108 L 96 112" stroke="#FF3B9A" strokeWidth="2" />

    {/* Wooden Table Deck with Coffee Cup */}
    <rect x="25" y="122" width="40" height="6" rx="2" fill="#D97736" stroke="#021B0F" strokeWidth="1.2" />
    <rect x="30" y="128" width="5" height="18" fill="#B35B22" stroke="#021B0F" strokeWidth="1.2" />
    <rect x="55" y="128" width="5" height="18" fill="#B35B22" stroke="#021B0F" strokeWidth="1.2" />
    {/* Steaming Coffee Cup */}
    <path d="M 38 114 H 50 V 120 C 50 122 48 123 44 123 C 40 123 38 122 38 120 Z" fill="#F9D312" stroke="#021B0F" strokeWidth="1.2" />
    <path d="M 50 116 C 53 116 53 120 50 120" stroke="#021B0F" strokeWidth="1.2" fill="none" />
    {/* Steam vapor */}
    <path d="M 42 111 Q 44 108 42 105" stroke="#FAF7EE" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 46 110 Q 48 107 46 104" stroke="#FAF7EE" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 6. Precise Barcode with Pink End-Caps
export const BarcodeWithEndCaps = ({ width = 160, height = 24 }) => (
  <svg width={width} height={height} viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Pink End-Cap */}
    <rect x="0" y="0" width="3" height="24" fill="#FF3B9A" rx="1" />
    
    {/* Dark Green Barcode Lines */}
    <rect x="7" y="0" width="3" height="24" fill="#063B21" />
    <rect x="13" y="0" width="1.5" height="24" fill="#063B21" />
    <rect x="17" y="0" width="4" height="24" fill="#063B21" />
    <rect x="24" y="0" width="2" height="24" fill="#063B21" />
    <rect x="28" y="0" width="1" height="24" fill="#063B21" />
    <rect x="31" y="0" width="3.5" height="24" fill="#063B21" />
    <rect x="37" y="0" width="5" height="24" fill="#063B21" />
    <rect x="45" y="0" width="1.5" height="24" fill="#063B21" />
    <rect x="49" y="0" width="2.5" height="24" fill="#063B21" />
    <rect x="54" y="0" width="4" height="24" fill="#063B21" />
    <rect x="61" y="0" width="1" height="24" fill="#063B21" />
    <rect x="64" y="0" width="3" height="24" fill="#063B21" />
    <rect x="70" y="0" width="5" height="24" fill="#063B21" />
    <rect x="78" y="0" width="2" height="24" fill="#063B21" />
    <rect x="82" y="0" width="1" height="24" fill="#063B21" />
    <rect x="85" y="0" width="4" height="24" fill="#063B21" />
    <rect x="91" y="0" width="1.5" height="24" fill="#063B21" />
    <rect x="95" y="0" width="3.5" height="24" fill="#063B21" />
    <rect x="101" y="0" width="2" height="24" fill="#063B21" />
    <rect x="105" y="0" width="5" height="24" fill="#063B21" />
    <rect x="113" y="0" width="1" height="24" fill="#063B21" />
    <rect x="116" y="0" width="4" height="24" fill="#063B21" />
    <rect x="123" y="0" width="2" height="24" fill="#063B21" />
    <rect x="127" y="0" width="2.5" height="24" fill="#063B21" />
    <rect x="132" y="0" width="4" height="24" fill="#063B21" />
    <rect x="138" y="0" width="1.5" height="24" fill="#063B21" />
    <rect x="142" y="0" width="3.5" height="24" fill="#063B21" />
    <rect x="148" y="0" width="2" height="24" fill="#063B21" />

    {/* Right Pink End-Cap */}
    <rect x="154" y="0" width="3" height="24" fill="#FF3B9A" rx="1" />
  </svg>
);
