'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { IDCResult, ScoringInput } from '@/lib/types';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: IDCResult;
  input: ScoringInput;
}

export function LeadCaptureModal({ open, onOpenChange, result, input }: LeadCaptureModalProps) {
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
          name,
          email,
          company,
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

      const pdfRes = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: input.country,
          role: input.role,
          seniority: input.seniority,
          name,
          email,
        }),
      });

      if (!pdfRes.ok) {
        throw new Error('Error al generar el reporte. Intenta de nuevo.');
      }

      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `IDC-Reporte-${input.country}-${input.role}-${input.seniority}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 px-6 pt-6 pb-5">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-heading">
              Descargar reporte completo
            </DialogTitle>
            <DialogDescription className="text-indigo-100/80 text-[13px]">
              Recibe un PDF con el analisis detallado, fuentes de datos y recomendaciones personalizadas.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[13px]">Nombre completo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
              className="h-10 rounded-xl bg-muted/30 border-border/60"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[13px]">Correo electronico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
              required
              className="h-10 rounded-xl bg-muted/30 border-border/60"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-[13px]">Empresa</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nombre de tu empresa"
              required
              className="h-10 rounded-xl bg-muted/30 border-border/60"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-[13px] text-muted-foreground">Telefono (opcional)</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+52 55 1234 5678"
              className="h-10 rounded-xl bg-muted/30 border-border/60"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200/60 px-4 py-2.5">
              <p className="text-[13px] text-rose-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all"
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar reporte PDF
              </span>
            )}
          </Button>

          <p className="text-[11px] text-center text-muted-foreground/70 leading-relaxed">
            Al descargar, aceptas recibir informacion relevante sobre contratacion en LATAM. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
