'use client';

import { useEffect, useState } from 'react';
import type { ScoringInput } from '@/lib/types';

interface AIInterpretationProps {
  input: ScoringInput;
}

export function AIInterpretation({ input }: AIInterpretationProps) {
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setInterpretation('');

    fetch('/api/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setInterpretation(data.interpretation);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input.country, input.role, input.seniority]);

  if (error) return null;

  return (
    <div className="relative rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-violet-50/60 p-6 md:p-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-violet-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-[15px]">Analisis personalizado</h3>
            <p className="text-[12px] text-muted-foreground">Generado por IA para tu contexto especifico</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[13px] text-indigo-600 font-medium">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analizando las variables de tu busqueda...
            </div>
            <div className="space-y-2.5 animate-pulse">
              <div className="h-3 bg-indigo-200/30 rounded-full w-full" />
              <div className="h-3 bg-indigo-200/30 rounded-full w-11/12" />
              <div className="h-3 bg-indigo-200/30 rounded-full w-4/5" />
              <div className="h-3 bg-indigo-200/30 rounded-full w-full mt-5" />
              <div className="h-3 bg-indigo-200/30 rounded-full w-10/12" />
              <div className="h-3 bg-indigo-200/30 rounded-full w-3/4" />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {interpretation.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-foreground/80">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
