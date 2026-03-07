export const FILTERS = [
    { id: 'none', name: 'Original', style: {}, canvas: null },
    { id: 'grayscale', name: 'B&W', style: { filter: 'grayscale(100%)' }, canvas: 'grayscale(100%)' },
    { id: 'sepia', name: 'Retro', style: { filter: 'sepia(100%)' }, canvas: 'sepia(100%)' },
    { id: 'brightness', name: 'Vibrant', style: { filter: 'brightness(130%)' }, canvas: 'brightness(130%)' },
    { id: 'contrast', name: 'Deep', style: { filter: 'contrast(150%)' }, canvas: 'contrast(150%)' },
    { id: 'warm', name: 'Warm', style: { filter: 'sepia(30%) saturate(150%)' }, canvas: 'sepia(30%) saturate(150%)' },
];

export const FRAMES = [
    { id: 'classic-white', name: 'Classic White', class: 'bg-white', hex: '#ffffff' },
    { id: 'modern-black', name: 'Modern Black', class: 'bg-slate-900', hex: '#0f172a' },
    { id: 'soft-blue', name: 'Soft Blue', class: 'bg-blue-100', hex: '#dbeafe' },
    { id: 'sweet-pink', name: 'Sweet Pink', class: 'bg-pink-100', hex: '#fce7f3' },
    { id: 'retro-cream', name: 'Retro Cream', class: 'bg-orange-50', hex: '#fff7ed' },
    { id: 'vibrant-purple', name: 'Vibrant Purple', class: 'bg-purple-100', hex: '#f3e8ff' },
];
