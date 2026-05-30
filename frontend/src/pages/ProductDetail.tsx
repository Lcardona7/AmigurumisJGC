import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getProduct } from '../services/api';
import type { Product } from '../types';

const WHATSAPP_NUMBER = '5491112345678';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(Number(id))
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = encodeURIComponent(
      `Hola! Quiero encargar el ${product.title} ($ ${product.price.toLocaleString('es-AR')} ARS)`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const nextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

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
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-primary transition-colors group mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">Producto no encontrado</p>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [''];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-primary transition-colors group mb-8">
        <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-primary" />
        <span className="text-foreground group-hover:text-primary">Volver al catálogo</span>
      </button>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="relative bg-gradient-to-br from-[#EDD5E8] to-[#F4E8F0] rounded-3xl overflow-hidden aspect-square shadow-2xl border-2 border-[#E6D5E8]">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 rounded-full hover:bg-card transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_: string, idx: number) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-primary' : 'bg-card/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <div className="inline-block bg-gradient-to-r from-[#EDD5E8] to-[#E6D5E8] px-4 py-1 rounded-full mb-4">
              <span className="text-sm text-[#D8A7C8]">Tejido a mano</span>
            </div>
            <h1 className="text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">{product.title}</h1>
            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-5xl text-[#D8A7C8]">$ {product.price.toLocaleString('es-AR')}</p>
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
