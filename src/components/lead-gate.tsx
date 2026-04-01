'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      // Send lead to Brevo
      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, company,
          phone: phone || undefined,
          country: input.country,
          role: input.role,
          seniority: input.seniority,
          idcScore: result.roundedScore,
          idcLevel: result.level,
        }),
      });

      if (!leadRes.ok) {
        const data = await leadRes.json().catch(() => ({}));
        throw new Error(data.error || 'Error al registrar. Intenta de nuevo.');
      }

      // Generate PDF download
      const pdfRes = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: input.country, role: input.role, seniority: input.seniority,
          name, email,
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
    <div className="relative">
      {/* Blurred preview of what they'll see */}
      <div className="relative rounded-3xl border border-border/40 bg-muted/20 p-6 mb-4 overflow-hidden">
        <div className="blur-[6px] select-none pointer-events-none opacity-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-xl bg-muted" />
            <div>
              <div className="h-3 bg-muted rounded w-48 mb-1.5" />
              <div className="h-2 bg-muted/70 rounded w-72" />
            </div>
            <div className="ml-auto text-2xl font-bold text-muted-foreground/40">7/10</div>
          </div>
          <div className="h-1.5 bg-muted rounded-full w-full mb-4" />
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-xl bg-muted" />
            <div>
              <div className="h-3 bg-muted rounded w-40 mb-1.5" />
              <div className="h-2 bg-muted/70 rounded w-64" />
            </div>
            <div className="ml-auto text-2xl font-bold text-muted-foreground/40">5/10</div>
          </div>
          <div className="h-1.5 bg-muted rounded-full w-full mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-muted" />
            <div>
              <div className="h-3 bg-muted rounded w-52 mb-1.5" />
              <div className="h-2 bg-muted/70 rounded w-56" />
            </div>
            <div className="ml-auto text-2xl font-bold text-muted-foreground/40">8/10</div>
          </div>
          <div className="h-1.5 bg-muted rounded-full w-full" />
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border/60 rounded-full px-5 py-2.5 shadow-lg">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-medium">Desglose completo + Analisis IA + PDF</span>
          </div>
        </div>
      </div>

      {/* Lead form — inline, not a modal */}
      <div className="rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/60 via-blue-50/30 to-white overflow-hidden shadow-lg shadow-indigo-500/[0.06]">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 px-6 md:px-8 py-5">
          <h3 className="text-white font-heading font-bold text-lg">
            Desbloquea el analisis completo
          </h3>
          <p className="text-indigo-100/80 text-[13px] mt-1">
            Recibe el desglose de las 5 variables, analisis personalizado por IA y un reporte PDF descargable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="space-y-1.5">
              <Label htmlFor="gate-name" className="text-[13px]">Nombre completo</Label>
              <Input
                id="gate-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="h-11 rounded-xl bg-white border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gate-email" className="text-[13px]">Correo electronico</Label>
              <Input
                id="gate-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                required
                className="h-11 rounded-xl bg-white border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gate-company" className="text-[13px]">Empresa</Label>
              <Input
                id="gate-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nombre de tu empresa"
                required
                className="h-11 rounded-xl bg-white border-border/60"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gate-phone" className="text-[13px] text-muted-foreground">Telefono (opcional)</Label>
              <Input
                id="gate-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+52 55 1234 5678"
                className="h-11 rounded-xl bg-white border-border/60"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200/60 px-4 py-2.5 mb-4">
              <p className="text-[13px] text-rose-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-[15px] font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generando tu reporte...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Ver analisis completo y descargar PDF
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Datos seguros
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Sin spam
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cancela cuando quieras
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
