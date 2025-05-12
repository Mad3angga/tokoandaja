import { supabase } from './supabase';

// Tipe data untuk produk
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountEndDate?: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  description: string;
  category: string;
  createdAt?: string;
};

// Mengambil semua produk dari database
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  // Transform data dari snake_case ke camelCase
  return (data || []).map(product => transformProductData(product)).filter(Boolean) as Product[];
}

// Fungsi untuk mengubah snake_case ke camelCase
// Define a type for the raw product data from the database
type RawProductData = {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  discount?: number;
  discount_end_date?: string;
  image: string;
  images?: string[];
  video_url?: string;
  description: string;
  category: string;
  created_at?: string;
};

function transformProductData(product: RawProductData): Product | null {
  if (!product) return null;
  
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price,
    discount: product.discount,
    discountEndDate: product.discount_end_date,
    image: product.image,
    images: product.images,
    videoUrl: product.video_url,
    description: product.description,
    category: product.category,
    createdAt: product.created_at
  };
}

// Mengambil produk berdasarkan ID
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
  
  // Log data untuk debugging
  console.log('Raw product data:', data);
  
  // Transform data dari snake_case ke camelCase
  return transformProductData(data);
}

// Mengambil produk berdasarkan kategori
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }

  // Transform data dari snake_case ke camelCase
  return (data || []).map(product => transformProductData(product)).filter(Boolean) as Product[];
}

// Mengambil produk unggulan (produk dengan diskon)
export async function getFeaturedProducts(limit: number = 1): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .not('discount', 'is', null)
    .order('discount', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  // Log data untuk debugging
  console.log('Raw featured products data:', data);
  
  // Transform data dari snake_case ke camelCase
  return (data || []).map(product => transformProductData(product)).filter(Boolean) as Product[];
}
