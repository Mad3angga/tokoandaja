'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import { FB_PIXEL_ID, pageview } from '@/lib/fbpixel';

// Komponen inner yang menggunakan useSearchParams
function FacebookPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Jika FB_PIXEL_ID tidak ada, jangan lakukan apa-apa
    if (!FB_PIXEL_ID) return;

    // Panggil pageview saat rute berubah
    pageview();
  }, [pathname, searchParams]);

  return null;
}

// Komponen utama yang membungkus dengan Suspense
export default function FacebookPixel() {
  // Jika FB_PIXEL_ID tidak ada, jangan render apa-apa
  if (!FB_PIXEL_ID) return null;

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3551869048440460');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Suspense fallback={null}>
        <FacebookPixelTracker />
      </Suspense>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=3551869048440460&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
