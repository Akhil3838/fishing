'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslate() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;

    const el = document.getElementById('google_translate_element');
    if (!el) return;

    // 🔥 FULL RESET (safe for dynamic routes)
    document
      .querySelectorAll('iframe.goog-te-banner-frame')
      .forEach(i => i.remove());

    document.body.classList.remove('translated-ltr', 'translated-rtl');
    document.cookie =
      'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';

    el.innerHTML = '';

    let attempts = 0;

    const init = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,ml,ta,te,kn,ar',
            autoDisplay: false,
          },
          'google_translate_element'
        );
        return;
      }

      attempts++;
      if (attempts < 40) {
        setTimeout(init, 200);
      }
    };

    init();
  }, [pathname, mounted]);

  if (!mounted) return null;

  return  <div className="google-translate-wrapper">
 
    <div
      id="google_translate_element"
      suppressHydrationWarning
    ></div>
</div> ;
}
