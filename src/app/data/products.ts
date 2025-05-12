// Data produk contoh (nanti bisa diganti dengan data dari API atau database)
export const products = [
  {
    id: '1',
    name: 'Kemeja Pria Casual',
    price: 150000,
    originalPrice: 250000,
    discount: 40,
    discountEndDate: '2025-05-20',
    image: 'https://placehold.co/600x400/e9ecef/495057?text=Kemeja+Pria',
    // Array gambar untuk slider
    images: [
      'https://placehold.co/600x400/e9ecef/495057?text=Kemeja+Pria+1',
      'https://placehold.co/600x400/e9ecef/495057?text=Kemeja+Pria+2',
      'https://placehold.co/600x400/e9ecef/495057?text=Kemeja+Pria+3'
    ],
    // URL video produk
    videoUrl: 'https://www.example.com/videos/kemeja-pria-casual.mp4',
    description: 'Kemeja casual pria dengan bahan katun premium, nyaman dipakai sehari-hari.',
    category: 'pakaian'
  }
];
