"use client";

import { FaWhatsapp } from 'react-icons/fa';

export default function CallToAction() {
  return (
    <section className="py-12 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Butuh Bantuan?</h2>
            <p className="text-white/90 max-w-xl">
              Hubungi kami melalui WhatsApp untuk pertanyaan, pemesanan, atau konsultasi produk.
              Tim kami siap membantu Anda.
            </p>
          </div>
          <a
            href="https://wa.me/6282135626476"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 hover:bg-green-100 px-6 py-3 rounded-full font-medium flex items-center transition duration-300"
          >
            <FaWhatsapp className="mr-2" size={20} />
            Chat Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
