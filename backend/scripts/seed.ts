import { DataSource } from 'typeorm';
import { Product } from '../src/products/product.entity';
import { Category } from '../src/categories/category.entity';

const IMAGE_URL = '/pikachu.webp';

const categories = [
  { name: 'Animales', slug: 'animales' },
  { name: 'Personajes', slug: 'personajes' },
  { name: 'Peluches', slug: 'peluches' },
];

const products: Array<{ title: string; description: string; price: number; categorySlug: string }> = [
  { title: 'Osito Tejido', description: 'Osito de algodón tejido a mano, perfecto para regalar.', price: 2500, categorySlug: 'animales' },
  { title: 'Conejita Rosada', description: 'Conejita con orejas largas y lazo rosado.', price: 2800, categorySlug: 'animales' },
  { title: 'Gatito Siamés', description: 'Gatito estilo siamés con detalles en color marrón.', price: 2600, categorySlug: 'animales' },
  { title: 'Perrito Salchicha', description: 'Perrito salchicha alargado y súper suave.', price: 2400, categorySlug: 'animales' },
  { title: 'Pikachu', description: 'Pikachu tejido con sus orejas amarillas y mejillas rojas.', price: 3500, categorySlug: 'personajes' },
  { title: 'Stitch Tejido', description: 'Stitch azul con sus grandes orejas y sonrisa traviesa.', price: 3800, categorySlug: 'personajes' },
  { title: 'Totoro Gigante', description: 'Totoro gris con su pancita blanca, ideal para abrazar.', price: 4500, categorySlug: 'personajes' },
  { title: 'Hello Kitty', description: 'Hello Kitty con su clásico lazo rojo.', price: 3200, categorySlug: 'personajes' },
  { title: 'Oso Polar', description: 'Oso polar blanco con bufanda tejida.', price: 3000, categorySlug: 'peluches' },
  { title: 'Elefantito Azul', description: 'Elefantito celeste con orejas grandes y suaves.', price: 2700, categorySlug: 'peluches' },
  { title: 'Dragón Verde', description: 'Dragón verde con escamas y alas tejidas.', price: 3500, categorySlug: 'peluches' },
  { title: 'Jirafa Manchas', description: 'Jirafa de cuello largo con manchas marrones.', price: 2900, categorySlug: 'peluches' },
];

async function seed() {
  const ds = new DataSource({
    type: 'better-sqlite3',
    database: './data/dev.db',
    entities: [Product, Category],
    synchronize: true,
  });

  await ds.initialize();
  console.log('Conectado a la base de datos.');

  const categoryRepo = ds.getRepository(Category);
  const productRepo = ds.getRepository(Product);

  const existing = await categoryRepo.count();
  if (existing > 0) {
    console.log('La base de datos ya tiene datos. Omitiendo seed.');
    await ds.destroy();
    return;
  }

  const catMap: Record<string, Category> = {};
  for (const cat of categories) {
    const saved = await categoryRepo.save(categoryRepo.create(cat));
    catMap[cat.slug] = saved;
    console.log(`  Categoría creada: ${saved.name}`);
  }

  for (const p of products) {
    await productRepo.save(
      productRepo.create({
        title: p.title,
        description: p.description,
        price: p.price,
        images: [IMAGE_URL],
        isAvailable: true,
        categoryId: catMap[p.categorySlug].id,
        videoUrl: p.title === 'Osito Tejido'
          ? '6lOgLc_-Xh0'
          : undefined,
      }),
    );
    console.log(`  Producto creado: ${p.title}`);
  }

  console.log(`\nSeed completado. ${categories.length} categorías, ${products.length} productos.`);
  await ds.destroy();
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
