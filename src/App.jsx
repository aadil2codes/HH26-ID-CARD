import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Star, Download, Share2, Clipboard, Sparkles } from 'lucide-react';
import CardFront from './components/CardFront';
import ControlPanel from './components/ControlPanel';

// Official X (Twitter) Icon Component
const XIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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

  const getShareText = () => {
    const appUrl = "https://hh-26-id-card-gen.vercel.app/";
    return `🌴 Hacker House Goa 2026, here I come!\n\n🪪 Just created my own Builder Card for the Goa journey.\n👤 ${genName || 'Builder'} • #${genBuilderId || 'HH-GOA-2026'}\n\nExcited to meet fellow builders, learn, create, and build something meaningful together in Goa! 🚀\n\nCreate your own Builder Card:\n${appUrl}\n\n#FrameInGoa #HHGoa2026 #HackerHouse`;
  };

  // Direct 1-Click Platform Sharer
  const shareToPlatform = async (platform) => {
    const appUrl = "https://hh-26-id-card-gen.vercel.app/";
    const textToShare = getShareText();

    if (platform === 'x') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showShareNotification("Opening X to post your pass!");
    } else if (platform === 'whatsapp') {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showShareNotification("Opening WhatsApp!");
    } else if (platform === 'telegram') {
      const url = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(textToShare)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showShareNotification("Opening Telegram!");
    } else if (platform === 'linkedin') {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showShareNotification("Opening LinkedIn!");
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(textToShare);
        showShareNotification("Post template & link copied to clipboard!");
      } catch (err) {
        showShareNotification("Unable to copy.");
      }
    }
    setIsShareModalOpen(false);
  };

  // Ultra-Fast Native Share & Modal Trigger
  const handleShare = async () => {
    const appUrl = "https://hh-26-id-card-gen.vercel.app/";
    const textToShare = getShareText();
    
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
      }
    }

    // Open options modal if native share not invoked
    setIsShareModalOpen(true);
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

                {/* Action Buttons: Single Row (Download, Post on X, Share/More) */}
                <div className="action-buttons-group" style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '430px', marginTop: '10px' }}>
                  {/* 1. Download Button */}
                  <button 
                    onClick={downloadCard}
                    disabled={isDownloading}
                    style={{
                      flex: '1.2',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--hh-yellow)',
                      color: 'var(--hh-green-dark)',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: '900',
                      fontFamily: 'Space Grotesk',
                      cursor: isDownloading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      boxShadow: '0 4px 14px rgba(249, 211, 18, 0.3)',
                      whiteSpace: 'nowrap'
                    }}
                    title="Download HD Print-Ready Pass"
                  >
                    <Download size={15} strokeWidth={2.5} />
                    <span>{isDownloading ? 'SAVING...' : 'DOWNLOAD'}</span>
                  </button>

                  {/* 2. Direct Post on X Button */}
                  <button 
                    onClick={() => shareToPlatform('x')}
                    style={{
                      flex: '1.1',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      fontSize: '12.5px',
                      fontWeight: '900',
                      fontFamily: 'Space Grotesk',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                      whiteSpace: 'nowrap'
                    }}
                    title="Post directly to X (Twitter)"
                  >
                    <XIcon size={14} color="#FFFFFF" />
                    <span>POST ON 𝕏</span>
                  </button>

                  {/* 3. Share Button (WhatsApp, Telegram, etc.) */}
                  <button 
                    onClick={handleShare}
                    style={{
                      flex: '0.9',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 59, 154, 0.1)',
                      color: 'var(--hh-pink)',
                      border: '2px solid var(--hh-pink)',
                      fontSize: '12.5px',
                      fontWeight: '900',
                      fontFamily: 'Space Grotesk',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap'
                    }}
                    title="Share to WhatsApp, Telegram, LinkedIn, or Copy Link"
                  >
                    <Share2 size={15} strokeWidth={2.5} />
                    <span>SHARE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Share Options Popup Modal */}
      {isShareModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
          onClick={() => setIsShareModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#032011',
              border: '2px solid rgba(249, 211, 18, 0.4)',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: '800', color: 'var(--hh-yellow)' }}>
                🌴 Share Your Builder Pass
              </span>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {/* X (Twitter) */}
              <button 
                onClick={() => shareToPlatform('x')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <XIcon size={15} color="#fff" />
                <span>Post on 𝕏</span>
              </button>

              {/* WhatsApp */}
              <button 
                onClick={() => shareToPlatform('whatsapp')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  color: '#25D366',
                  fontFamily: 'Space Grotesk',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '16px' }}>💬</span>
                <span>WhatsApp</span>
              </button>

              {/* Telegram */}
              <button 
                onClick={() => shareToPlatform('telegram')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 136, 204, 0.15)',
                  border: '1px solid rgba(0, 136, 204, 0.35)',
                  color: '#0088CC',
                  fontFamily: 'Space Grotesk',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '16px' }}>✈️</span>
                <span>Telegram</span>
              </button>

              {/* LinkedIn */}
              <button 
                onClick={() => shareToPlatform('linkedin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(10, 102, 194, 0.15)',
                  border: '1px solid rgba(10, 102, 194, 0.35)',
                  color: '#0A66C2',
                  fontFamily: 'Space Grotesk',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '16px' }}>💼</span>
                <span>LinkedIn</span>
              </button>
            </div>

            {/* Copy Post Button */}
            <button 
              onClick={() => shareToPlatform('copy')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px',
                borderRadius: '12px',
                backgroundColor: 'var(--hh-yellow)',
                color: 'var(--hh-green-dark)',
                border: 'none',
                fontFamily: 'Space Grotesk',
                fontWeight: '900',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <Clipboard size={16} />
              <span>COPY POST &amp; LINK</span>
            </button>
          </div>
        </div>
      )}

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
