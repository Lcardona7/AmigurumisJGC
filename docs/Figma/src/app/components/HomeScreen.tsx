import { Link } from 'react-router-dom';
import { Menu, Heart, MessageCircle, Instagram, Mail } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import logoImg from '../../imports/1000090939.jpg';

const categories = ['Todos', 'Animales', 'Personajes', 'Llaveros'];

const products = [
  {
    id: 1,
    name: 'Osito Crochet',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1577635515158-dcce4789c8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 2,
    name: 'Conejito Pastel',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 3,
    name: 'Amigurumi Multicolor',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1677892917314-49ae2afe6345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 4,
    name: 'Rana Adorable',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1649680954447-cb65a40755a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 5,
    name: 'Dinosaurio Mini',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1661196839700-92217353efa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 6,
    name: 'Búho Colgante',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1656872324386-265fef5726be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
];

export function HomeScreen() {
  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola! Me interesa el ${productName}`);
    window.open(`https://wa.me/5491112345678?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 group">
              <ImageWithFallback
                src={logoImg}
                alt="Amigurumis JGC Logo"
                className="w-16 h-16 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform"
              />
              <div>
                <h1 className="text-2xl text-foreground tracking-tight">Amigurumis.JGC</h1>
                <p className="text-xs text-muted-foreground">Tejidos a mano con cariño</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalogo" className="text-foreground hover:text-primary transition-colors font-medium">Catálogo</a>
              <Link to="/personalizado" className="text-foreground hover:text-primary transition-colors font-medium">Pedidos Personalizados</Link>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">Contacto</a>
            </nav>
            <button className="md:hidden p-2 hover:bg-muted rounded-xl transition-colors">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-20">
        <section className="relative bg-gradient-to-br from-[#E6D5E8] via-[#F4E8F0] to-[#EDD5E8] rounded-3xl p-12 lg:p-24 text-center overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#D8A7C8]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#F4A7C5]/30 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm">
              <Heart className="w-4 h-4 text-[#D8A7C8] fill-[#D8A7C8]" />
              <span className="text-sm text-foreground">Hechos con amor y dedicación</span>
            </div>
            <h2 className="text-4xl lg:text-6xl text-foreground mb-6 tracking-tight">
              Amigurumis únicos<br />
              <span className="text-[#D8A7C8]">tejidos a mano</span>
            </h2>
            <p className="text-lg lg:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Cada pieza es única y especial, creada con hilo de algodón hipoalergénico y mucho cariño para vos
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/5491112345678', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white rounded-2xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contactanos por WhatsApp
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

        <section id="catalogo" className="space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-block bg-gradient-to-r from-[#EDD5E8] to-[#E6D5E8] px-6 py-2 rounded-full mb-2">
              <span className="text-sm text-[#D8A7C8]">Explora nuestra colección</span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-foreground tracking-tight">Nuestro Catálogo</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Cada amigurumi está tejido a mano con hilo de algodón hipoalergénico y mucho cariño.
              Son perfectos como regalo o para decorar tu espacio favorito
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => {
              const colors = [
                'from-[#D8A7C8] to-[#E6C4E0]',
                'from-[#F4A7C5] to-[#EAB8D0]',
                'from-[#D8C4E8] to-[#E6D5E8]',
                'from-[#EAB8D0] to-[#F4A7C5]'
              ];
              return (
                <button
                  key={category}
                  className={`px-7 py-3 bg-gradient-to-r ${colors[index % colors.length]} text-white border-2 border-transparent rounded-full whitespace-nowrap hover:scale-105 hover:shadow-lg transition-all shadow-md`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
              const borderColors = [
                'hover:border-[#D8A7C8]',
                'hover:border-[#F4A7C5]',
                'hover:border-[#D8C4E8]',
                'hover:border-[#EAB8D0]'
              ];
              const bgGradients = [
                'from-[#EDD5E8] to-[#F4E8F0]',
                'from-[#F4E8F0] to-[#E6D5E8]',
                'from-[#E6D5E8] to-[#D8C4E8]',
                'from-[#D8C4E8] to-[#EDD5E8]'
              ];
              return (
                <div key={product.id} className={`group bg-white rounded-3xl overflow-hidden border-2 border-border shadow-lg hover:shadow-2xl transition-all hover:scale-105 ${borderColors[index % borderColors.length]}`}>
                  <Link to={`/producto/${product.id}`}>
                    <div className={`aspect-square bg-gradient-to-br ${bgGradients[index % bgGradients.length]} overflow-hidden relative`}>
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#D8A7C8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </Link>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl text-[#D8A7C8]">$ {product.price.toLocaleString('es-AR')}</p>
                        <span className="text-sm text-muted-foreground">ARS</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleWhatsAppClick(product.name)}
                      className={`w-full bg-gradient-to-r ${bgGradients[index % bgGradients.length]} text-white py-3 rounded-2xl hover:shadow-xl hover:scale-105 transition-all`}
                    >
                      Pedir por WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative bg-gradient-to-br from-[#EDD5E8] via-[#F4A7C5]/30 to-[#D8A7C8]/20 rounded-3xl p-12 lg:p-20 overflow-hidden shadow-xl">
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#D8A7C8]/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#F4A7C5]/30 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
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
              <div className="inline-block bg-gradient-to-r from-[#EDD5E8] to-[#E6D5E8] px-6 py-2 rounded-full mb-4">
                <span className="text-sm text-[#D8A7C8]">Estamos para ayudarte</span>
              </div>
              <h2 className="text-4xl lg:text-5xl text-foreground tracking-tight mb-4">Hablemos</h2>
              <p className="text-lg text-foreground/70">
                Elegí tu canal favorito para contactarnos
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://wa.me/5491112345678"
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#E6D5E8]/60 to-[#D8C4E8]/60 hover:from-[#F4A7C5]/30 hover:to-[#EAB8D0]/30 transition-all hover:scale-105 shadow-md hover:shadow-xl border-2 border-transparent hover:border-[#F4A7C5]"
              >
                <div className="w-16 h-16 bg-[#F4A7C5]/30 group-hover:bg-gradient-to-br group-hover:from-[#F4A7C5] group-hover:to-[#EAB8D0] rounded-2xl flex items-center justify-center transition-all">
                  <Instagram className="w-8 h-8 text-[#F4A7C5] group-hover:text-white transition-colors" />
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

      <footer className="bg-gradient-to-br from-secondary/30 to-muted/30 border-t-2 border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={logoImg}
                alt="Amigurumis JGC Logo"
                className="w-12 h-12 rounded-full object-cover shadow-lg"
              />
              <span className="text-xl text-foreground">Amigurumis JGC</span>
            </div>
            <p className="text-foreground/60 text-center max-w-md">
              Tejiendo sueños a mano, una puntada a la vez. Cada amigurumi es una obra de arte única hecha con amor.
            </p>
            <p className="text-sm text-foreground/50">© 2026 Amigurumis con Amor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
