"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { getAllTestimonials, Testimonial } from '@/lib/testimonials';

// Fallback testimonials in case database fetch fails
const fallbackTestimonials = [
  {
    id: '1',
    name: 'Budi Santoso',
    avatar: 'https://placehold.co/200x200/e9ecef/495057?text=Budi',
    rating: 5,
    text: 'Pelayanan sangat cepat dan ramah. Produk sesuai dengan deskripsi. Pengiriman juga cepat. Puas belanja di TokoAndaja!'
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    avatar: 'https://placehold.co/200x200/e9ecef/495057?text=Siti',
    rating: 5,
    text: 'Kualitas produk sangat bagus. Harga juga terjangkau. Proses pembelian melalui WhatsApp sangat mudah dan cepat.'
  },
  {
    id: '3',
    name: 'Ahmad Hidayat',
    avatar: 'https://placehold.co/200x200/e9ecef/495057?text=Ahmad',
    rating: 4,
    text: 'Produk yang saya beli sesuai dengan ekspektasi. Respon admin cepat dan informatif. Akan belanja lagi di sini.'
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getAllTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Apa Kata Pelanggan Kami</h2>
          <p className="text-gray-800 max-w-2xl mx-auto font-medium">
            Testimoni dari pelanggan yang telah berbelanja di TokoAndaja
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Memuat testimonial...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-800 italic font-medium">&ldquo;{testimonial.text}&rdquo;</p>
              {/* Display creation date if available - using a more consistent date format */}
              {testimonial.created_at && (
                <p className="text-gray-500 text-xs mt-2">
                  {/* Using a fixed format instead of locale-dependent formatting */}
                  {new Date(testimonial.created_at).toISOString().split('T')[0]}
                </p>
              )}
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
