// Meta Pixel Code
export const FB_PIXEL_ID = '3551869048440460';

// Fungsi untuk memuat script Facebook Pixel
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Fungsi untuk melacak event spesifik
export const event = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Fungsi untuk melacak konversi standar
export const standardEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options);
  }
};
