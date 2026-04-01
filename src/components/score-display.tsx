'use client';

import type { IDCResult } from '@/lib/types';

const levelConfig = {
  baja: {
    label: 'Dificultad Baja',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    ring: 'stroke-green-500',
    gradient: 'from-green-500 to-emerald-500',
  },
  media: {
    label: 'Dificultad Media',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    ring: 'stroke-amber-500',
    gradient: 'from-amber-500 to-orange-500',
  },
  alta: {
    label: 'Dificultad Alta',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    ring: 'stroke-red-500',
    gradient: 'from-red-500 to-rose-500',
  },
};

export function ScoreDisplay({ result }: { result: IDCResult }) {
  const config = levelConfig[result.level];
  const percentage = (result.roundedScore / 10) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bg} p-6 md:p-8`}>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Circular gauge */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={config.ring}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${config.color}`}>
              {result.roundedScore}
            </span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${config.color} ${config.bg} border ${config.border} mb-3`}>
            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
            {config.label}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {result.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
