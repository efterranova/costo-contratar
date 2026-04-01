'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
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
  const topRef = useRef<HTMLDivElement>(null);

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
    fetchAI(scoringInput);
    setTimeout(() => {
      setStep('lead-form');
    }, 2500);
  }

  function handleUnlock() {
    setStep('report');
  }

  function handleReset() {
    setStep('calculator');
    setResult(null);
    setInput(null);
    setAiText('');
  }

  useEffect(() => {
    if (step !== 'calculator') {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const isReady = country && role && seniority;

  // ===== Post-calculator steps (computing, lead-form, report) =====
  if (step !== 'calculator') {
    return (
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div ref={topRef} className="max-w-2xl mx-auto">
          {step === 'computing' && <ComputingOverlay />}

          {step === 'lead-form' && result && input && (
            <div className="animate-in fade-in duration-500">
              <LeadGate result={result} input={input} onUnlock={handleUnlock} aiText={aiText} />
            </div>
          )}

          {step === 'report' && result && input && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <ScoreDisplay result={result} country={input.country} role={input.role} seniority={input.seniority} jobTitle={input.jobTitle} />
              <VariableBreakdown variables={result.variables} />
              <AIInterpretation text={aiText} loading={aiLoading} />
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
              <div className="text-center">
                <button onClick={handleReset} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                  Calcular otro puesto
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ===== STEP: Calculator — Split hero layout =====
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-background to-background" />

      <div className="relative container mx-auto px-4 md:px-6 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">

          {/* Left — Copy */}
          <div className="stagger-1">
            <Image
              src="/erecruit-color.png"
              alt="erecruit"
              width={120}
              height={32}
              className="h-7 w-auto mb-6 hidden lg:block"
            />
            <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight mb-4">
              Que tan dificil sera{' '}
              <span className="text-[var(--color-brand)]">cubrir tu vacante</span>?
            </h1>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
              Ingresa los datos de la posicion que buscas y nuestro indice analiza 5 variables del mercado laboral para darte un diagnostico personalizado con inteligencia artificial.
            </p>

            {/* Trust signals inline */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#0D9373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Datos verificables
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#0D9373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Resultado inmediato
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#0D9373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Analisis por IA
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#0D9373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                7 paises LATAM
              </span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="stagger-2">
            <div className="bg-white rounded-2xl border border-border shadow-lg p-5 md:p-6">
              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Puesto que buscas cubrir
                </label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Ej: Desarrollador Python, Gerente de Ventas..."
                  className="h-10 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Experiencia</label>
                <Select value={seniority} onValueChange={(v) => setSeniority(v as SeniorityLevel)}>
                  <SelectTrigger className="h-10 rounded-lg bg-[var(--color-brand-50)] border-brand-100 text-sm">
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {SENIORITY_LEVELS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          </div>
        </div>
      </div>
    </section>
  );
}
