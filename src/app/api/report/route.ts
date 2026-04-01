import { NextResponse } from 'next/server';
import { calculateIDC } from '@/lib/scoring-engine';
import type { ScoringInput } from '@/lib/types';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { country, role, seniority, name, email } = body as ScoringInput & { name: string; email: string };

    if (!country || !role || !seniority) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const result = calculateIDC({ country, role, seniority });
    const countryLabel = COUNTRIES.find(c => c.value === country)?.label || country;
    const roleLabel = ROLES.find(r => r.value === role)?.label || role;
    const seniorityLabel = SENIORITY_LEVELS.find(s => s.value === seniority)?.label || seniority;

    const { generatePDFBuffer } = await import('@/lib/pdf-generator');

    const buffer = await generatePDFBuffer({
      result,
      countryLabel,
      roleLabel,
      seniorityLabel,
      userName: name || 'Usuario',
      userEmail: email || '',
      generatedAt: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="IDC-Reporte-${country}-${role}-${seniority}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Error al generar PDF' }, { status: 500 });
  }
}
