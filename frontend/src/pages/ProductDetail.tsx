import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getProduct } from '../services/api';
import type { Product } from '../types';

const WHATSAPP_NUMBER = '5491112345678';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(Number(id))
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const mediaItems: Array<{ type: 'image' | 'video'; src: string }> = [];
  if (product?.videoUrl) {
    mediaItems.push({ type: 'video', src: product.videoUrl });
  }
  if (product?.images?.length) {
    product.images.forEach((url) => mediaItems.push({ type: 'image', src: url }));
  }
  if (mediaItems.length === 0) {
    mediaItems.push({ type: 'image', src: '' });
  }

  const current = mediaItems[currentMediaIndex];

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = encodeURIComponent(
      `Hola! Quiero encargar el ${product.title} ($ ${product.price.toLocaleString('es-AR')} ARS)`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const nextMedia = () => {
    if (mediaItems.length <= 1) return;
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    if (mediaItems.length <= 1) return;
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const total = mediaItems.length;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxOpen(false); return; }
      if (e.key === 'ArrowRight') setCurrentMediaIndex((prev) => (prev + 1) % total);
      if (e.key === 'ArrowLeft') setCurrentMediaIndex((prev) => (prev - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, mediaItems.length]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D8A7C8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <Link to="/#catalogo" className="flex items-center gap-2 hover:text-primary transition-colors group mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al catálogo</span>
        </Link>
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Producto no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
      <Link to="/#catalogo" className="flex items-center gap-2 hover:text-primary transition-colors group mb-8">
        <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-primary" />
        <span className="text-foreground group-hover:text-primary">Volver al catálogo</span>
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-4">
          <div className="relative bg-gradient-to-br from-[#EDD5E8] to-[#F4E8F0] rounded-3xl overflow-hidden aspect-square shadow-2xl border-2 border-[#E6D5E8]">
            {current.type === 'video' ? (
              <iframe
                src={`https://www.youtube.com/embed/${current.src}?playsinline=1&autoplay=1&mute=1&loop=1&playlist=${current.src}&controls=0&rel=0`}
                className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : (
              <ImageWithFallback
                src={current.src}
                alt={product.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
            )}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors z-20"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors z-20"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {mediaItems.map((_item: { type: string; src: string }, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMediaIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentMediaIndex ? 'bg-primary' : 'bg-card/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {mediaItems.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mediaItems.map((item: { type: string; src: string }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMediaIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === currentMediaIndex ? 'border-[#D8A7C8] opacity-100' : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-black/10 flex items-center justify-center relative">
                      <img
                        src={`https://img.youtube.com/vi/${item.src}/default.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={item.src} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}

          {lightboxOpen && current.type === 'image' && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white p-2 z-50"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={current.src}
                alt={product.title}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              {mediaItems.filter((m) => m.type === 'image').length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 z-50"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 z-50"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">{product.title}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-5xl text-black">$ {product.price.toLocaleString('es-AR')}</p>
              <span className="text-xl text-muted-foreground">ARS</span>
            </div>
          </div>

          <p className="text-lg text-foreground/70 leading-relaxed">{product.description}</p>

          <div className="bg-gradient-to-br from-[#EDD5E8]/60 to-[#F4A7C5]/30 border-2 border-[#D8A7C8]/30 rounded-2xl p-6 space-y-2 shadow-lg">
            <p className="text-foreground">
              <strong>🧶 Este producto se teje bajo demanda</strong>
            </p>
            <p className="text-foreground/70">Tiempo de entrega: 7 a 10 días hábiles</p>
            <p className="text-sm text-foreground/60">Te mantendremos al tanto del progreso por WhatsApp</p>
          </div>

          <div className="space-y-4 pt-2">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-gradient-to-r from-[#D8A7C8] to-[#F4A7C5] text-white py-5 rounded-2xl hover:scale-105 transition-transform shadow-xl text-lg font-medium"
            >
              Encargar por WhatsApp
            </button>
            <button
              onClick={() => navigate('/personalizado')}
              className="w-full bg-white border-2 border-[#D8A7C8] text-[#D8A7C8] py-5 rounded-2xl hover:bg-gradient-to-r hover:from-[#D8A7C8] hover:to-[#F4A7C5] hover:text-white transition-all shadow-lg text-lg"
            >
              Personalizar este diseño
            </button>
          </div>

          <div className="bg-white border-2 border-[#E6D5E8] rounded-2xl p-8 space-y-4 shadow-lg">
            <h3 className="text-xl text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#D8A7C8] fill-[#D8A7C8]" />
              Características
            </h3>
            <ul className="space-y-3 text-foreground/70">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D8A7C8] rounded-full"></span>
                Tejido 100% a mano con dedicación
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#F4A7C5] rounded-full"></span>
                Hilo de algodón hipoalergénico
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D8C4E8] rounded-full"></span>
                Relleno de fibra premium suave
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#EAB8D0] rounded-full"></span>
                Detalles bordados a mano
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E6C4E0] rounded-full"></span>
                Pieza única y original
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
