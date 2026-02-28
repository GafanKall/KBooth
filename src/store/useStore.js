import { create } from 'zustand';

export const useStore = create((set) => ({
    capturedPhotos: [],
    selectedFrame: 'classic-white',
    selectedFilter: 'none',
    layout: 'strip', // 'strip' (4 photos) or 'single'
    isCapturing: false,

    setCapturedPhotos: (photos) => set({ capturedPhotos: photos }),

    // Simplified addPhoto to avoid premature slicing
    addPhoto: (photo) => set((state) => ({
        capturedPhotos: [...state.capturedPhotos, photo]
    })),

    clearPhotos: () => set({ capturedPhotos: [] }),

    setSelectedFrame: (frame) => set({ selectedFrame: frame }),
    setSelectedFilter: (filter) => set({ selectedFilter: filter }),
    setLayout: (layout) => set({ layout }),
    setIsCapturing: (isCapturing) => set({ isCapturing }),
}));
