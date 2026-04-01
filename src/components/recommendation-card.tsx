'use client';

import type { IDCResult } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface RecommendationCardProps {
  result: IDCResult;
  onDownloadPDF: () => void;
}

export function RecommendationCard({ result, onDownloadPDF }: RecommendationCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-3">¿Qué significa para ti?</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {result.recommendation}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onDownloadPDF} className="flex-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar reporte completo (PDF)
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
