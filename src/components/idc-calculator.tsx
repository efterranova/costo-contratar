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
import { RecommendationCard } from './recommendation-card';
import { LeadCaptureModal } from './lead-capture-modal';

export function IDCCalculator() {
  const [country, setCountry] = useState<Country | ''>('');
  const [role, setRole] = useState<RoleCategory | ''>('');
  const [seniority, setSeniority] = useState<SeniorityLevel | ''>('');
  const [result, setResult] = useState<IDCResult | null>(null);
  const [input, setInput] = useState<ScoringInput | null>(null);
  const [showModal, setShowModal] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    if (!country || !role || !seniority) return;
    const scoringInput: ScoringInput = { country, role, seniority };
    const idcResult = calculateIDC(scoringInput);
    setInput(scoringInput);
    setResult(idcResult);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const isReady = country && role && seniority;

  return (
    <section id="calculadora" className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Calculator card */}
        <div className="relative rounded-3xl border border-border/60 bg-card shadow-xl shadow-indigo-500/[0.03] p-6 md:p-10 mb-10">
          {/* Subtle top gradient line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              Calcula tu indice
            </h2>
            <p className="text-muted-foreground text-[15px]">
              Selecciona las tres variables y descubre la dificultad de tu contratacion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="space-y-2.5">
              <label className="text-[13px] font-medium text-foreground flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pais
              </label>
              <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                <SelectTrigger className="h-11 rounded-xl bg-muted/40 border-border/60 hover:bg-muted/60 transition-colors">
                  <SelectValue placeholder="Selecciona pais" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-medium text-foreground flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Categoria de rol
              </label>
              <Select value={role} onValueChange={(v) => setRole(v as RoleCategory)}>
                <SelectTrigger className="h-11 rounded-xl bg-muted/40 border-border/60 hover:bg-muted/60 transition-colors">
                  <SelectValue placeholder="Selecciona rol" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-medium text-foreground flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Nivel de experiencia
              </label>
              <Select value={seniority} onValueChange={(v) => setSeniority(v as SeniorityLevel)}>
                <SelectTrigger className="h-11 rounded-xl bg-muted/40 border-border/60 hover:bg-muted/60 transition-colors">
                  <SelectValue placeholder="Selecciona nivel" />
                </SelectTrigger>
                <SelectContent>
                  {SENIORITY_LEVELS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!isReady}
            className="w-full h-12 rounded-xl text-[15px] font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-40 disabled:shadow-none"
            size="lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Calcular Indice de Dificultad
          </Button>
        </div>

        {/* Results */}
        {result && input && (
          <div ref={resultRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <ScoreDisplay result={result} />
            <VariableBreakdown variables={result.variables} />
            <AIInterpretation input={input} />
            <RecommendationCard
              result={result}
              onDownloadPDF={() => setShowModal(true)}
            />
            <LeadCaptureModal
              open={showModal}
              onOpenChange={setShowModal}
              result={result}
              input={input}
            />
          </div>
        )}
      </div>
    </section>
  );
}
