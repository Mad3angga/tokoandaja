-- Part 1: Create the testimonials table
-- Run this part first
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Part 2: Insert sample data
-- Run this part second
INSERT INTO public.testimonials (name, avatar, rating, text) VALUES
  (
    'Budi Santoso', 
    'https://placehold.co/200x200/e9ecef/495057?text=Budi', 
    5, 
    'Pelayanan sangat cepat dan ramah. Produk sesuai dengan deskripsi. Pengiriman juga cepat. Puas belanja di TokoAndaja!'
  ),
  (
    'Siti Rahayu', 
    'https://placehold.co/200x200/e9ecef/495057?text=Siti', 
    5, 
    'Kualitas produk sangat bagus. Harga juga terjangkau. Proses pembelian melalui WhatsApp sangat mudah dan cepat.'
  ),
  (
    'Ahmad Hidayat', 
    'https://placehold.co/200x200/e9ecef/495057?text=Ahmad', 
    4, 
    'Produk yang saya beli sesuai dengan ekspektasi. Respon admin cepat dan informatif. Akan belanja lagi di sini.'
  ),
  (
    'Dewi Lestari', 
    'https://placehold.co/200x200/e9ecef/495057?text=Dewi', 
    5, 
    'Saya sangat senang dengan layanan TokoAndaja. Produk berkualitas dan harga bersaing. Pengiriman cepat dan aman.'
  ),
  (
    'Rudi Hartono', 
    'https://placehold.co/200x200/e9ecef/495057?text=Rudi', 
    5, 
    'Sudah berlangganan sejak lama dan tidak pernah kecewa. Selalu puas dengan produk dan layanan yang diberikan.'
  );

-- Part 3: Set up RLS policies (optional)
-- Only run this part if you need RLS and after understanding how it works
-- ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT USING (true);
