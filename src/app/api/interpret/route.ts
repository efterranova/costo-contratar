import { NextResponse } from 'next/server';
import { calculateIDC } from '@/lib/scoring-engine';
import { COUNTRIES, ROLES, SENIORITY_LEVELS } from '@/lib/constants';
import type { ScoringInput } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { country, role, seniority, jobTitle } = body as ScoringInput;

    if (!country || !role || !seniority) {
      return NextResponse.json({ error: 'Faltan parametros' }, { status: 400 });
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

    const jobContext = jobTitle
      ? `El puesto especifico que busca cubrir es: "${jobTitle}". Usa este detalle para dar recomendaciones MUY especificas a ese puesto. Por ejemplo, si busca un "Desarrollador Python Senior", menciona el mercado de Python, la competencia por ese stack, si hay mucha demanda de ese lenguaje vs otros, etc. Si busca un "Gerente de Ventas", habla de la competencia por perfiles comerciales con liderazgo. Haz que el analisis se sienta UNICO para ese puesto.`
      : `No especifico un puesto particular, solo la categoria general "${roleLabel}". Da recomendaciones para esa categoria en general.`;

    const prompt = `Eres un consultor experto en reclutamiento y mercado laboral en Latinoamerica. Un empleador quiere contratar un perfil de "${roleLabel}" con nivel "${seniorityLabel}" en ${countryLabel}.

${jobContext}

El Indice de Dificultad de Contratacion arrojo un score de ${result.roundedScore}/10 (dificultad ${result.level}).

Desglose de variables:
${variablesSummary}

Genera una interpretacion personalizada en 3-4 parrafos cortos (maximo 250 palabras total) que:
1. Explique en lenguaje simple QUE SIGNIFICA este score para el empleador, mencionando el puesto especifico si lo proporciono
2. Identifique cuales son los factores que mas pesan y POR QUE afectan a este perfil en este pais
3. De 2-3 recomendaciones practicas y accionables especificas para ESE puesto (no genericas)

Escribe en espanol, tono profesional pero cercano. No uses jerga tecnica. No menciones "IDC" ni las variables por codigo (V1, V2). Habla directo al empleador usando "tu empresa".`;

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
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('OpenRouter error:', response.status, err);
      return NextResponse.json({ error: 'Error al generar interpretacion' }, { status: 500 });
    }

    const data = await response.json();
    const interpretation = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Interpret error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
