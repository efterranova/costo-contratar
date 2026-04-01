import { NextResponse } from 'next/server';
import { calculateIDC } from '@/lib/scoring-engine';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';
import type { ScoringInput } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { country, role, seniority } = body as ScoringInput;

    if (!country || !role || !seniority) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API no configurada' }, { status: 500 });
    }

    const result = calculateIDC({ country, role, seniority });
    const countryLabel = COUNTRIES.find(c => c.value === country)?.label || country;
    const roleLabel = ROLES.find(r => r.value === role)?.label || role;
    const seniorityLabel = SENIORITY_LEVELS.find(s => s.value === seniority)?.label || seniority;

    const variablesSummary = result.variables
      .map(v => `- ${v.name}: ${v.score}/10 (${v.interpretation})`)
      .join('\n');

    const prompt = `Eres un consultor experto en reclutamiento y mercado laboral en Latinoamérica. Un empleador quiere contratar un perfil de "${roleLabel}" con nivel "${seniorityLabel}" en ${countryLabel}.

El Índice de Dificultad de Contratación (IDC) arrojó un score de ${result.roundedScore}/10 (dificultad ${result.level}).

Desglose de variables:
${variablesSummary}

Genera una interpretación personalizada en 3-4 párrafos cortos (máximo 200 palabras total) que:
1. Explique en lenguaje simple QUÉ SIGNIFICA este score para el empleador en su contexto específico
2. Identifique cuáles son los factores que más pesan y POR QUÉ afectan a este perfil en este país
3. Dé 2-3 recomendaciones prácticas y accionables para mejorar sus probabilidades de contratar

Escribe en español, tono profesional pero cercano. No uses jerga técnica. No menciones el nombre "IDC" ni las variables por código (V1, V2, etc.). Habla directo al empleador usando "usted" o "tu empresa".`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://erecruit-1.evolucio.lat',
        'X-Title': 'IDC erecruit',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('OpenRouter error:', response.status, err);
      return NextResponse.json({ error: 'Error al generar interpretación' }, { status: 500 });
    }

    const data = await response.json();
    const interpretation = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Interpret error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
