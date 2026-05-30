import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getCategories, getProducts } from '../services/api';
import type { Category, Product } from '../types';

const borderColors = ['hover:border-[#D8A7C8]', 'hover:border-[#F4A7C5]', 'hover:border-[#D8C4E8]', 'hover:border-[#EAB8D0]'];
const bgGradients = ['from-[#EDD5E8] to-[#F4E8F0]', 'from-[#F4E8F0] to-[#E6D5E8]', 'from-[#E6D5E8] to-[#D8C4E8]', 'from-[#D8C4E8] to-[#EDD5E8]'];
const catColors = ['from-[#D8A7C8] to-[#E6C4E0]', 'from-[#F4A7C5] to-[#EAB8D0]', 'from-[#D8C4E8] to-[#E6D5E8]', 'from-[#EAB8D0] to-[#F4A7C5]'];

export function Catalogo() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(selectedCategory ?? undefined)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const filtered = search
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl lg:text-5xl text-foreground tracking-tight">Catálogo Completo</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Todos nuestros amigurumis tejidos a mano con amor
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E6D5E8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D8A7C8] focus:border-[#D8A7C8] text-foreground transition-all"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-7 py-3 bg-gradient-to-r from-[#D8A7C8] to-[#E6C4E0] text-white border-2 border-transparent rounded-full whitespace-nowrap hover:scale-105 hover:shadow-lg transition-all shadow-md ${selectedCategory === null ? 'ring-2 ring-white ring-offset-2' : ''}`}
          >
            Todos
          </button>
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-7 py-3 bg-gradient-to-r ${catColors[index % catColors.length]} text-white border-2 border-transparent rounded-full whitespace-nowrap hover:scale-105 hover:shadow-lg transition-all shadow-md ${selectedCategory === cat.id ? 'ring-2 ring-white ring-offset-2' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#D8A7C8] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20 text-lg">
          {search ? 'No se encontraron productos con ese nombre.' : 'No hay productos disponibles.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product, index) => (
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
      )}
    </main>
  );
}
