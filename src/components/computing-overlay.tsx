'use client';

import { useState, useEffect } from 'react';

const phrases = [
  'Analizando el mercado laboral...',
  'Evaluando la demanda por este perfil...',
  'Consultando datos salariales...',
  'Midiendo la competencia internacional...',
  'Cruzando 5 variables del mercado...',
  'Generando tu diagnostico personalizado...',
];

export function ComputingOverlay() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-12 text-center">
      <div className="flex justify-center mb-5">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-brand)] border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-[var(--color-brand)]/30 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>

      <p className="text-[14px] font-semibold text-foreground mb-2">
        Preparando tu reporte
      </p>
      <p className="text-[13px] text-[var(--color-brand)] font-medium transition-opacity duration-300" key={phraseIndex}>
        {phrases[phraseIndex]}
      </p>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            style={{
              opacity: i <= phraseIndex ? 1 : 0.2,
              transition: 'opacity 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
