'use client';

import type { VariableScore } from '@/lib/types';

function getScoreColor(score: number) {
  if (score <= 3) return { text: 'text-emerald-600', bg: 'bg-emerald-500', track: 'bg-emerald-100' };
  if (score <= 6) return { text: 'text-amber-600', bg: 'bg-amber-500', track: 'bg-amber-100' };
  return { text: 'text-rose-600', bg: 'bg-rose-500', track: 'bg-rose-100' };
}

function getIcon(id: string) {
  const icons: Record<string, React.ReactNode> = {
    v1: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    v2: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    v3: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    v4: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    v5: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };
  return icons[id] || null;
}

export function VariableBreakdown({ variables }: { variables: VariableScore[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Que factores influyen</h3>
          <p className="text-[13px] text-muted-foreground">Cada variable aporta al score final segun su peso</p>
        </div>
      </div>

      <div className="grid gap-3">
        {variables.map((v) => {
          const colors = getScoreColor(v.score);
          return (
            <div
              key={v.id}
              className="group rounded-2xl border border-border/60 bg-card p-5 hover:shadow-md hover:border-border transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="h-9 w-9 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0 text-muted-foreground group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {getIcon(v.id)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-[14px] font-semibold text-foreground leading-snug">
                      {v.name}
                    </h4>
                    <div className="flex items-baseline gap-0.5 flex-shrink-0">
                      <span className={`text-2xl font-heading font-bold ${colors.text}`}>
                        {v.score}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">/10</span>
                    </div>
                  </div>

                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                    {v.interpretation}
                  </p>

                  {/* Progress bar */}
                  <div className={`h-1.5 rounded-full ${colors.track} overflow-hidden`}>
                    <div
                      className={`h-full rounded-full ${colors.bg} transition-all duration-700 ease-out`}
                      style={{ width: `${v.score * 10}%` }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[11px] text-muted-foreground/70 font-medium">
                      {v.rawValue}
                    </span>
                    <span className="text-[11px] text-muted-foreground/50">
                      Peso: {(v.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
