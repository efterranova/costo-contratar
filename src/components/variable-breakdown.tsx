'use client';

import type { VariableScore } from '@/lib/types';

function getColor(score: number) {
  if (score <= 3) return { bar: 'var(--color-score-low)', bg: '#ECFDF5' };
  if (score <= 6) return { bar: 'var(--color-score-mid)', bg: '#FFFBEB' };
  return { bar: 'var(--color-score-high)', bg: '#FEF2F2' };
}

export function VariableBreakdown({ variables }: { variables: VariableScore[] }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-border/60">
        <h3 className="text-[13px] font-semibold">Desglose de variables</h3>
      </div>

      <div className="divide-y divide-border/50">
        {variables.map((v) => {
          const c = getColor(v.score);
          return (
            <div key={v.id} className="px-5 py-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-foreground leading-tight mb-1">
                    {v.name}
                  </h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    {v.interpretation}
                  </p>
                </div>
                <div className="flex items-baseline gap-0.5 flex-shrink-0 tabular-nums">
                  <span className="text-xl font-extrabold" style={{ color: c.bar }}>
                    {v.score}
                  </span>
                  <span className="text-[10px] text-muted-foreground">/10</span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${v.score * 10}%`, backgroundColor: c.bar }}
                />
              </div>

              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[11px] text-muted-foreground/70">{v.rawValue}</span>
                <span className="text-[11px] text-muted-foreground/50">Peso {(v.weight * 100).toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
