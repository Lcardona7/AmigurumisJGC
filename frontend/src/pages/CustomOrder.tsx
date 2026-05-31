import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { createCustomOrder } from '../services/api';

const WHATSAPP_NUMBER = '5491112345678';

export function CustomOrder() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    idea: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('customerName', formData.name);
    fd.append('customerPhone', formData.whatsapp);
    fd.append('description', formData.idea);
    if (file) {
      fd.append('referenceImage', file);
    }

    setSubmitting(true);
    try {
      await createCustomOrder(fd);
      toast.success('¡Pedido enviado con éxito! Te contactaremos por WhatsApp.');

      const message = encodeURIComponent(
        `Hola! Quiero hacer un pedido personalizado:\n\nNombre: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nIdea: ${formData.idea}`,
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    } catch {
      toast.error('Error al enviar el pedido. Intentá de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] rounded-full mb-4 shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl text-foreground tracking-tight">
            Pedí tu Diseño Personalizado
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Contanos tu idea y la tejemos para vos. Puede ser un personaje de una serie, una mascota o lo que imagines.
            <span className="text-[#D8A7C8]"> Hacemos realidad tus sueños en forma de amigurumi.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white border-2 border-[#E6D5E8] rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="space-y-3">
            <label htmlFor="name" className="block text-foreground text-lg">
              Tu Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 bg-input-background border-2 border-[#E6D5E8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D8A7C8] focus:border-[#D8A7C8] text-foreground transition-all"
              placeholder="Ingresá tu nombre"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="whatsapp" className="block text-foreground text-lg">
              Tu WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-5 py-4 bg-input-background border-2 border-[#E6D5E8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D8A7C8] focus:border-[#D8A7C8] text-foreground transition-all"
              placeholder="+54 9 11 1234-5678"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="idea" className="block text-foreground text-lg">
              Contanos tu idea (colores, tamaño, detalles)
            </label>
            <textarea
              id="idea"
              required
              value={formData.idea}
              onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
              rows={6}
              className="w-full px-5 py-4 bg-input-background border-2 border-[#E6D5E8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D8A7C8] focus:border-[#D8A7C8] text-foreground resize-none transition-all"
              placeholder="Ejemplo: Quiero un dragón verde con alas moradas, de unos 20cm de alto..."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-foreground text-lg">Subir foto de referencia</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-40 bg-gradient-to-br from-[#EDD5E8]/40 to-[#F4E8F0]/40 border-2 border-dashed border-[#D8A7C8]/40 rounded-2xl cursor-pointer hover:from-[#D8A7C8]/10 hover:to-[#F4A7C5]/10 hover:border-[#D8A7C8] transition-all group"
              >
                <Upload className="w-10 h-10 text-[#D8A7C8] mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-foreground/70">
                  {file ? file.name : 'Hacé clic para subir una imagen'}
                </p>
                {file && (
                  <p className="text-sm text-[#D8A7C8] mt-2 font-medium">✓ {file.name}</p>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#D8A7C8] to-[#F4A7C5] text-white py-5 rounded-2xl hover:scale-105 transition-transform shadow-xl text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-[#E6D5E8] rounded-3xl p-8 space-y-6 shadow-lg">
            <h3 className="text-2xl text-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#E6C4E0] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">?</span>
              </div>
              ¿Cómo funciona?
            </h3>
            <ul className="text-foreground/70 space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] text-white rounded-full flex items-center justify-center shadow-md">1</span>
                <span className="pt-1">Enviás tu pedido con todos los detalles</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] text-white rounded-full flex items-center justify-center shadow-md">2</span>
                <span className="pt-1">Te contactamos por WhatsApp para confirmar</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] text-white rounded-full flex items-center justify-center shadow-md">3</span>
                <span className="pt-1">Comenzamos a tejer tu diseño único</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] text-white rounded-full flex items-center justify-center shadow-md">4</span>
                <span className="pt-1">Te enviamos fotos del progreso</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#D8A7C8] to-[#F4A7C5] text-white rounded-full flex items-center justify-center shadow-md">5</span>
                <span className="pt-1">Recibís tu amigurumi en 10-15 días</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#EDD5E8]/70 to-[#F4A7C5]/40 border-2 border-[#D8A7C8]/30 rounded-3xl p-8 space-y-6 shadow-lg">
            <h3 className="text-2xl text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#D8A7C8]" />
              Ideas populares
            </h3>
            <ul className="text-foreground/70 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D8A7C8] rounded-full"></span>
                Mascotas personalizadas
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#F4A7C5] rounded-full"></span>
                Personajes de películas y series
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D8C4E8] rounded-full"></span>
                Bebés y recién nacidos
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#EAB8D0] rounded-full"></span>
                Profesiones (médicos, maestros, etc.)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E6C4E0] rounded-full"></span>
                Llaveros con iniciales
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D8A7C8] rounded-full"></span>
                Decoración de habitaciones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
