import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { User, Briefcase, Fingerprint, Calendar, MapPin, Shield } from 'lucide-react';
import { 
  SidebarLogoEmblem,
  SidebarBottomOrnament,
  BuildersOnBoardBadge,
  GoaPostageStamp,
  CoastalSunsetScenery,
  BarcodeWithEndCaps
} from './SVGAssets';

export default function CardFront({ 
  name = "AADIL", 
  role = "FULL STACK DEVELOPER", 
  builderId = "HH-GOA-7XXX", 
  qrUrl = "https://hh-26-id-card-gen.vercel.app/", 
  avatarUrl = "", 
  zoom = 1.2, 
  offsetX = 0, 
  offsetY = 0 
}) {
  return (
    <div 
      className="card-face select-none"
      style={{
        width: '430px',
        height: '650px',
        display: 'flex',
        backgroundColor: '#FAF7EE',
        border: '3.5px solid #063B21',
        borderRadius: '32px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* ========================================================= */}
      {/* 1. LEFT SIDEBAR (Dark Forest Green with Vertical Identity) */}
      {/* ========================================================= */}
      <div 
        style={{
          width: '74px',
          height: '100%',
          backgroundColor: '#063B21',
          borderRight: '3px solid #F9D312',
          boxSizing: 'border-box',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0 8px 0',
          zIndex: 5
        }}
      >
        {/* Secondary Pink Stripe on Sidebar Right Edge */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: '-6px',
            width: '3px',
            height: '100%',
            backgroundColor: '#FF3B9A',
            zIndex: 6
          }} 
        />

        {/* Top: Star + HH Logo Emblem + GOA 2026 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <span style={{ color: '#F9D312', fontSize: '13px', lineHeight: 1 }}>✦</span>
          <SidebarLogoEmblem width={44} height={32} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1, marginTop: '2px' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.08em' }}>
              GOA
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: '900', color: '#F9D312', letterSpacing: '0.08em' }}>
              2026
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
            <span style={{ color: '#FF3B9A', fontSize: '10px' }}>✦</span>
            <div style={{ width: '22px', borderTop: '1.5px dotted #FF3B9A' }} />
          </div>
        </div>

        {/* Middle: Big Vertical Rotated Text "HH GOA 2026" */}
        <div 
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: '900',
            letterSpacing: '0.06em',
            margin: 'auto 0'
          }}
        >
          <span style={{ color: '#FF3B9A', fontSize: '24px', letterSpacing: '0.04em' }}>
            HH
          </span>
          <span style={{ color: '#FFFFFF', fontSize: '24px', letterSpacing: '0.08em' }}>
            GOA 2026
          </span>
        </div>

        {/* Bottom Details: Date, Location & Tropical Palm Ornament */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '2px' }}>
            <div style={{ width: '24px', borderTop: '1.5px dotted #FF3B9A' }} />
            <span style={{ color: '#FF3B9A', fontSize: '11px' }}>✦</span>
          </div>

          {/* Vertical text (Enlarged & Bold) */}
          <div 
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              marginBottom: '4px'
            }}
          >
            <span>GOA • INDIA</span>
            <span style={{ color: '#F9D312' }}>28-31 OCT 2026</span>
          </div>

          <span style={{ color: '#F9D312', fontSize: '13px', lineHeight: 1 }}>✦</span>
          
          {/* Bottom Palm + Sun + Wave graphic */}
          <SidebarBottomOrnament />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN RIGHT CANVAS AREA                                */}
      {/* ========================================================= */}
      <div 
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 12px 6px 14px',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* ----------------- Header Top Row ----------------- */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%' }}>
          <span style={{ color: '#FF3B9A', fontSize: '10px' }}>✦</span>
          <div style={{ flex: 1, borderTop: '1px dotted #FF3B9A' }} />
          <span style={{ color: '#FF3B9A', fontSize: '10px' }}>✦</span>
          <span 
            style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontWeight: '900', 
              fontSize: '11.5px', 
              color: '#063B21', 
              letterSpacing: '0.12em' 
            }}
          >
            HH GOA 2026
          </span>
          <span style={{ color: '#FF3B9A', fontSize: '10px' }}>✦</span>
          <div style={{ flex: 1, borderTop: '1px dotted #FF3B9A' }} />
          <span style={{ color: '#FF3B9A', fontSize: '10px' }}>✦</span>
        </div>

        {/* ----------------- Main Title: HACKER गोवा HOUSE (Official Logo Image) ----------------- */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: '3px',
            marginBottom: '3px',
            position: 'relative',
            width: '100%',
            height: '44px'
          }}
        >
          <img 
            src="/hacker-house-logo.png" 
            alt="Hacker House Goa Logo" 
            style={{ 
              height: '44px', 
              maxWidth: '100%', 
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0.8px 0.8px 0px #063B21) drop-shadow(-0.8px -0.8px 0px #063B21) drop-shadow(0.8px -0.8px 0px #063B21) drop-shadow(-0.8px 0.8px 0px #063B21) drop-shadow(0px 2.5px 4px rgba(2, 27, 15, 0.45))'
            }} 
          />
        </div>

        {/* ----------------- Subtitle: ✦ BUILDER FIELD PASS ✦ ----------------- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <div 
            style={{
              backgroundColor: '#063B21',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '3px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: '900',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.08em',
              border: '1.2px solid #021B0F'
            }}
          >
            <span style={{ color: '#F9D312', fontSize: '9px' }}>✦</span>
            <span>BUILDER FIELD PASS</span>
            <span style={{ color: '#F9D312', fontSize: '9px' }}>✦</span>
          </div>

          {/* Green wave ripples */}
          <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
            <path d="M 0 3 C 8 0 16 6 24 3 T 40 3" stroke="#063B21" strokeWidth="1.5" />
            <path d="M 0 8 C 8 5 16 11 24 8 T 40 8" stroke="#063B21" strokeWidth="1.5" />
            <path d="M 0 13 C 8 10 16 16 24 13 T 40 13" stroke="#063B21" strokeWidth="1.5" />
          </svg>
        </div>

        {/* ----------------- Central User Photo + Scenery Area ----------------- */}
        <div 
          style={{ 
            marginTop: '8px', 
            position: 'relative', 
            height: '245px',
            width: '100%',
            display: 'flex'
          }}
        >
          {/* Main User Photo Frame */}
          <div 
            style={{
              width: '185px',
              height: '240px',
              borderRadius: '20px',
              border: '2.5px solid #063B21',
              backgroundColor: '#021B0F',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 3
            }}
          >
            {/* Photo frame overlay with flying bird silhouettes */}
            <svg width="185" height="240" viewBox="0 0 185 240" fill="none" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
              {/* Flying bird silhouettes */}
              <path d="M 14 36 Q 18 32 21 36 Q 24 32 27 36" stroke="#021B0F" strokeWidth="1.2" fill="none" />
              <path d="M 28 42 Q 31 39 34 42 Q 37 39 40 42" stroke="#021B0F" strokeWidth="1" fill="none" />
            </svg>

            {avatarUrl ? (
              (() => {
                // Guaranteed bleed calculation ensuring image exceeds frame edges in all directions
                const requiredExtraY = Math.abs(offsetY) + 12;
                const requiredExtraX = Math.abs(offsetX) + 12;
                const minZoomY = 1 + (requiredExtraY * 2) / 240;
                const minZoomX = 1 + (requiredExtraX * 2) / 185;
                const effectiveZoom = Math.max(zoom || 1.15, minZoomY, minZoomX, 1.1);

                return (
                  <img 
                    src={avatarUrl} 
                    alt="Builder" 
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      transform: `translate(${offsetX}px, ${offsetY}px) scale(${effectiveZoom})`,
                      transformOrigin: 'center'
                    }}
                  />
                );
              })()
            ) : (
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#094029',
                  color: '#FAF7EE'
                }}
              >
                <span style={{ fontSize: '32px' }}>🌴</span>
                <span style={{ fontFamily: 'Space Grotesk', fontSize: '10px', marginTop: '6px', fontWeight: 'bold' }}>PHOTO</span>
              </div>
            )}
          </div>

          {/* Right Side Background Scenery Elements */}
          <div style={{ flex: 1, position: 'relative', height: '100%' }}>
            {/* Top Right: Builders on Board Stamp */}
            <div style={{ position: 'absolute', right: '-8px', top: '-20px', zIndex: 4 }}>
              <BuildersOnBoardBadge size={80} />
            </div>

            {/* Middle Right: Goa India Scalloped Postage Stamp with Pink Cancellation Waves (Added clear margin) */}
            <div style={{ position: 'absolute', right: '-2px', top: '72px', zIndex: 4 }}>
              <GoaPostageStamp width={78} height={62} />
            </div>

            {/* Bottom Right: Coastal Sunset + Sailboat + Surfboard + Coffee Scene */}
            <div style={{ position: 'absolute', right: '-12px', bottom: '-8px', zIndex: 2 }}>
              <CoastalSunsetScenery />
            </div>
          </div>
        </div>

        {/* ----------------- Personal Details Box (3 Rows with Perfectly Aligned Separators) ----------------- */}
        <div 
          style={{
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            border: '1.8px solid #063B21',
            borderRadius: '16px',
            padding: '4px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            zIndex: 4
          }}
        >
          {/* Row 1: Name */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '3px 0' }}>
            <div style={{ width: '132px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FF3B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                <User size={13} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10.5px', fontWeight: '900', color: '#063B21', letterSpacing: '0.04em' }}>
                NAME
              </span>
            </div>

            {/* Aligned Vertical Divider */}
            <div style={{ width: '1.5px', height: '14px', backgroundColor: '#063B21', opacity: 0.3, flexShrink: 0 }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, paddingLeft: '10px' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px', fontWeight: '900', color: name ? '#063B21' : 'rgba(6, 59, 33, 0.4)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                {name ? name.toUpperCase() : "ROHIT KUMAR"}
              </span>
              <span style={{ color: '#FF3B9A', fontSize: '11px', marginLeft: 'auto' }}>✦</span>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed rgba(6, 59, 33, 0.2)' }} />

          {/* Row 2: Builder Class */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '3px 0' }}>
            <div style={{ width: '132px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FF3B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                <Briefcase size={12} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10.5px', fontWeight: '900', color: '#063B21', letterSpacing: '0.04em' }}>
                BUILDER CLASS
              </span>
            </div>

            {/* Aligned Vertical Divider */}
            <div style={{ width: '1.5px', height: '14px', backgroundColor: '#063B21', opacity: 0.3, flexShrink: 0 }} />

            <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '10px' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '900', color: role ? '#063B21' : 'rgba(6, 59, 33, 0.4)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {role ? role.toUpperCase() : "FULL STACK DEVELOPER"}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed rgba(6, 59, 33, 0.2)' }} />

          {/* Row 3: Builder ID */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '3px 0' }}>
            <div style={{ width: '132px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FF3B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                <Fingerprint size={13} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10.5px', fontWeight: '900', color: '#063B21', letterSpacing: '0.04em' }}>
                BUILDER ID
              </span>
            </div>

            {/* Aligned Vertical Divider */}
            <div style={{ width: '1.5px', height: '14px', backgroundColor: '#063B21', opacity: 0.3, flexShrink: 0 }} />

            <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '10px' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: '900', color: '#063B21', letterSpacing: '0.06em' }}>
                {builderId || "HH-GOA-2026"}
              </span>
            </div>
          </div>
        </div>

        {/* ----------------- Verification / QR Box (Bottom) ----------------- */}
        <div 
          style={{
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            border: '1.8px solid #063B21',
            borderRadius: '16px',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.35fr',
            height: '110px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            zIndex: 4
          }}
        >
          {/* Left Panel: Digital Builder Pass + QR Code */}
          <div 
            style={{
              borderRight: '1.5px solid #063B21',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              position: 'relative'
            }}
          >
            <div 
              style={{
                backgroundColor: '#FF3B9A',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '2px 10px',
                fontSize: '8px',
                fontWeight: '900',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.06em',
                marginBottom: '4px',
                textTransform: 'uppercase'
              }}
            >
              DIGITAL BUILDER PASS
            </div>

            <div 
              style={{
                border: '1.5px solid #F9D312',
                borderRadius: '6px',
                padding: '2px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 1px #063B21'
              }}
            >
              <QRCodeSVG 
                value={qrUrl || "https://hh-26-id-card-gen.vercel.app/"} 
                size={58} 
                bgColor="#FFFFFF" 
                fgColor="#063B21" 
                level="M" 
                includeMargin={false} 
              />
            </div>

            <span style={{ position: 'absolute', left: '6px', top: '55%', transform: 'translateY(-50%)', color: '#FF3B9A', fontSize: '9px' }}>\ - /</span>
            <span style={{ position: 'absolute', right: '6px', top: '55%', transform: 'translateY(-50%)', color: '#FF3B9A', fontSize: '9px' }}>\ - /</span>
          </div>

          {/* Right Panel: Verified Builder Shield + ID + Barcode */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 6px',
              position: 'relative'
            }}
          >
            {/* Shield + Verified Builder Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1px' }}>
              <svg width="18" height="18" viewBox="0 0 18 20" fill="none">
                <path d="M 9 1 C 13 1 16 2.5 16 2.5 C 16 2.5 17 9 15 13 C 13 17 9 19 9 19 C 9 19 5 17 3 13 C 1 9 2 2.5 2 2.5 C 2 2.5 5 1 9 1 Z" stroke="#063B21" strokeWidth="2" fill="#FAF7EE" />
                <path d="M 6 10 L 8 12 L 12 7" stroke="#FF3B9A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span 
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9.5px',
                  fontWeight: '900',
                  color: '#063B21',
                  letterSpacing: '0.04em'
                }}
              >
                VERIFIED BUILDER
              </span>
            </div>

            {/* Builder ID in Pink */}
            <span 
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                fontWeight: '900',
                color: '#FF3B9A',
                letterSpacing: '0.06em',
                marginBottom: '2px'
              }}
            >
              {builderId || "HH-GOA-7XXX"}
            </span>

            {/* Dotted yellow divider */}
            <div style={{ width: '86%', borderTop: '1.5px dotted #F9D312', marginBottom: '3px' }} />

            {/* Detailed Barcode with Pink Caps */}
            <BarcodeWithEndCaps width={138} height={18} />

            <span style={{ position: 'absolute', left: '6px', bottom: '6px', color: '#F9D312', fontSize: '8px' }}>✦</span>
            <span style={{ position: 'absolute', right: '6px', bottom: '6px', color: '#F9D312', fontSize: '8px' }}>✦</span>
          </div>
        </div>

        {/* ----------------- Footer Row (Increased Size) ----------------- */}
        <div 
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            boxSizing: 'border-box'
          }}
        >
          {/* Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} color="#FF3B9A" strokeWidth={2.5} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: '900', color: '#063B21', letterSpacing: '0.02em' }}>28 – 31</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: '900', color: '#063B21', letterSpacing: '0.02em' }}>OCT 2026</span>
            </div>
          </div>

          <div style={{ width: '1.2px', height: '18px', backgroundColor: '#FF3B9A', opacity: 0.6 }} />

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} color="#FF3B9A" strokeWidth={2.5} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11.5px', fontWeight: '900', color: '#063B21', letterSpacing: '0.03em' }}>
              GOA, INDIA
            </span>
          </div>

          <div style={{ width: '1.2px', height: '18px', backgroundColor: '#FF3B9A', opacity: 0.6 }} />

          {/* Hashtag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px', lineHeight: 1 }}>🌴</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '900', color: '#FF3B9A', letterSpacing: '0.04em' }}>
              #FRAMEINGOA
            </span>
          </div>
        </div>

        {/* Subtle Bottom Wave Line */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
          <svg width="100%" height="4" viewBox="0 0 300 4" fill="none">
            <path d="M 0 2 Q 25 0 50 2 T 100 2 T 150 2 T 200 2 T 250 2 T 300 2" stroke="#063B21" strokeWidth="0.8" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
