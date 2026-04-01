'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import type { IDCResult, ScoringInput } from '@/lib/types';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';

interface LeadGateProps {
  result: IDCResult;
  input: ScoringInput;
  onUnlock: () => void;
  aiText?: string;
}

const levelLabel = { baja: 'Baja', media: 'Media', alta: 'Alta' };
const levelColor = { baja: '#0D9373', media: '#D97706', alta: '#DC2626' };

export function LeadGate({ result, input, onUnlock, aiText }: LeadGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const countryLabel = COUNTRIES.find(c => c.value === input.country)?.label || '';
  const roleLabel = ROLES.find(r => r.value === input.role)?.label || '';
  const seniorityLabel = SENIORITY_LEVELS.find(s => s.value === input.seniority)?.label || '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, company,
          phone: phone || undefined,
          country: input.country, role: input.role, seniority: input.seniority,
          jobTitle: input.jobTitle || '',
          idcScore: result.roundedScore, idcLevel: result.level,
        }),
      });

      if (!leadRes.ok) {
        const data = await leadRes.json().catch(() => ({}));
        throw new Error(data.error || 'Error al registrar.');
      }

      // PDF download
      const pdfRes = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: input.country, role: input.role, seniority: input.seniority,
          name, email, jobTitle: input.jobTitle, aiAnalysis: aiText,
        }),
      });
      if (pdfRes.ok) {
        const blob = await pdfRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `IDC-Reporte-${input.country}-${input.role}-${input.seniority}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      onUnlock();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Score preview — compact summary of what was calculated */}
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Tu reporte esta listo</p>
          <p className="text-[12px] text-muted-foreground">
            {input.jobTitle ? <>{input.jobTitle} &middot; </> : null}
            {roleLabel} &middot; {seniorityLabel} &middot; {countryLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tabular-nums" style={{ color: levelColor[result.level] }}>
            {result.roundedScore}
          </span>
          <span className="text-[11px] text-muted-foreground">/10</span>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 md:p-6">
        <div className="text-center mb-5">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-50)] mb-3">
            <svg className="w-5 h-5 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-[17px] mb-1">
            A que correo te enviamos el reporte?
          </h3>
          <p className="text-[13px] text-muted-foreground max-w-sm mx-auto">
            Recibiras el analisis completo con desglose de variables, diagnostico por IA y un PDF descargable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
            className="h-10 rounded-lg text-sm"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            required
            className="h-10 rounded-lg text-sm"
          />
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Empresa"
            required
            className="h-10 rounded-lg text-sm"
          />
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefono (opcional)"
            className="h-10 rounded-lg text-sm"
          />

          {error && <p className="text-[12px] text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg text-sm font-semibold bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Preparando reporte...
              </span>
            ) : 'Ver mi reporte completo'}
          </Button>

          <p className="text-[10px] text-center text-muted-foreground/50">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </div>
    </div>
  );
}
