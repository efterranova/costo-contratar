'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ComputingOverlay } from './computing-overlay';

export function IDCCalculator() {
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState<Country | ''>('');
  const [role, setRole] = useState<RoleCategory | ''>('');
  const [seniority, setSeniority] = useState<SeniorityLevel | ''>('');
  const [result, setResult] = useState<IDCResult | null>(null);
  const [input, setInput] = useState<ScoringInput | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [computing, setComputing] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const fetchAI = useCallback((scoringInput: ScoringInput) => {
    setAiLoading(true);
    setAiError(false);
    setAiText('');

    fetch('/api/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scoringInput),
    })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setAiText(data.interpretation || ''))
      .catch(() => setAiError(true))
      .finally(() => setAiLoading(false));
  }, []);

  function handleCalculate() {
    if (!country || !role || !seniority) return;
    const scoringInput: ScoringInput = { country, role, seniority, jobTitle: jobTitle.trim() || undefined };

    // Show computing overlay
    setComputing(true);
    setUnlocked(false);

    // Calculate IDC score (instant)
    const idcResult = calculateIDC(scoringInput);
    setInput(scoringInput);
    setResult(idcResult);

    // Start AI fetch in background
    fetchAI(scoringInput);

    // Show overlay for 2.5s then reveal results
    setTimeout(() => {
      setComputing(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2500);
  }

  const isReady = country && role && seniority;

  return (
    <section id="calculadora" className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Calculator */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 md:p-7 mb-8">
          <div className="mb-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Puesto que buscas cubrir
            </label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Ej: Desarrollador Backend Python, Gerente de Ventas, Contador Senior..."
              className="h-11 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm"
            />
          </div>

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
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Categoria</label>
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
            disabled={!isReady || computing}
            className="w-full h-11 rounded-lg text-sm font-semibold bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-30"
            size="lg"
          >
            {computing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analizando...
              </span>
            ) : (
              'Calcular dificultad'
            )}
          </Button>
        </div>

        {/* Computing overlay */}
        {computing && <ComputingOverlay />}

        {/* Results — all blurred behind lead gate until unlocked */}
        {result && input && !computing && (
          <div ref={resultRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!unlocked ? (
              /* Everything blurred + lead form overlay */
              <div className="relative">
                {/* Blurred content preview */}
                <div className="blur-[6px] select-none pointer-events-none opacity-50 space-y-6">
                  <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} jobTitle={input.jobTitle} />
                  <VariableBreakdown variables={result.variables} />
                  {!aiLoading && !aiError && aiText && (
                    <AIInterpretation text={aiText} />
                  )}
                </div>

                {/* Lead form overlay */}
                <div className="absolute inset-0 flex items-start justify-center pt-16 md:pt-24">
                  <LeadGate result={result} input={input} onUnlock={() => setUnlocked(true)} />
                </div>
              </div>
            ) : (
              /* Unlocked — show everything */
              <div className="space-y-6 animate-in fade-in duration-500">
                <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} jobTitle={input.jobTitle} />
                <VariableBreakdown variables={result.variables} />
                {!aiError && (
                  <AIInterpretation text={aiText} loading={aiLoading} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
