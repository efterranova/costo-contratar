'use client';

import type { IDCResult } from '@/lib/types';
import { Button } from '@/components/ui/button';

const levelIcons = {
  baja: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  media: (
    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  alta: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface RecommendationCardProps {
  result: IDCResult;
  onDownloadPDF: () => void;
}

export function RecommendationCard({ result, onDownloadPDF }: RecommendationCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-4 mb-4">
        {levelIcons[result.level]}
        <div>
          <h3 className="text-lg font-semibold">Servicio recomendado</h3>
          <p className="text-sm text-muted-foreground">
            Basado en tu score de dificultad
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-muted/50 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{result.serviceRoute.name}</span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {result.serviceRoute.priceRange}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {result.serviceRoute.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onDownloadPDF} className="flex-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar reporte PDF
        </Button>
        <a
          href="https://erecruit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 text-sm font-medium transition-all"
        >
          Conocer erecruit
        </a>
      </div>
    </div>
  );
}
