import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Mail } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getProducts } from '../services/api';
import type { Product } from '../types';

const borderColors = ['hover:border-[#D8A7C8]', 'hover:border-[#F4A7C5]', 'hover:border-[#D8C4E8]', 'hover:border-[#EAB8D0]'];
const bgGradients = ['from-[#EDD5E8] to-[#F4E8F0]', 'from-[#F4E8F0] to-[#E6D5E8]', 'from-[#E6D5E8] to-[#D8C4E8]', 'from-[#D8C4E8] to-[#EDD5E8]'];

const WHATSAPP_NUMBER = '5491112345678';

export function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-20">
      <section className="relative bg-gradient-to-br from-[#EDD5E8]/70 to-[#F4A7C5]/40 border-2 border-[#D8A7C8]/30 rounded-3xl px-6 lg:px-12 py-12 lg:py-16 text-center shadow-lg">
        <div className="relative z-10">
          <ImageWithFallback
            src="/logo.png"
            alt="Amigurumis JGC"
            className="max-w-sm lg:max-w-lg mx-auto mb-6"
          />
          <p className="text-lg lg:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Cada pieza es única y especial, creada con hilo de algodón hipoalergénico y mucho cariño para vos
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.open('https://www.instagram.com/amigurumis.jgc/', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white rounded-2xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Seguinos en Instagram
            </button>
            <Link
              to="/personalizado"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-[#D8A7C8] text-[#D8A7C8] rounded-2xl hover:bg-gradient-to-r hover:from-[#D8A7C8] hover:to-[#E6C4E0] hover:text-white transition-all shadow-lg"
            >
              Diseño Personalizado
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-block bg-white border border-[#E6D5E8] px-6 py-2 rounded-full shadow-sm">
            <span className="text-sm text-[#D8A7C8]">Explora nuestra colección</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-foreground tracking-tight">Trabajos Destacados</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Algunos de nuestros amigurumis tejidos a mano con mucho cariño
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#D8A7C8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground py-20 text-lg">No hay productos disponibles.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {products.slice(0, 5).map((product, index) => (
                <Link to={`/producto/${product.id}`} key={product.id} className={`group block bg-white rounded-3xl overflow-hidden border-2 border-border shadow-lg hover:shadow-2xl transition-all hover:scale-105 ${borderColors[index % borderColors.length]}`}>
                  <div className={`aspect-square bg-gradient-to-br ${bgGradients[index % bgGradients.length]} overflow-hidden`}>
                    <ImageWithFallback
                      src={product.images?.[0] || ''}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D8A7C8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg text-center text-foreground">{product.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white rounded-2xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                Ver catálogo completo
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="relative bg-white border-2 border-[#E6D5E8] rounded-3xl p-12 lg:p-20 overflow-hidden shadow-2xl">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#D8A7C8]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#F4A7C5]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#EDD5E8] to-[#F4E8F0] rounded-full shadow-lg">
            <Heart className="w-10 h-10 text-[#D8A7C8] fill-[#D8A7C8] animate-pulse" />
          </div>
          <h2 className="text-4xl lg:text-5xl text-foreground tracking-tight">
            ¿Tenés una idea especial?
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Creamos el amigurumi de tus sueños. Puede ser un personaje de una serie, tu mascota o cualquier cosa que imagines.
            <span className="text-[#D8A7C8]"> Cada pieza es única y hecha especialmente para vos.</span>
          </p>
          <Link
            to="/personalizado"
            className="inline-block px-12 py-5 bg-gradient-to-r from-[#D8A7C8] to-[#F4A7C5] text-white rounded-2xl hover:scale-105 transition-transform shadow-xl text-lg"
          >
            Hacer un Pedido Personalizado
          </Link>
        </div>
      </section>

      <section id="contacto" className="bg-white border-2 border-border rounded-3xl p-12 lg:p-20 shadow-xl">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div>
            <div className="inline-block bg-[#D8A7C8] px-6 py-2 rounded-full mb-4 shadow-sm">
              <span className="text-sm text-white">Estamos para ayudarte</span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-foreground tracking-tight mb-4">Hablemos</h2>
            <p className="text-lg text-foreground/70">
              Elegí tu canal favorito para contactarnos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#EDD5E8]/60 to-[#F4E8F0]/60 hover:from-[#D8A7C8]/30 hover:to-[#F4A7C5]/30 transition-all hover:scale-105 shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#D8A7C8]"
            >
              <div className="w-16 h-16 bg-[#D8A7C8]/30 group-hover:bg-gradient-to-br group-hover:from-[#D8A7C8] group-hover:to-[#E6C4E0] rounded-2xl flex items-center justify-center transition-all">
                <MessageCircle className="w-8 h-8 text-[#D8A7C8] group-hover:text-white transition-colors" />
              </div>
              <span className="text-foreground text-lg">WhatsApp</span>
              <span className="text-sm text-muted-foreground">Respuesta inmediata</span>
            </a>
            <a
              href="https://www.instagram.com/amigurumis.jgc/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#E6D5E8]/60 to-[#D8C4E8]/60 hover:from-[#F4A7C5]/30 hover:to-[#EAB8D0]/30 transition-all hover:scale-105 shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#F4A7C5]"
            >
              <div className="w-16 h-16 bg-[#F4A7C5]/30 group-hover:bg-gradient-to-br group-hover:from-[#F4A7C5] group-hover:to-[#EAB8D0] rounded-2xl flex items-center justify-center transition-all">
                <svg className="w-8 h-8 text-[#F4A7C5] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <span className="text-foreground text-lg">Instagram</span>
              <span className="text-sm text-muted-foreground">Ver nuestros trabajos</span>
            </a>
            <a
              href="mailto:hola@amigurumis.com"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#D8C4E8]/60 to-[#E6C4E0]/60 hover:from-[#D8C4E8]/30 hover:to-[#E6C4E0]/30 transition-all hover:scale-105 shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#D8C4E8]"
            >
              <div className="w-16 h-16 bg-[#D8C4E8]/30 group-hover:bg-gradient-to-br group-hover:from-[#D8C4E8] group-hover:to-[#E6C4E0] rounded-2xl flex items-center justify-center transition-all">
                <Mail className="w-8 h-8 text-[#D8C4E8] group-hover:text-white transition-colors" />
              </div>
              <span className="text-foreground text-lg">Email</span>
              <span className="text-sm text-muted-foreground">Consultas formales</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
