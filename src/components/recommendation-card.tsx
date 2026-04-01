'use client';

import type { IDCResult } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface RecommendationCardProps {
  result: IDCResult;
  onDownloadPDF: () => void;
}

export function RecommendationCard({ onDownloadPDF }: RecommendationCardProps) {
  return (
    <div className="relative rounded-3xl border border-border/60 bg-card p-6 md:p-8 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold mb-1.5">
            Obtén el reporte completo
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Descarga un PDF con el analisis detallado de las 5 variables, las fuentes de datos utilizadas y recomendaciones para tu proceso de contratacion.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
          <Button
            onClick={onDownloadPDF}
            className="h-11 px-6 rounded-xl text-[13px] font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 shadow-lg shadow-indigo-500/15 hover:shadow-xl hover:shadow-indigo-500/25 transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar PDF
          </Button>
          <a
            href="https://erecruit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 inline-flex items-center justify-center rounded-xl border border-border/60 bg-card hover:bg-muted/60 text-[13px] font-medium transition-all"
          >
            Conocer erecruit
          </a>
        </div>
      </div>
    </div>
  );
}
