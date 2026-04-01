'use client';

import type { VariableScore } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

function getScoreColor(score: number): string {
  if (score <= 3) return 'text-green-600 dark:text-green-400';
  if (score <= 6) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

function getProgressClass(score: number): string {
  if (score <= 3) return '[&>div]:bg-green-500';
  if (score <= 6) return '[&>div]:bg-amber-500';
  return '[&>div]:bg-red-500';
}

export function VariableBreakdown({ variables }: { variables: VariableScore[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Desglose por variable</h3>
      <div className="grid gap-3">
        {variables.map((v) => (
          <div
            key={v.id}
            className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    {v.id}
                  </span>
                  <span className="text-sm font-medium">{v.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.interpretation}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-2xl font-bold ${getScoreColor(v.score)}`}>
                  {v.score}
                </span>
                <span className="text-xs text-muted-foreground">/10</span>
              </div>
            </div>
            <Progress
              value={v.score * 10}
              className={`h-1.5 ${getProgressClass(v.score)}`}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {v.rawValue}
              </span>
              <span className="text-xs text-muted-foreground">
                Peso: {(v.weight * 100).toFixed(0)}% | Ponderado: {v.weightedScore.toFixed(2)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-1">
              Fuente: {v.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
