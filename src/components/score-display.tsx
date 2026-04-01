'use client';

import type { IDCResult } from '@/lib/types';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';

const levelConfig = {
  baja: {
    label: 'Dificultad Baja',
    sublabel: 'Proceso de contratacion favorable',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-200/60',
    ring: 'stroke-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/10',
  },
  media: {
    label: 'Dificultad Media',
    sublabel: 'Requiere estrategia diferenciada',
    color: 'text-amber-600',
    bg: 'bg-amber-50/80',
    border: 'border-amber-200/60',
    ring: 'stroke-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/10',
  },
  alta: {
    label: 'Dificultad Alta',
    sublabel: 'Necesita busqueda activa especializada',
    color: 'text-rose-600',
    bg: 'bg-rose-50/80',
    border: 'border-rose-200/60',
    ring: 'stroke-rose-500',
    gradient: 'from-rose-500 to-red-500',
    glow: 'shadow-rose-500/10',
  },
};

interface ScoreDisplayProps {
  result: IDCResult;
  country?: string;
  role?: string;
  seniority?: string;
}

export function ScoreDisplay({ result, country, role, seniority }: ScoreDisplayProps) {
  const config = levelConfig[result.level];
  const percentage = (result.roundedScore / 10) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const countryLabel = country ? COUNTRIES.find(c => c.value === country)?.label : undefined;
  const roleLabel = role ? ROLES.find(r => r.value === role)?.label : undefined;
  const seniorityLabel = seniority ? SENIORITY_LEVELS.find(s => s.value === seniority)?.label : undefined;

  return (
    <div className={`relative rounded-3xl border ${config.border} ${config.bg} p-8 md:p-10 shadow-lg ${config.glow} overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Circular gauge */}
        <div className="relative w-44 h-44 flex-shrink-0">
          {/* Outer glow */}
          <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${config.gradient} opacity-5 blur-xl`} />

          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-black/[0.06]"
            />
            {/* Score arc */}
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className={config.ring}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-heading font-bold ${config.color} leading-none`}>
              {result.roundedScore}
            </span>
            <span className="text-xs text-muted-foreground mt-1 font-medium">de 10</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1">
          {(countryLabel || roleLabel) && (
            <p className="text-[13px] text-muted-foreground mb-2">
              {roleLabel} {seniorityLabel && `(${seniorityLabel})`} {countryLabel && `en ${countryLabel}`}
            </p>
          )}

          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${config.color} bg-white/60 border ${config.border} mb-3 shadow-sm`}>
            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
            {config.label}
          </div>

          <p className={`text-[13px] ${config.color} font-medium mb-3`}>
            {config.sublabel}
          </p>

          <p className="text-muted-foreground text-[14px] leading-relaxed">
            {result.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
