'use client';

import type { IDCResult } from '@/lib/types';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';

const levelConfig = {
  baja: {
    label: 'Baja',
    color: 'var(--color-score-low)',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  media: {
    label: 'Media',
    color: 'var(--color-score-mid)',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  alta: {
    label: 'Alta',
    color: 'var(--color-score-high)',
    bg: '#FEF2F2',
    border: '#FECACA',
  },
};

interface ScoreDisplayProps {
  result: IDCResult;
  country?: string;
  role?: string;
  seniority?: string;
  jobTitle?: string;
}

export function ScoreDisplay({ result, country, role, seniority, jobTitle }: ScoreDisplayProps) {
  const config = levelConfig[result.level];
  const percentage = (result.roundedScore / 10) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const countryLabel = country ? COUNTRIES.find(c => c.value === country)?.label : undefined;
  const roleLabel = role ? ROLES.find(r => r.value === role)?.label : undefined;
  const seniorityLabel = seniority ? SENIORITY_LEVELS.find(s => s.value === seniority)?.label : undefined;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Top bar */}
      <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: config.bg, border: `1.5px solid ${config.border}` }}>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: config.color }}>
            Dificultad {config.label}
          </span>
        </div>
        <span className="text-[12px] text-muted-foreground">
          {jobTitle ? <>{jobTitle} &middot; </> : null}
          {roleLabel} &middot; {seniorityLabel} &middot; {countryLabel}
        </span>
      </div>

      {/* Score body */}
      <div className="p-5 md:p-6 flex items-center gap-6 md:gap-8">
        {/* Gauge */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="5" />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              stroke={config.color}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.34,1.56,0.64,1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold leading-none tabular-nums" style={{ color: config.color }}>
              {result.roundedScore}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">de 10</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-foreground/80 leading-relaxed">
            {result.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
