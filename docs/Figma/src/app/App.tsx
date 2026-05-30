import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetail } from './components/ProductDetail';
import { CustomOrder } from './components/CustomOrder';

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/personalizado" element={<CustomOrder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}