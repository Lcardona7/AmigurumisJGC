import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { useState, useCallback } from 'react';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/personalizado', label: 'Personalizado' },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = location.pathname;

  const isActive = (to: string) => {
    if (to.startsWith('/#')) return false;
    return currentPath === to;
  };

  const handleNavClick = (to: string) => {
    setMenuOpen(false);
    if (to === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (to.startsWith('/#')) {
      if (location.pathname === '/') {
        const id = to.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = useCallback(() => {
    if (location.pathname === '/') {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contacto');
    }
  }, [location.pathname, navigate]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EDD5E8] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3" onClick={() => { setMenuOpen(false); if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="bg-white rounded-full p-1 shadow-md">
              <ImageWithFallback
                src="/logoposta.png"
                alt="Amigurumis JGC"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <span className="text-lg text-foreground hidden sm:inline font-semibold">
              Amigurumis <span className="text-[#D8A7C8]">JGC</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white shadow-md'
                      : 'text-foreground/70 hover:text-[#D8A7C8] hover:bg-[#F4E8F0]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D8A7C8] to-[#C4A0D0] text-white rounded-full hover:scale-105 transition-transform shadow-md hover:shadow-lg text-sm font-semibold ml-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Contacto
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={handleContactClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D8A7C8] to-[#C4A0D0] text-white rounded-full text-sm font-semibold shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-foreground hover:text-[#D8A7C8] transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#EDD5E8] py-4 space-y-1">
            {links.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white'
                      : 'text-foreground/70 hover:text-[#D8A7C8] hover:bg-[#F4E8F0]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
