import React from 'react';

export default function HackerHouseGoaLogo({ width = 320, height = 50, style = {}, className = "" }) {
  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {/* 1. Base: Yellow Serif "HACKER HOUSE" from Image 1 */}
      <img 
        src="/assets/hacker_house_title.png" 
        alt="HACKER HOUSE" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />

      {/* 2. Center: Pink & Yellow "गोवा" Sticker Badge from Image 2 layered on top (like Image 3) */}
      <img 
        src="/assets/goa_sticker.png" 
        alt="गोवा" 
        style={{
          position: 'absolute',
          top: '46%',
          left: '48.5%',
          transform: 'translate(-50%, -50%)',
          height: '94%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
