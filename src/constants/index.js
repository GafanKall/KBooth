export const FILTERS = [
    { id: 'none', name: 'Original', style: {} },
    { id: 'grayscale', name: 'B&W', style: { filter: 'grayscale(100%)' } },
    { id: 'sepia', name: 'Retro', style: { filter: 'sepia(100%)' } },
    { id: 'brightness', name: 'Vibrant', style: { filter: 'brightness(130%)' } },
    { id: 'contrast', name: 'Deep', style: { filter: 'contrast(150%)' } },
    { id: 'warm', name: 'Warm', style: { filter: 'sepia(30%) saturate(150%)' } },
];

export const FRAMES = [
    { id: 'classic-white', name: 'Classic White', class: 'bg-white' },
    { id: 'modern-black', name: 'Modern Black', class: 'bg-slate-900' },
    { id: 'soft-blue', name: 'Soft Blue', class: 'bg-blue-100' },
    { id: 'sweet-pink', name: 'Sweet Pink', class: 'bg-pink-100' },
    { id: 'retro-cream', name: 'Retro Cream', class: 'bg-orange-50' },
    { id: 'vibrant-purple', name: 'Vibrant Purple', class: 'bg-purple-100' },
];
