import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeScreen } from './pages/HomeScreen';
import { Catalogo } from './pages/Catalogo';
import { ProductDetail } from './pages/ProductDetail';
import { CustomOrder } from './pages/CustomOrder';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/personalizado" element={<CustomOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
