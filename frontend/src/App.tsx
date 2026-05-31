import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeScreen } from './pages/HomeScreen';
import { ProductDetail } from './pages/ProductDetail';
import { CustomOrder } from './pages/CustomOrder';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/personalizado" element={<CustomOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
