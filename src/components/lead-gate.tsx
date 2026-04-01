'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { IDCResult, ScoringInput } from '@/lib/types';

interface LeadGateProps {
  result: IDCResult;
  input: ScoringInput;
  onUnlock: () => void;
}

export function LeadGate({ result, input, onUnlock }: LeadGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        body: JSON.stringify({ country: input.country, role: input.role, seniority: input.seniority, name, email }),
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
    <div>
      {/* Blurred preview */}
      <div className="relative bg-white rounded-2xl border border-border shadow-sm p-5 mb-3 overflow-hidden">
        <div className="blur-[5px] select-none pointer-events-none opacity-50">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-border/30 last:border-0">
              <div className="flex-1">
                <div className="h-3 bg-muted rounded w-44 mb-1.5" />
                <div className="h-2 bg-muted/60 rounded w-64" />
              </div>
              <div className="text-xl font-bold text-muted-foreground/40 tabular-nums">{i * 3}/10</div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-md text-[13px] font-medium">
            <svg className="w-3.5 h-3.5 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Desglose + Analisis IA + PDF
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="bg-[var(--color-brand)] px-5 py-4">
          <h3 className="text-white font-bold text-[15px]">
            Desbloquea el analisis completo
          </h3>
          <p className="text-white/70 text-[12px] mt-0.5">
            Desglose de 5 variables, analisis personalizado por IA y reporte PDF descargable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
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
          </div>

          {error && (
            <p className="text-[12px] text-red-600 mb-3">{error}</p>
          )}

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
                Generando reporte...
              </span>
            ) : (
              'Ver analisis completo y descargar PDF'
            )}
          </Button>

          <p className="text-[10px] text-center text-muted-foreground/60 mt-3">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </div>
    </div>
  );
}
