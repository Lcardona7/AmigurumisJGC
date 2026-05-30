import { Outlet } from 'react-router-dom';
import { MessageCircle, Mail } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-gradient-to-br from-secondary/30 to-muted/30 border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1 shadow-lg">
                <ImageWithFallback
                  src="/logo.png"
                  alt="Amigurumis JGC Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <span className="text-xl text-foreground">Amigurumis JGC</span>
            </div>
            <p className="text-foreground/60 text-center max-w-md">
              Tejiendo sueños a mano, una puntada a la vez. Cada amigurumi es una obra de arte única hecha con amor.
            </p>
            <div className="flex gap-6">
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/amigurumis.jgc/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="mailto:hola@amigurumis.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-foreground/50">© 2026 Amigurumis con Amor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
