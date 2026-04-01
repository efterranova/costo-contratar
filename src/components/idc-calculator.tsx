'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';
import { calculateIDC } from '@/lib/scoring-engine';
import type { Country, RoleCategory, SeniorityLevel, IDCResult, ScoringInput } from '@/lib/types';
import { ScoreDisplay } from './score-display';
import { VariableBreakdown } from './variable-breakdown';
import { AIInterpretation } from './ai-interpretation';
import { LeadGate } from './lead-gate';

export function IDCCalculator() {
  const [country, setCountry] = useState<Country | ''>('');
  const [role, setRole] = useState<RoleCategory | ''>('');
  const [seniority, setSeniority] = useState<SeniorityLevel | ''>('');
  const [result, setResult] = useState<IDCResult | null>(null);
  const [input, setInput] = useState<ScoringInput | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    if (!country || !role || !seniority) return;
    const scoringInput: ScoringInput = { country, role, seniority };
    const idcResult = calculateIDC(scoringInput);
    setInput(scoringInput);
    setResult(idcResult);
    setUnlocked(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const isReady = country && role && seniority;

  return (
    <section id="calculadora" className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Calculator */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 md:p-7 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Pais</label>
              <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                <SelectTrigger className="h-10 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Rol</label>
              <Select value={role} onValueChange={(v) => setRole(v as RoleCategory)}>
                <SelectTrigger className="h-10 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Experiencia</label>
              <Select value={seniority} onValueChange={(v) => setSeniority(v as SeniorityLevel)}>
                <SelectTrigger className="h-10 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {SENIORITY_LEVELS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!isReady}
            className="w-full h-11 rounded-lg text-sm font-semibold bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-30"
            size="lg"
          >
            Calcular dificultad
          </Button>
        </div>

        {/* Results */}
        {result && input && (
          <div ref={resultRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} />

            {!unlocked && (
              <LeadGate result={result} input={input} onUnlock={() => setUnlocked(true)} />
            )}

            {unlocked && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <VariableBreakdown variables={result.variables} />
                <AIInterpretation input={input} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
