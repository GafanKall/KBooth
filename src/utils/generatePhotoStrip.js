/**
 * Draws an image on a canvas while maintaining the target aspect ratio by cropping it from the center.
 */
const drawCroppedImage = (ctx, img, x, y, width, height) => {
    const targetAspect = width / height;
    const imgAspect = img.width / img.height;

    let sourceX, sourceY, sourceWidth, sourceHeight;

    if (imgAspect > targetAspect) {
        // Image is wider than target
        sourceHeight = img.height;
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
    } else {
        // Image is taller than target
        sourceWidth = img.width;
        sourceHeight = img.width / targetAspect;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
    }

    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

export const generatePhotoStrip = async (photos, frameColor, filterStyle, layout = 'strip') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const width = 800;
    const padding = 40;
    const spacing = 30;
    const footerHeight = 100;

    let height;
    let photoWidth;
    let photoHeight;

    if (layout === 'strip' || layout === 'grid') { // Handle both naming conventions
        // 2x2 Grid
        photoWidth = (width - (padding * 2) - spacing) / 2;
        photoHeight = (photoWidth * 3) / 4;
        height = (padding * 2) + (photoHeight * 2) + spacing + footerHeight;
    } else {
        // Single
        photoWidth = width - (padding * 2);
        photoHeight = (photoWidth * 3) / 4;
        height = (padding * 2) + photoHeight + footerHeight;
    }

    canvas.width = width;
    canvas.height = height;

    // Draw background (frame)
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, width, height);

    // Draw photos
    for (let i = 0; i < photos.length; i++) {
        if ((layout === 'single' || layout === 'selfie') && i > 0) break;
        if (i >= 4) break;

        const img = new Image();
        img.src = photos[i];
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        let x, y;
        if (layout === 'strip' || layout === 'grid') {
            const col = i % 2;
            const row = Math.floor(i / 2);
            x = padding + (col * (photoWidth + spacing));
            y = padding + (row * (photoHeight + spacing));
        } else {
            x = padding;
            y = padding;
        }

        // Draw photo container background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(x, y, photoWidth, photoHeight);

        // Apply filter
        if (filterStyle) {
            ctx.filter = filterStyle;
        }

        // Use helper to avoid "gepeng" (stretching)
        drawCroppedImage(ctx, img, x, y, photoWidth, photoHeight);

        ctx.filter = 'none';
    }

    // Draw Footer Text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 32px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('KBooth © 2026', width / 2, height - 35);

    return canvas.toDataURL('image/jpeg', 0.9);
};
