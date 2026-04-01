import { NextResponse } from 'next/server';
import { createBrevoContact } from '@/lib/brevo';
import type { LeadFormData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Nombre, email y empresa son obligatorios' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Brevo is optional — if not configured, still allow the flow
    const brevoKey = process.env.BREVO_API_KEY;
    if (brevoKey && brevoKey !== 'placeholder') {
      const result = await createBrevoContact(body);
      if (!result.success) {
        console.warn('Brevo error (non-blocking):', result.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
