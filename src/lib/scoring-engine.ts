import type { ScoringInput, IDCResult, VariableScore } from './types';
import { WEIGHTS, VARIABLE_NAMES, VARIABLE_SOURCES } from './constants';
import scoringData from './scoring-data.json';

interface RawVariableData {
  score: number;
  raw: string;
  interpretation: string;
}

interface RawCombination {
  v1: RawVariableData;
  v2: RawVariableData;
  v3: RawVariableData;
  v4: RawVariableData;
  v5: RawVariableData;
}

export function calculateIDC(input: ScoringInput): IDCResult {
  const key = `${input.country}.${input.role}.${input.seniority}`;
  const raw = (scoringData as Record<string, RawCombination>)[key];

  if (!raw) {
    throw new Error(`No scoring data found for: ${key}`);
  }

  const variableIds = ['v1', 'v2', 'v3', 'v4', 'v5'] as const;
  const variables: VariableScore[] = variableIds.map((id) => {
    const v = raw[id];
    const weight = WEIGHTS[id];
    return {
      id,
      name: VARIABLE_NAMES[id],
      rawValue: v.raw,
      score: v.score,
      weight,
      weightedScore: parseFloat((v.score * weight).toFixed(2)),
      source: VARIABLE_SOURCES[id],
      interpretation: v.interpretation,
    };
  });

  const totalScore = variables.reduce((sum, v) => sum + v.weightedScore, 0);
  const roundedScore = parseFloat(totalScore.toFixed(1));

  let level: IDCResult['level'];
  if (roundedScore <= 3) level = 'baja';
  else if (roundedScore <= 6) level = 'media';
  else level = 'alta';

  const recommendation = getRecommendation(level, roundedScore);
  const serviceRoute = getServiceRoute(level);

  return {
    totalScore,
    roundedScore,
    level,
    variables,
    recommendation,
    serviceRoute,
  };
}

function getRecommendation(level: IDCResult['level'], score: number): string {
  switch (level) {
    case 'baja':
      return 'Este rol tiene alta disponibilidad de candidatos y baja competencia externa. Un proceso ágil con una buena descripción de vacante debería ser suficiente. Priorice claridad en la oferta y velocidad de respuesta.';
    case 'media':
      return score > 5
        ? 'Hay competencia significativa por este perfil. Necesita diferenciarse con una propuesta de valor clara, proceso ágil, y posiblemente apoyo en filtrado y atracción de candidatos. Considere complementar la publicación con búsqueda activa.'
        : 'Hay competencia significativa por este perfil. Necesita diferenciarse: propuesta de valor clara, proceso ágil, y posiblemente apoyo en filtrado de candidatos.';
    case 'alta':
      return 'Este rol enfrenta alta competencia, escasez de talento o presión salarial externa. Publicar y esperar no será suficiente. Necesita búsqueda activa, evaluación especializada y una oferta competitiva para atraer al candidato ideal.';
  }
}

function getServiceRoute(level: IDCResult['level']): IDCResult['serviceRoute'] {
  switch (level) {
    case 'baja':
      return {
        name: 'Plan Básico',
        description: 'Planes de publicación mensuales con visibilidad estándar',
        priceRange: 'USD 50–150/mes',
      };
    case 'media':
      return {
        name: 'Plan Premium',
        description: 'Plataforma con analítica avanzada y visibilidad destacada',
        priceRange: 'USD 250/mes',
      };
    case 'alta':
      return {
        name: 'Búsqueda Ejecutiva',
        description: 'Servicio asistido con búsqueda activa y evaluación especializada',
        priceRange: 'USD 500/mes',
      };
  }
}
