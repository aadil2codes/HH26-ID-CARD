import React from 'react';

export default function EventHeroHeader() {
  return (
    <header 
      style={{
        width: '100%',
        backgroundColor: '#095E35',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(15, 122, 70, 0.4) 0%, rgba(7, 76, 43, 0.95) 100%)',
        borderBottom: '2.5px solid #F9D312',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Subtle background wave ornament */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.08,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(#FAF7EE 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Top Navbar Row: 2:47PM STUDIO & CHECK HYPE */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '20px 32px 10px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Left: 2:47PM STUDIO Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.9 }}>
          <span 
            style={{
              fontFamily: "'Space Grotesk', 'Impact', sans-serif",
              fontSize: '22px',
              fontWeight: '900',
              color: '#F9D312',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 0 #042E19'
            }}
          >
            2:47PM
          </span>
          <span 
            style={{
              fontFamily: "'Space Grotesk', 'Impact', sans-serif",
              fontSize: '13px',
              fontWeight: '900',
              color: '#F9D312',
              letterSpacing: '0.12em',
              textShadow: '0 1.5px 0 #042E19'
            }}
          >
            STUDIO
          </span>
        </div>

        {/* Right: CHECK HYPE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span 
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px',
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: '0.12em'
            }}
          >
            CHECK HYPE
          </span>
        </div>
      </div>

      {/* Hero Center Title: HACKER गोवा HOUSE */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '10px 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            gap: '8px',
            position: 'relative',
            marginTop: '8px',
            marginBottom: '16px'
          }}
        >
          {/* HACKER (Ultra-tall condensed high-contrast serif) */}
          <h1 
            style={{
              margin: 0,
              fontFamily: "'Bodoni Moda', 'DM Serif Display', serif",
              fontSize: 'clamp(48px, 7.5vw, 105px)',
              fontWeight: '900',
              color: '#F9D312',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              textShadow: '-2px -2px 0 #042E19, 2px -2px 0 #042E19, -2px 2px 0 #042E19, 2px 2px 0 #042E19, 0 5px 0 #042E19'
            }}
          >
            HACKER
          </h1>

          {/* Devanagari गोवा script */}
          <span 
            style={{
              fontFamily: "'Rozha One', 'Yatra One', serif",
              fontSize: 'clamp(32px, 5.2vw, 75px)',
              fontWeight: '900',
              color: '#FF3B9A',
              lineHeight: 0.95,
              zIndex: 3,
              margin: '0 2px',
              textShadow: `
                -2px -2px 0 #F9D312,
                2px -2px 0 #F9D312,
                -2px 2px 0 #F9D312,
                2px 2px 0 #F9D312,
                -3px 0 0 #F9D312,
                3px 0 0 #F9D312,
                0 -3px 0 #F9D312,
                0 3px 0 #F9D312,
                0 6px 0 #042E19
              `
            }}
          >
            गोवा
          </span>

          {/* HOUSE (Ultra-tall condensed high-contrast serif) */}
          <h1 
            style={{
              margin: 0,
              fontFamily: "'Bodoni Moda', 'DM Serif Display', serif",
              fontSize: 'clamp(48px, 7.5vw, 105px)',
              fontWeight: '900',
              color: '#F9D312',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              textShadow: '-2px -2px 0 #042E19, 2px -2px 0 #042E19, -2px 2px 0 #042E19, 2px 2px 0 #042E19, 0 5px 0 #042E19'
            }}
          >
            HOUSE
          </h1>
        </div>

        {/* Sub-Bar Row: GOA, INDIA • 28 - 31 OCT 2026 & 2:47 PM STUDIO */}
        <div 
          style={{
            width: '100%',
            maxWidth: '1080px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px',
            boxSizing: 'border-box'
          }}
        >
          <span 
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              fontWeight: '700',
              color: '#F9D312',
              letterSpacing: '0.1em'
            }}
          >
            GOA, INDIA &nbsp;•&nbsp; 28 - 31 OCT 2026
          </span>

          <span 
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(11px, 1.2vw, 14px)',
              fontWeight: '700',
              color: '#F9D312',
              letterSpacing: '0.1em'
            }}
          >
            2:47 PM STUDIO
          </span>
        </div>

        {/* Downward connecting vertical accent line */}
        <div 
          style={{
            width: '2px',
            height: '24px',
            backgroundColor: '#F9D312',
            marginTop: '16px',
            marginBottom: '-24px'
          }} 
        />
      </div>
    </header>
  );
}
