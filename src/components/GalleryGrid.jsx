import { Trash2, Calendar, Download } from 'lucide-react';
import Button from './Button';

const GalleryGrid = ({ photos, onDelete, onDownload }) => {
    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">No photos yet. Go take some!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((session) => (
                <div
                    key={session.id}
                    className="group relative bg-white p-4 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-slate-100"
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
                            {session.images.slice(0, 4).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Session ${session.id} - ${idx}`}
                                    className="w-full h-24 object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-xs">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(session.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDownload(session)}
                                className="text-primary-400 hover:text-primary-600 hover:bg-primary-50 h-8 w-8"
                                title="Download photos"
                            >
                                <Download size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(session.id)}
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                                title="Delete session"
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GalleryGrid;
