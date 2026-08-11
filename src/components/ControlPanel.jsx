import React, { useRef, useState } from 'react';
import { Upload, RotateCw, Sparkles, User, ShieldAlert, Award, Globe, X, ScanFace } from 'lucide-react';
import { detectFaceAndCalculateFraming } from '../utils/faceDetector';

export default function ControlPanel({
  name,
  setName,
  role,
  setRole,
  builderId,
  setBuilderId,
  qrUrl,
  setQrUrl,
  zoom,
  setZoom,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  avatarUrl,
  setAvatarUrl,
  errors = {},
  hasGenerated = false,
  onGenerate
}) {
  const fileInputRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Validate file type (JPG / PNG / WEBP support)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      setAvatarUrl(dataUrl);

      // Auto-detect face and frame immediately upon upload
      runFaceAutoFraming(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const runFaceAutoFraming = async (imgSrc) => {
    const targetSrc = imgSrc || avatarUrl;
    if (!targetSrc) return;

    setIsDetecting(true);
    try {
      const framing = await detectFaceAndCalculateFraming(targetSrc, 185, 240);
      setZoom(framing.zoom);
      setOffsetX(framing.offsetX);
      setOffsetY(framing.offsetY);
    } catch (err) {
      console.warn("Auto-framing error:", err);
    } finally {
      setIsDetecting(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const removeAvatar = (e) => {
    e.stopPropagation();
    setAvatarUrl("");
    resetAvatarAdjustments();
  };

  const resetAvatarAdjustments = () => {
    setZoom(1.2);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div 
      className="glass-panel" 
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxSizing: 'border-box',
        height: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '1px solid rgba(250, 246, 240, 0.15)'
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles className="text-[var(--hh-yellow)]" size={20} />
        <h3 className="retro-serif text-lg tracking-wider m-0 text-[var(--hh-yellow)]">
          PERSONALIZER
        </h3>
      </div>

      {/* 1. Profile Picture Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label className="grotesk text-[10px] font-bold tracking-widest text-[var(--hh-white)] opacity-80 uppercase">
          Profile Photo <span style={{ color: 'var(--hh-pink)' }}>*</span>
        </label>
        
        {/* Drag & Drop or Preview Area */}
        {!avatarUrl ? (
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            style={{
              border: errors.avatar ? '2px dashed var(--hh-pink)' : '2px dashed rgba(250, 246, 240, 0.3)',
              borderRadius: '16px',
              padding: '28px 10px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'rgba(3, 32, 17, 0.3)',
              transition: 'border-color 0.2s, background-color 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Upload className="text-[var(--hh-pink)]" size={24} />
            <div>
              <p className="grotesk text-[12px] font-bold m-0 text-[var(--hh-white)]">
                Drag &amp; Drop Photo Here
              </p>
              <p className="grotesk text-[10px] m-1 text-[var(--hh-white)] opacity-60">
                Supports JPG, PNG, WEBP
              </p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg, image/png, image/webp" 
              style={{ display: 'none' }} 
            />
          </div>
        ) : (
          /* Profile Photo Preview Box (with rectangular card-ratio preview) */
          <div 
            style={{
              border: '2px solid var(--hh-green)',
              borderRadius: '16px',
              padding: '12px',
              backgroundColor: 'rgba(3, 32, 17, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Exact 1:1 mathematical replica of the ID card's 185x240 frame */}
              <div 
                style={{
                  width: '65px',
                  height: '84px',
                  borderRadius: '10px',
                  border: '2px solid var(--hh-yellow)',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#021B0F',
                  flexShrink: 0
                }}
              >
                <div 
                  style={{
                    width: '185px',
                    height: '240px',
                    transform: 'scale(0.352)',
                    transformOrigin: 'top left',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#021B0F'
                  }}
                >
                  {(() => {
                    const requiredExtraY = Math.abs(offsetY) + 12;
                    const requiredExtraX = Math.abs(offsetX) + 12;
                    const minZoomY = 1 + (requiredExtraY * 2) / 240;
                    const minZoomX = 1 + (requiredExtraX * 2) / 185;
                    const effectiveZoom = Math.max(zoom || 1.15, minZoomY, minZoomX, 1.1);

                    return (
                      <img 
                        src={avatarUrl} 
                        alt="Preview" 
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
                  })()}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span className="grotesk text-[11px] font-bold text-white block">PHOTO UPLOADED</span>
                <span 
                  onClick={triggerFileSelect} 
                  style={{ 
                    fontSize: '11px', 
                    color: 'var(--hh-yellow)', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    fontWeight: 'bold' 
                  }}
                >
                  Replace Photo
                </span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/jpeg, image/png, image/webp" 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>
            <button 
              onClick={removeAvatar}
              style={{
                background: 'rgba(255, 59, 154, 0.15)',
                border: '1px solid var(--hh-pink)',
                color: 'var(--hh-pink)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Remove photo"
            >
              <X size={15} />
            </button>
          </div>
        )}
        
        {/* Inline Error Message */}
        {errors.avatar && (
          <span className="grotesk text-[10px] font-bold text-[var(--hh-pink)] mt-1">
            ⚠️ {errors.avatar}
          </span>
        )}

        {/* 2. Photo Framing Adjustments Sliders */}
        <div 
          style={{ 
            marginTop: '6px', 
            padding: '16px', 
            backgroundColor: 'rgba(3, 32, 17, 0.4)', 
            borderRadius: '14px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            border: '1px solid rgba(250, 247, 238, 0.08)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="grotesk text-[12px] font-extrabold text-[var(--hh-yellow)] uppercase tracking-wider">
              Photo Framing Controls
            </span>
            <button 
              onClick={resetAvatarAdjustments}
              disabled={!avatarUrl}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--hh-pink)',
                fontSize: '11.5px',
                fontWeight: '800',
                cursor: avatarUrl ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 59, 154, 0.15)',
                opacity: avatarUrl ? 1 : 0.4
              }}
            >
              Reset
            </button>
          </div>

          {/* Zoom slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', fontFamily: 'Space Grotesk' }}>
              <span style={{ letterSpacing: '0.03em' }}>ZOOM</span>
              <span style={{ color: 'var(--hh-yellow)', fontWeight: '900' }}>{zoom.toFixed(2)}x</span>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="4.0" 
              step="0.05" 
              value={zoom} 
              disabled={!avatarUrl}
              onChange={(e) => setZoom(parseFloat(e.target.value))} 
              style={{ opacity: avatarUrl ? 1 : 0.4 }}
            />
          </div>

          {/* Offset X slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', fontFamily: 'Space Grotesk' }}>
              <span style={{ letterSpacing: '0.03em' }}>PAN HORIZONTAL (LEFT / RIGHT)</span>
              <span style={{ color: 'var(--hh-yellow)', fontWeight: '900' }}>{offsetX}px</span>
            </div>
            <input 
              type="range" 
              min="-250" 
              max="250" 
              step="1" 
              value={offsetX} 
              disabled={!avatarUrl}
              onChange={(e) => setOffsetX(parseInt(e.target.value))} 
              style={{ opacity: avatarUrl ? 1 : 0.4 }}
            />
          </div>

          {/* Offset Y slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', fontFamily: 'Space Grotesk' }}>
              <span style={{ letterSpacing: '0.03em' }}>PAN VERTICAL (UP / DOWN)</span>
              <span style={{ color: 'var(--hh-yellow)', fontWeight: '900' }}>{offsetY}px</span>
            </div>
            <input 
              type="range" 
              min="-250" 
              max="250" 
              step="1" 
              value={offsetY} 
              disabled={!avatarUrl}
              onChange={(e) => setOffsetY(parseInt(e.target.value))} 
              style={{ opacity: avatarUrl ? 1 : 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* 3. Text inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Full Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label className="grotesk text-[10px] font-bold tracking-widest text-[var(--hh-white)] opacity-80 uppercase flex items-center gap-1">
            <User size={11} className="text-[var(--hh-yellow)]" />
            <span>Full Name <span style={{ color: 'var(--hh-pink)' }}>*</span></span>
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="ex: Rohit Kumar"
            maxLength={18}
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(3, 32, 17, 0.5)',
              border: errors.name ? '1.5px solid var(--hh-pink)' : '1.5px solid rgba(250, 246, 240, 0.15)',
              borderRadius: '12px',
              color: 'var(--hh-white)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Space Grotesk', sans-serif",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.name && (
            <span className="grotesk text-[9.5px] font-bold text-[var(--hh-pink)]">
              ⚠️ {errors.name}
            </span>
          )}
        </div>

        {/* Builder Class */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label className="grotesk text-[10px] font-bold tracking-widest text-[var(--hh-white)] opacity-80 uppercase flex items-center gap-1">
            <Award size={11} className="text-[var(--hh-yellow)]" />
            <span>Builder Class <span style={{ color: 'var(--hh-pink)' }}>*</span></span>
          </label>
          <input 
            type="text" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            placeholder="ex: Full Stack Developer"
            maxLength={26}
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(3, 32, 17, 0.5)',
              border: errors.role ? '1.5px solid var(--hh-pink)' : '1.5px solid rgba(250, 246, 240, 0.15)',
              borderRadius: '12px',
              color: 'var(--hh-white)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Space Grotesk', sans-serif",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.role && (
            <span className="grotesk text-[9.5px] font-bold text-[var(--hh-pink)]">
              ⚠️ {errors.role}
            </span>
          )}
        </div>

        {/* Builder ID (Auto-generated & Editable) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="grotesk text-[10px] font-bold tracking-widest text-[var(--hh-white)] opacity-80 uppercase flex items-center gap-1">
              <ShieldAlert size={11} className="text-[var(--hh-yellow)]" />
              <span>Builder ID <span style={{ color: 'var(--hh-pink)' }}>*</span></span>
            </label>
            <span 
              onClick={() => {
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                setBuilderId(`HH-GOA-${randomNum}`);
              }}
              style={{
                fontSize: '12px',
                color: 'var(--hh-yellow)',
                cursor: 'pointer',
                fontWeight: '800',
                textDecoration: 'underline',
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
              title="Click to generate new random ID number"
            >
              🔄 Re-generate
            </span>
          </div>
          <input 
            type="text" 
            value={builderId} 
            onChange={(e) => setBuilderId(e.target.value)} 
            placeholder="e.g. HH-GOA-4829"
            maxLength={14}
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(3, 32, 17, 0.5)',
              border: errors.builderId ? '1.5px solid var(--hh-pink)' : '1.5px solid rgba(250, 246, 240, 0.15)',
              borderRadius: '12px',
              color: 'var(--hh-white)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Space Grotesk', sans-serif",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.builderId && (
            <span className="grotesk text-[9.5px] font-bold text-[var(--hh-pink)]">
              ⚠️ {errors.builderId}
            </span>
          )}
        </div>
      </div>

      <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(250,246,240,0.1)', margin: '4px 0' }} />

      {/* 4. Action button at the very bottom */}
      <button 
        onClick={onGenerate}
        style={{
          padding: '14px 16px',
          borderRadius: '14px',
          border: 'none',
          backgroundColor: hasGenerated ? 'var(--hh-pink)' : 'var(--hh-yellow)',
          color: hasGenerated ? 'var(--hh-white)' : 'var(--hh-green-dark)',
          fontWeight: '900',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: '2px solid var(--hh-green-dark)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.1s, background-color 0.2s'
        }}
        className="hover:scale-[1.02] active:scale-[0.98]"
      >
        {hasGenerated ? (
          <>
            <RotateCw size={18} />
            <span>REGENERATE CARD</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>GENERATE CARD</span>
          </>
        )}
      </button>
    </div>
  );
}
