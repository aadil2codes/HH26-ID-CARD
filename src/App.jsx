import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Star, Download, Share2, Clipboard, Sparkles } from 'lucide-react';
import CardFront from './components/CardFront';
import ControlPanel from './components/ControlPanel';

export default function App() {
  // 1. Form States (Active inputs from user)
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formBuilderId, setFormBuilderId] = useState(() => `HH-GOA-${Math.floor(1000 + Math.random() * 9000)}`);
  const [formQrUrl, setFormQrUrl] = useState("https://hh-26-id-card-gen.vercel.app/");
  const [formAvatarUrl, setFormAvatarUrl] = useState("");
  
  // Image framing states
  const [formZoom, setFormZoom] = useState(1.2);
  const [formOffsetX, setFormOffsetX] = useState(0);
  const [formOffsetY, setFormOffsetY] = useState(0);

  // 2. Generated States (Committed states used to render the card)
  const [genName, setGenName] = useState("");
  const [genRole, setGenRole] = useState("");
  const [genBuilderId, setGenBuilderId] = useState(() => `HH-GOA-${Math.floor(1000 + Math.random() * 9000)}`);
  const [genQrUrl, setGenQrUrl] = useState("https://hh-26-id-card-gen.vercel.app/");
  const [genAvatarUrl, setGenAvatarUrl] = useState("");
  const [genZoom, setGenZoom] = useState(1.2);
  const [genOffsetX, setGenOffsetX] = useState(0);
  const [genOffsetY, setGenOffsetY] = useState(0);

  // 3. Workflow Control States
  const [hasGenerated, setHasGenerated] = useState(false);
  const [errors, setErrors] = useState({});
  const [shareNotice, setShareNotice] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenW = window.innerWidth;
      if (screenW < 480) {
        const availableW = Math.min(screenW - 32, 430);
        setCardScale(Math.max(0.6, availableW / 430));
      } else {
        setCardScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Element Ref for downloading
  const cardRef = useRef(null);

  // Validation & Generation Committer
  const handleGenerate = () => {
    const newErrors = {};

    if (!formAvatarUrl) {
      newErrors.avatar = "Please upload your profile photo.";
    }
    if (!formName.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    if (!formRole.trim()) {
      newErrors.role = "Please enter your builder class.";
    }
    if (!formBuilderId.trim()) {
      newErrors.builderId = "Please enter your builder ID.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Commit form state to generated state
    setGenName(formName);
    setGenRole(formRole);
    setGenBuilderId(formBuilderId);
    setGenQrUrl(formQrUrl);
    setGenAvatarUrl(formAvatarUrl);
    setGenZoom(formZoom);
    setGenOffsetX(formOffsetX);
    setGenOffsetY(formOffsetY);
    
    // Switch to preview mode
    setHasGenerated(true);

    // Auto-scroll to card on mobile devices
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  // Helper: Fast Base64 to Blob converter without network overhead
  const base64ToBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Ultra-Fast HD PNG Download
  const downloadCard = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: false,
        skipFonts: true,
        style: {
          transform: 'none'
        }
      });

      const filename = `${(genName || 'Builder').trim().replace(/\s+/g, '_')}_HHGoa2026_ID_Pass.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      showShareNotification("ID Card downloaded in HD!");
    } catch (error) {
      console.error('Error generating card image:', error);
      setIsDownloading(false);
    }
  };

  // Ultra-Fast Native Share & Instant Copy
  const handleShare = async () => {
    const appUrl = "https://hh-26-id-card-gen.vercel.app/";
    const textToShare = `🌴 Hacker House Goa 2026, here I come!\n\n🪪 Just created my own Builder Card for the Goa journey.\n👤 ${genName || 'Builder'} • #${genBuilderId || 'HH-GOA-2026'}\n\nExcited to meet fellow builders, learn, create, and build something meaningful together in Goa! 🚀\n\nCreate your own Builder Card:\n${appUrl}\n\n#FrameInGoa #HHGoa2026 #HackerHouse`;
    
    // Check for native mobile share capability
    if (navigator.share) {
      try {
        if (cardRef.current && navigator.canShare) {
          const dataUrl = await toPng(cardRef.current, {
            pixelRatio: 2,
            cacheBust: false,
            skipFonts: true,
            style: { transform: 'none' }
          });
          const blob = base64ToBlob(dataUrl);
          const file = new File([blob], `${(genName || 'Builder').trim().replace(/\s+/g, '_')}_HHGoa2026_ID.png`, { type: 'image/png' });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Hacker House Goa 2026 Builder Card',
              text: textToShare,
              files: [file]
            });
            showShareNotification("Card shared successfully!");
            return;
          }
        }

        // Text & URL share fallback
        await navigator.share({
          title: 'Hacker House Goa 2026 Builder Card',
          text: textToShare,
          url: appUrl
        });
        showShareNotification("Card shared successfully!");
        return;
      } catch (err) {
        if (err.name === 'AbortError') {
          return; // User dismissed share dialog
        }
        console.warn("Native share fallback triggered:", err);
      }
    }

    // Fallback: Copy to clipboard and launch X (Twitter) composer
    try {
      await navigator.clipboard.writeText(textToShare);
      showShareNotification("Post template copied! Opening X...");
    } catch (err) {
      showShareNotification("Opening X composer...");
    }

    const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;
    window.open(twitterIntent, '_blank', 'noopener,noreferrer');
  };

  const showShareNotification = (msg) => {
    setShareNotice(msg);
    setTimeout(() => setShareNotice(""), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          {/* 1. Header Banner */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* Official Transparent Hacker House Goa Logo */}
          <img 
            src="/hacker-house-logo.png" 
            alt="Hacker House Goa Logo" 
            style={{ 
              height: '42px', 
              objectFit: 'contain',
              display: 'block'
            }} 
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontSize: '17px', 
                  fontWeight: '800', 
                  letterSpacing: '0.04em', 
                  color: '#FFFFFF' 
                }}
              >
                HACKER HOUSE GOA 2026
              </span>
            </div>
            <span 
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontSize: '10px', 
                fontWeight: '700', 
                letterSpacing: '0.14em', 
                color: '#FFFFFF', 
                opacity: 0.75, 
                display: 'block', 
                marginTop: '1px' 
              }}
            >
              BUILDER FIELD PASS GENERATOR
            </span>
          </div>
        </div>

        <div className="header-meta-group" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9.5px', fontWeight: '800', letterSpacing: '0.12em', color: '#FF3B9A' }}>EVENT DATE</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '800', letterSpacing: '0.04em', color: '#FFFFFF', marginTop: '1px' }}>28 - 31 OCT 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9.5px', fontWeight: '800', letterSpacing: '0.12em', color: '#FF3B9A' }}>LOCATION</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '800', letterSpacing: '0.04em', color: '#FFFFFF', marginTop: '1px' }}>GOA, INDIA</span>
          </div>
        </div>
      </header>

      {/* 2. Main Workstation Area */}
      <main className="main-workstation">
        {/* Left Column: Personalizer Forms */}
        <section style={{ height: 'fit-content' }}>
          <ControlPanel 
            name={formName}
            setName={setFormName}
            role={formRole}
            setRole={setFormRole}
            builderId={formBuilderId}
            setBuilderId={setFormBuilderId}
            qrUrl={formQrUrl}
            setQrUrl={setFormQrUrl}
            zoom={formZoom}
            setZoom={setFormZoom}
            offsetX={formOffsetX}
            setOffsetX={setFormOffsetX}
            offsetY={formOffsetY}
            setOffsetY={setFormOffsetY}
            avatarUrl={formAvatarUrl}
            setAvatarUrl={setFormAvatarUrl}
            errors={errors}
            hasGenerated={hasGenerated}
            onGenerate={handleGenerate}
          />
        </section>

        {/* Right Column: Previews & Download Action Area */}
        <section 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {shareNotice && (
            <div 
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: 'var(--hh-pink)',
                color: 'var(--hh-white)',
                padding: '12px 24px',
                borderRadius: '12px',
                zIndex: 100,
                fontWeight: 'bold',
                fontFamily: 'Space Grotesk',
                border: '2px solid var(--hh-green-dark)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Clipboard size={16} />
              <span>{shareNotice}</span>
            </div>
          )}

          {/* Canvas Wrapper */}
          <div className="card-canvas-box">
            {/* View Mode 1: Empty Preview State */}
            {!hasGenerated ? (
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '42px 28px',
                  maxWidth: '440px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  border: '2.5px dashed rgba(249, 211, 18, 0.4)',
                  borderRadius: '28px',
                  backgroundColor: 'rgba(6, 59, 33, 0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}
                className="float-anim"
              >
                <div 
                  style={{ 
                    width: '84px', 
                    height: '84px', 
                    borderRadius: '50%', 
                    border: '3px solid var(--hh-yellow)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '36px', 
                    marginBottom: '20px', 
                    backgroundColor: 'var(--hh-green)',
                    boxShadow: '0 4px 16px rgba(249, 211, 18, 0.25)'
                  }}
                >
                  🌴
                </div>

                <h2 
                  className="retro-serif"
                  style={{
                    color: 'var(--hh-yellow)',
                    fontSize: '23px',
                    margin: '0 0 14px 0',
                    letterSpacing: '0.04em',
                    lineHeight: '1.25'
                  }}
                >
                  YOUR BUILDER FIELD PASS WILL APPEAR HERE
                </h2>
                
                <p 
                  className="grotesk" 
                  style={{ 
                    fontSize: '14.5px', 
                    opacity: 0.9, 
                    lineHeight: '1.6', 
                    margin: '0 0 24px 0',
                    fontWeight: '500'
                  }}
                >
                  “Fill in your details, upload your photo, adjust framing, and click Generate Card.”
                </p>

                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    width: '100%', 
                    alignItems: 'flex-start',
                    paddingLeft: '20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--hh-pink)', fontSize: '15px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>01.</span>
                    <span className="grotesk" style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.01em' }}>Upload profile picture</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--hh-pink)', fontSize: '15px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>02.</span>
                    <span className="grotesk" style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.01em' }}>Fill in Name &amp; Builder Class</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--hh-pink)', fontSize: '15px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>03.</span>
                    <span className="grotesk" style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.01em' }}>Adjust zoom &amp; face framing</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--hh-pink)', fontSize: '15px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>04.</span>
                    <span className="grotesk" style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.01em' }}>Click "GENERATE CARD"</span>
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode 2: Generated Card Display */
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '18px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* PREVIEW HEADER */}
                <div 
                  style={{
                    width: '90%',
                    maxWidth: '430px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(250, 247, 238, 0.1)',
                    paddingBottom: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Star className="text-[var(--hh-yellow)] fill-[var(--hh-yellow)]" size={14} />
                    <span className="grotesk text-[12px] font-bold tracking-wider text-[var(--hh-yellow)]">
                      BUILDER FIELD PASS
                    </span>
                  </div>
                </div>

                {/* Generated Card Scaled Container for Mobile / Desktop */}
                <div 
                  style={{ 
                    width: `${430 * cardScale}px`, 
                    height: `${650 * cardScale}px`, 
                    position: 'relative',
                    maxWidth: '100%',
                    margin: '0 auto',
                    overflow: 'hidden'
                  }}
                  className="float-anim"
                >
                  <div 
                    style={{ 
                      width: '430px', 
                      height: '650px', 
                      transform: `scale(${cardScale})`, 
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  >
                    <div ref={cardRef}>
                      <CardFront 
                        name={genName}
                        role={genRole}
                        builderId={genBuilderId}
                        qrUrl={genQrUrl}
                        avatarUrl={genAvatarUrl}
                        zoom={genZoom}
                        offsetX={genOffsetX}
                        offsetY={genOffsetY}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons: High-Res PNG Download & Share */}
                <div className="action-buttons-group">
                  <button 
                    onClick={downloadCard}
                    disabled={isDownloading}
                    style={{
                      padding: '13px 26px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--hh-yellow)',
                      color: 'var(--hh-green-dark)',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: '900',
                      fontFamily: 'Space Grotesk',
                      cursor: isDownloading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(249, 211, 18, 0.3)',
                      transition: 'transform 0.1s, box-shadow 0.1s'
                    }}
                  >
                    <Download size={16} strokeWidth={2.5} />
                    <span>{isDownloading ? 'GENERATING HD PNG...' : 'DOWNLOAD PASS (HD PNG)'}</span>
                  </button>

                  <button 
                    onClick={handleShare}
                    style={{
                      padding: '13px 22px',
                      borderRadius: '12px',
                      backgroundColor: 'transparent',
                      color: 'var(--hh-pink)',
                      border: '2px solid var(--hh-pink)',
                      fontSize: '13px',
                      fontWeight: '900',
                      fontFamily: 'Space Grotesk',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Share2 size={16} strokeWidth={2.5} />
                    <span>SHARE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 3. Aesthetic Enhanced Global Footer */}
      <footer className="app-footer">
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '16px' 
          }}
        >
          {/* Brand & Event Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <img 
              src="/hacker-house-logo.png" 
              alt="Hacker House Goa" 
              style={{ height: '32px', objectFit: 'contain' }} 
            />
            <div style={{ width: '1.5px', height: '20px', backgroundColor: 'rgba(250, 247, 238, 0.2)' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', color: 'var(--hh-yellow)' }}>
              BUILDER FIELD PASS
            </span>
            <div style={{ width: '1.5px', height: '20px', backgroundColor: 'rgba(250, 247, 238, 0.2)' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--hh-cream)', opacity: 0.85 }}>
              28 – 31 OCT 2026 • GOA, INDIA
            </span>
          </div>

          {/* Hashtags and Community Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: '800', color: 'var(--hh-pink)', letterSpacing: '0.05em' }}>
              🌴 #FRAMEINGOA
            </span>
            <span style={{ color: 'rgba(250, 247, 238, 0.3)' }}>•</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: '800', color: 'var(--hh-pink)', letterSpacing: '0.05em' }}>
              #HACKERHOUSEGOA
            </span>
            <span style={{ color: 'rgba(250, 247, 238, 0.3)' }}>•</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: '600', color: 'var(--hh-cream)', opacity: 0.65 }}>
              Hacker House Goa 2026 Identity System
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
