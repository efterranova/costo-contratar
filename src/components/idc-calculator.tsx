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
    setTimeout(() => setStep('lead-form'), 2500);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const isReady = country && role && seniority;

  // ===== Post-calculator steps =====
  if (step !== 'calculator') {
    return (
      <div className="min-h-screen bg-[#FAFBFD]">
        <div ref={topRef} className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            {/* Logo */}
            <div className="mb-6">
              <Image src="/erecruit-color.png" alt="erecruit" width={120} height={32} className="h-7 w-auto" />
            </div>

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
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 md:p-6 text-center">
                  <p className="text-[14px] text-[#111827] mb-3">
                    Si necesitas publicar esta vacante o recibir apoyo en tu proceso de contratacion:
                  </p>
                  <a
                    href="https://erecruit.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-6 rounded-lg text-sm font-semibold bg-[#2856A3] text-white hover:bg-[#1E3F7A] transition-colors"
                  >
                    Conoce erecruit
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                <div className="text-center pb-8">
                  <button onClick={handleReset} className="text-[13px] text-[#64748B] hover:text-[#111827] transition-colors underline underline-offset-2">
                    Calcular otro puesto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP: Calculator — Two-tone split =====
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — Dark blue panel */}
      <div className="lg:w-1/2 bg-[#1B2E4A] text-white relative overflow-hidden flex flex-col justify-center px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <Image
            src="/erecruit-white.png"
            alt="erecruit"
            width={200}
            height={54}
            className="h-12 w-auto mb-8 stagger-1"
          />

          <h1 className="stagger-2 text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem] font-extrabold leading-[1.1] tracking-tight mb-4">
            Que tan dificil sera cubrir tu vacante?
          </h1>

          <p className="stagger-3 text-[15px] text-white/70 leading-relaxed mb-8 max-w-sm">
            Ingresa los datos de la posicion que buscas y nuestro indice analiza 5 variables del mercado laboral para darte un diagnostico personalizado con inteligencia artificial.
          </p>

          <div className="stagger-4 flex flex-col gap-3 text-[13px] text-white/50">
            {[
              'Datos de fuentes publicas verificables',
              'Resultado y analisis por IA en segundos',
              'Cobertura en 7 paises de Latinoamerica',
            ].map((t) => (
              <span key={t} className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#5B9EFF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </span>
            ))}
          </div>

          {/* erecruit.ca link */}
          <div className="mt-10 stagger-4">
            <a
              href="https://erecruit.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              erecruit.ca &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Right — Light panel with form */}
      <div className="lg:w-1/2 bg-[#F8FAFC] flex flex-col justify-center px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mb-6">
            Calcula el indice de dificultad
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#374151] mb-1.5">Puesto que buscas cubrir</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ej: Desarrollador Python, Gerente de Ventas..."
                className="h-11 rounded-lg bg-white border-[#E2E8F0] text-sm shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-[#374151] mb-1.5">Pais</label>
                <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                  <SelectTrigger className="h-11 rounded-lg bg-white border-[#E2E8F0] text-sm shadow-sm">
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
                <label className="block text-[12px] font-medium text-[#374151] mb-1.5">Categoria</label>
                <Select value={role} onValueChange={(v) => setRole(v as RoleCategory)}>
                  <SelectTrigger className="h-11 rounded-lg bg-white border-[#E2E8F0] text-sm shadow-sm">
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

            <div>
              <label className="block text-[12px] font-medium text-[#374151] mb-1.5">Nivel de experiencia</label>
              <Select value={seniority} onValueChange={(v) => setSeniority(v as SeniorityLevel)}>
                <SelectTrigger className="h-11 rounded-lg bg-white border-[#E2E8F0] text-sm shadow-sm">
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
              className="w-full h-12 rounded-lg text-[14px] font-semibold bg-[#2856A3] hover:bg-[#1E3F7A] shadow-md shadow-[#2856A3]/15 hover:shadow-lg transition-all disabled:opacity-30 disabled:shadow-none"
              size="lg"
            >
              Calcular dificultad
            </Button>
          </div>

          <p className="text-[11px] text-[#94A3B8] text-center mt-4">
            Gratis &middot; Sin registro &middot; Resultado inmediato
          </p>
        </div>
      </div>
    </div>
  );
}
