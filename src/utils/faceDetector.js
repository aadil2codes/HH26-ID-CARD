/**
 * Smart Face Detection & Auto-Framing Utility
 * Computes optimal zoom, offsetX, and offsetY to center a portrait in a target aspect ratio frame (185px x 240px).
 */

export async function detectFaceAndCalculateFraming(imageSrc, frameWidth = 185, frameHeight = 240) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      const naturalWidth = img.naturalWidth || img.width;
      const naturalHeight = img.naturalHeight || img.height;

      let faceCenter = null;
      let faceSize = null;

      // 1. Try Native Browser FaceDetector (High accuracy GPU/OS face detector in Chromium)
      if ('FaceDetector' in window) {
        try {
          const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
          const faces = await detector.detect(img);
          if (faces && faces.length > 0) {
            const bbox = faces[0].boundingBox;
            faceCenter = {
              x: bbox.x + bbox.width / 2,
              y: bbox.y + bbox.height / 2
            };
            faceSize = {
              width: bbox.width,
              height: bbox.height
            };
          }
        } catch (err) {
          console.warn("Native FaceDetector fallback triggered:", err);
        }
      }

      // 2. Fallback: Canvas Saliency & Skin-Tone Centroid Analysis
      if (!faceCenter) {
        faceCenter = analyzeImageFaceCentroid(img, naturalWidth, naturalHeight);
      }

      // 3. Compute Framing Offsets & Zoom
      // Target aspect ratio
      const targetAspect = frameWidth / frameHeight; // ~0.77
      const imgAspect = naturalWidth / naturalHeight;

      let baseScale = 1.0;
      let displayWidth, displayHeight;

      // objectFit: cover simulation
      if (imgAspect > targetAspect) {
        // Image is wider than frame -> height fits frame
        baseScale = frameHeight / naturalHeight;
        displayHeight = frameHeight;
        displayWidth = naturalWidth * baseScale;
      } else {
        // Image is taller than frame -> width fits frame
        baseScale = frameWidth / naturalWidth;
        displayWidth = frameWidth;
        displayHeight = naturalHeight * baseScale;
      }

      // Face position in rendered cover space relative to container center
      const faceRenderedX = faceCenter.x * baseScale;
      const faceRenderedY = faceCenter.y * baseScale;

      // Container center
      const containerCenterX = frameWidth / 2;
      // In ID cards, faces should ideally sit around 38-42% from top (upper-middle)
      const idealFaceY = frameHeight * 0.40;

      // Calculate translation offsets needed to put face at ideal center
      // Note: In CSS transform: translate(offsetX px, offsetY px), moving image left means negative offsetX
      let calculatedOffsetX = (containerCenterX - faceRenderedX);
      let calculatedOffsetY = (idealFaceY - faceRenderedY);

      // Desired zoom level for crisp portrait framing (guaranteed >= 1.05 so no blank gaps ever appear)
      let recommendedZoom = 1.15;
      if (faceSize && faceSize.width > 0) {
        const faceRenderedW = faceSize.width * baseScale;
        const targetFaceW = frameWidth * 0.45;
        recommendedZoom = Math.min(Math.max(targetFaceW / faceRenderedW, 1.05), 2.5);
      }

      // Clamp offsets so photo never leaves the frame edges
      const maxAllowedOffsetX = Math.max((displayWidth * recommendedZoom - frameWidth) / 2, 0);
      const maxAllowedOffsetY = Math.max((displayHeight * recommendedZoom - frameHeight) / 2, 0);

      const clampedX = Math.max(-maxAllowedOffsetX, Math.min(maxAllowedOffsetX, calculatedOffsetX));
      const clampedY = Math.max(-maxAllowedOffsetY, Math.min(maxAllowedOffsetY, calculatedOffsetY));

      resolve({
        zoom: parseFloat(recommendedZoom.toFixed(2)),
        offsetX: Math.round(clampedX),
        offsetY: Math.round(clampedY)
      });
    };

    img.onerror = () => {
      // Default fallback if image load fails
      resolve({ zoom: 1.2, offsetX: 0, offsetY: 0 });
    };

    img.src = imageSrc;
  });
}

/**
 * Fast Saliency + Skin-Tone Luminance Centroid Detector
 */
function analyzeImageFaceCentroid(img, width, height) {
  const canvas = document.createElement('canvas');
  const maxDimension = 160;
  const scale = Math.min(maxDimension / width, maxDimension / height, 1);
  const sw = Math.round(width * scale);
  const sh = Math.round(height * scale);

  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, sw, sh);

  const imageData = ctx.getImageData(0, 0, sw, sh);
  const data = imageData.data;

  let totalWeight = 0;
  let weightedX = 0;
  let weightedY = 0;

  // Search upper 70% of image for face characteristics (skin tone, warm hues, contrast)
  const searchHeight = Math.round(sh * 0.75);

  for (let y = 0; y < searchHeight; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Human skin-tone color space approximation in RGB
      const isSkinTone = (
        r > 60 && g > 40 && b > 20 &&
        r > g && r > b &&
        (r - g) > 10 &&
        (r - b) > 10 &&
        Math.abs(r - g) < 120
      );

      if (isSkinTone) {
        // Bias towards upper-center
        const centerBias = 1 - Math.abs(x - sw / 2) / (sw / 2);
        const verticalWeight = (y < sh * 0.5) ? 1.5 : 1.0;
        const weight = centerBias * verticalWeight;

        weightedX += x * weight;
        weightedY += y * weight;
        totalWeight += weight;
      }
    }
  }

  if (totalWeight > 10) {
    return {
      x: (weightedX / totalWeight) / scale,
      y: (weightedY / totalWeight) / scale
    };
  }

  // Fallback: Upper-third center of image
  return {
    x: width / 2,
    y: height * 0.38
  };
}
