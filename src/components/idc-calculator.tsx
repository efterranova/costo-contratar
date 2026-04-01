'use client';

import { useState, useRef, useCallback } from 'react';
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

type Step = 'calculator' | 'computing' | 'lead-form' | 'report';

export function IDCCalculator() {
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState<Country | ''>('');
  const [role, setRole] = useState<RoleCategory | ''>('');
  const [seniority, setSeniority] = useState<SeniorityLevel | ''>('');
  const [result, setResult] = useState<IDCResult | null>(null);
  const [input, setInput] = useState<ScoringInput | null>(null);
  const [step, setStep] = useState<Step>('calculator');
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const fetchAI = useCallback((scoringInput: ScoringInput) => {
    setAiLoading(true);
    setAiText('');
    fetch('/api/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scoringInput),
    })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setAiText(data.interpretation || ''))
      .catch(() => {})
      .finally(() => setAiLoading(false));
  }, []);

  function handleCalculate() {
    if (!country || !role || !seniority) return;
    const scoringInput: ScoringInput = { country, role, seniority, jobTitle: jobTitle.trim() || undefined };
    const idcResult = calculateIDC(scoringInput);
    setInput(scoringInput);
    setResult(idcResult);
    setStep('computing');

    // Start AI in background
    fetchAI(scoringInput);

    // Show computing for 2.5s then show lead form
    setTimeout(() => {
      setStep('lead-form');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2500);
  }

  function handleUnlock() {
    setStep('report');
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const isReady = country && role && seniority;

  return (
    <section id="calculadora" className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Calculator — always visible */}
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
            disabled={!isReady || step === 'computing'}
            className="w-full h-11 rounded-lg text-sm font-semibold bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-30"
            size="lg"
          >
            {step === 'computing' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analizando...
              </span>
            ) : 'Calcular dificultad'}
          </Button>
        </div>

        {/* Step: Computing overlay */}
        {step === 'computing' && <ComputingOverlay />}

        {/* Step: Lead form — blurred preview + form */}
        {step === 'lead-form' && result && input && (
          <div ref={resultRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
              <div className="blur-[6px] select-none pointer-events-none opacity-40 space-y-6">
                <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} jobTitle={input.jobTitle} />
                <VariableBreakdown variables={result.variables} />
              </div>
              <div className="absolute inset-0 flex items-start justify-center pt-12 md:pt-20">
                <LeadGate result={result} input={input} onUnlock={handleUnlock} aiText={aiText} />
              </div>
            </div>
          </div>
        )}

        {/* Step: Full report — replaces everything */}
        {step === 'report' && result && input && (
          <div ref={resultRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} jobTitle={input.jobTitle} />
            <VariableBreakdown variables={result.variables} />
            <AIInterpretation text={aiText} loading={aiLoading} />
            {/* CTA */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 md:p-6 text-center">
              <p className="text-[14px] text-foreground mb-3">
                Si necesitas publicar esta vacante o recibir apoyo en tu proceso de contratacion:
              </p>
              <a
                href="https://erecruit.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-6 rounded-lg text-sm font-semibold bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
              >
                Conoce erecruit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
