import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';
import { toast } from 'sonner';
import GalleryGrid from '../components/GalleryGrid';
import Button from '../components/Button';

const Gallery = ({ onBack }) => {
    const { getPhotos, deletePhoto } = useStorage();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const data = await getPhotos();
            setSessions(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            toast.error('Failed to load gallery.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this session?')) {
            try {
                await deletePhoto(id);
                toast.success('Session deleted!');
                fetchPhotos();
            } catch (err) {
                toast.error('Failed to delete session.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Home
                    </Button>
                    <h2 className="text-4xl font-black text-slate-900 italic tracking-tight uppercase">
                        Your <span className="text-primary-500">Gallery</span>
                    </h2>
                    <div className="w-24" />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
                    </div>
                ) : (
                    <GalleryGrid photos={sessions} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default Gallery;
