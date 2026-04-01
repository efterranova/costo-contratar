'use client';

import { useState } from 'react';
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

  function handleCalculate() {
    if (!country || !role || !seniority) return;
    const scoringInput: ScoringInput = { country, role, seniority };
    const idcResult = calculateIDC(scoringInput);
    setInput(scoringInput);
    setResult(idcResult);
  }

  const isReady = country && role && seniority;

  return (
    <section id="calculadora" className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Calcula tu IDC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">País</label>
              <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona país" />
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Categoría de rol</label>
              <Select value={role} onValueChange={(v) => setRole(v as RoleCategory)}>
                <SelectTrigger>
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Nivel de seniority</label>
              <Select value={seniority} onValueChange={(v) => setSeniority(v as SeniorityLevel)}>
                <SelectTrigger>
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
            className="w-full"
            size="lg"
          >
            Calcular Índice de Dificultad
          </Button>
        </div>

        {result && input && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
