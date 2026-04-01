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
    <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Análisis personalizado por IA</h3>
          <p className="text-xs text-muted-foreground">Interpretación de tu resultado específico</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analizando tu contexto...
          </div>
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-blue-200/50 dark:bg-blue-800/30 rounded w-full" />
            <div className="h-3 bg-blue-200/50 dark:bg-blue-800/30 rounded w-11/12" />
            <div className="h-3 bg-blue-200/50 dark:bg-blue-800/30 rounded w-4/5" />
            <div className="h-3 bg-blue-200/50 dark:bg-blue-800/30 rounded w-full mt-4" />
            <div className="h-3 bg-blue-200/50 dark:bg-blue-800/30 rounded w-10/12" />
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none text-foreground/80">
          {interpretation.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
