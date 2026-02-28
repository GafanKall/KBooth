export const generatePhotoStrip = async (photos, frameColor, filterStyle) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const width = 800;
    const padding = 40;
    const spacing = 30;
    const photoWidth = width - (padding * 2);
    const photoHeight = (photoWidth * 3) / 4;
    const footerHeight = 100;

    const height = (padding * 2) + (photoHeight * 4) + (spacing * 3) + footerHeight;

    canvas.width = width;
    canvas.height = height;

    // Draw background (frame)
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, width, height);

    // Draw photos
    for (let i = 0; i < photos.length; i++) {
        const img = new Image();
        img.src = photos[i];
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const y = padding + (i * (photoHeight + spacing));

        // Draw photo container background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(padding, y, photoWidth, photoHeight);

        // Apply filter logic
        if (filterStyle) {
            ctx.filter = filterStyle;
        }

        ctx.drawImage(img, padding, y, photoWidth, photoHeight);
        ctx.filter = 'none'; // Reset filter
    }

    // Draw Footer Text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 32px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('KBooth © 2026', width / 2, height - 40);

    return canvas.toDataURL('image/jpeg', 0.9);
};
