import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const productData: { [key: string]: any } = {
  '1': {
    name: 'Osito Crochet',
    price: 8500,
    description: 'Adorable osito tejido a mano con hilo de algodón hipoalergénico. Ideal para decoración o como regalo especial. Cada pieza es única y hecha con dedicación.',
    images: [
      'https://images.unsplash.com/photo-1577635515158-dcce4789c8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1577635433820-d29c91a4a76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1627693685101-687bf0eb1222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
  '2': {
    name: 'Conejito Pastel',
    price: 7500,
    description: 'Conejito en tonos pasteles tejido con amor. Hecho con materiales suaves y seguros. Perfecto para niños y amantes de los amigurumis.',
    images: [
      'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      'https://images.unsplash.com/photo-1677892917297-2de976c9ea11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
  '3': {
    name: 'Amigurumi Multicolor',
    price: 9000,
    description: 'Diseño único con combinación de colores vibrantes. Tejido con técnica crochet tradicional usando hilo de algodón de primera calidad.',
    images: [
      'https://images.unsplash.com/photo-1677892917314-49ae2afe6345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
  '4': {
    name: 'Rana Adorable',
    price: 6500,
    description: 'Pequeña rana tejida a mano con detalles encantadores. Material hipoalergénico y resistente. Ideal como llavero o decoración.',
    images: [
      'https://images.unsplash.com/photo-1649680954447-cb65a40755a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
  '5': {
    name: 'Dinosaurio Mini',
    price: 8000,
    description: 'Dinosaurio tejido con colores suaves. Hecho a mano con hilo de algodón premium. Regalo perfecto para los más pequeños.',
    images: [
      'https://images.unsplash.com/photo-1661196839700-92217353efa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
  '6': {
    name: 'Búho Colgante',
    price: 7000,
    description: 'Búho decorativo tejido a mano. Puede usarse como llavero o colgante. Materiales de alta calidad y colores duraderos.',
    images: [
      'https://images.unsplash.com/photo-1656872324386-265fef5726be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    ],
  },
};

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = productData[id || '1'];

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hola! Quiero encargar el ${product.name} ($ ${product.price.toLocaleString('es-AR')} ARS)`
    );
    window.open(`https://wa.me/5491112345678?text=${message}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-primary transition-colors group">
            <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-primary" />
            <span className="text-foreground group-hover:text-primary">Volver al catálogo</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative bg-gradient-to-br from-[#EDD5E8] to-[#F4E8F0] rounded-3xl overflow-hidden aspect-square shadow-2xl border-2 border-[#E6D5E8]">
          <ImageWithFallback
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.images.length > 1 && (
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
                {product.images.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-card/60'
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
              <h1 className="text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">{product.name}</h1>
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
    </div>
  );
}
