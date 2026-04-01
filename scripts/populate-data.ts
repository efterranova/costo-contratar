/**
 * Script para generar scoring-data.json con datos reales de fuentes públicas.
 *
 * Fuentes:
 * - V1: ManpowerGroup MEOS Q2 2026 (Net Employment Outlook por país)
 * - V2: Computrabajo Market Research 2026 + ManpowerGroup Talent Shortage
 * - V3: Interfell Smart Hiring 2026, Hays Salary Guide 2026
 * - V4: Bloomberg Línea, análisis cualitativo de nearshoring LATAM
 * - V5: ILOSTAT (tasa de informalidad por país)
 *
 * Ejecutar: npx tsx scripts/populate-data.ts
 */

type Country = 'mexico' | 'colombia' | 'brazil' | 'argentina' | 'chile' | 'peru';
type Role = 'operativo' | 'operaciones' | 'comercial' | 'tech' | 'marketing' | 'finanzas' | 'rrhh' | 'ejecutivo';
type Seniority = 'junior' | 'mid' | 'senior';

// ============================================================
// V1: Net Employment Outlook (NEO) por país — ManpowerGroup MEOS Q2 2026
// ============================================================
const neoByCountry: Record<Country, number> = {
  mexico: 35,
  colombia: 19,
  brazil: 55,
  argentina: 16,
  chile: 28,
  peru: 22,
};

function neoToScore(neo: number): number {
  if (neo > 50) return 10;
  if (neo >= 40) return 8;
  if (neo >= 30) return 7;
  if (neo >= 20) return 5;
  if (neo >= 18) return 4;
  if (neo >= 15) return 3;
  if (neo > 0) return 2;
  return 1;
}

function getV1(country: Country): { score: number; raw: string; interpretation: string } {
  const neo = neoByCountry[country];
  const score = neoToScore(neo);
  const labels: Record<number, string> = {
    10: 'Casi todas las empresas del país planean contratar: competencia máxima por candidatos',
    8: 'Muchas empresas están contratando: hay alta competencia por el talento disponible',
    7: 'Hay bastante actividad de contratación en el mercado',
    5: 'Actividad de contratación moderada: competencia normal por candidatos',
    4: 'Pocas empresas están contratando activamente',
    3: 'Baja actividad de contratación: menos competencia entre empleadores',
    2: 'Muy pocas empresas están contratando',
    1: 'El mercado está en contracción: mínima competencia',
  };
  return {
    score,
    raw: `NEO ${neo}%`,
    interpretation: labels[score] || 'Presión moderada',
  };
}

// ============================================================
// V2: Concentración de demanda del perfil — Computrabajo 2026
// ============================================================
const demandByRole: Record<Role, { pct: number; score: number }> = {
  operativo: { pct: 58, score: 10 },
  operaciones: { pct: 44, score: 8 },
  comercial: { pct: 44, score: 8 },
  tech: { pct: 25, score: 6 },
  marketing: { pct: 20, score: 5 },
  finanzas: { pct: 18, score: 4 },
  rrhh: { pct: 15, score: 3 },
  ejecutivo: { pct: 5, score: 9 }, // Baja oferta, alta complejidad
};

function getV2(role: Role): { score: number; raw: string; interpretation: string } {
  const d = demandByRole[role];
  const interpretations: Record<Role, string> = {
    operativo: 'Es el perfil que más empresas buscan: hay muchísima competencia por estos candidatos',
    operaciones: 'Muchas empresas están buscando este mismo perfil al mismo tiempo',
    comercial: 'Perfil muy demandado: muchas empresas compiten por los mismos candidatos',
    tech: 'Demanda importante, y además compites con empresas de otros países que contratan remoto',
    marketing: 'Demanda moderada en el mercado por este tipo de perfil',
    finanzas: 'Relativamente pocas empresas buscan este perfil al mismo tiempo',
    rrhh: 'Baja competencia entre empresas por este tipo de perfil',
    ejecutivo: 'Aunque pocas empresas los buscan, hay muy pocos candidatos disponibles con este nivel',
  };
  return {
    score: d.score,
    raw: role === 'ejecutivo' ? '<5% de demanda' : `~${d.pct}% de demanda`,
    interpretation: interpretations[role],
  };
}

// ============================================================
// V3: Competencia salarial externa — Interfell/Hays 2026
// Varía por país + rol + seniority
// ============================================================
// Base salary competition by role category
const salaryBaseByRole: Record<Role, Record<Seniority, number>> = {
  operativo:    { junior: 2, mid: 3, senior: 4 },
  operaciones:  { junior: 3, mid: 4, senior: 5 },
  comercial:    { junior: 3, mid: 5, senior: 6 },
  tech:         { junior: 4, mid: 6, senior: 7 },
  marketing:    { junior: 3, mid: 4, senior: 5 },
  finanzas:     { junior: 3, mid: 4, senior: 5 },
  rrhh:         { junior: 2, mid: 3, senior: 4 },
  ejecutivo:    { junior: 5, mid: 7, senior: 9 },
};

// Country salary adjustment (USD exposure, market dynamics)
const salaryCountryAdj: Record<Country, number> = {
  mexico: 1,     // Fuerte exposición USD por nearshoring
  colombia: 1,   // Creciente exposición USD
  brazil: 0,     // Mercado grande e interno
  argentina: 1,  // Alta dispersión por inflación/USD
  chile: 0,      // Mercado más estable
  peru: 0,       // Mercado más pequeño, menor dispersión
};

// USD remote exposure by role (adds +2 for remote-eligible roles)
const usdExposureByRole: Record<Role, boolean> = {
  operativo: false,
  operaciones: false,
  comercial: false,
  tech: true,
  marketing: true,
  finanzas: false,
  rrhh: false,
  ejecutivo: true,
};

function getV3(country: Country, role: Role, seniority: Seniority): { score: number; raw: string; interpretation: string } {
  let score = salaryBaseByRole[role][seniority] + salaryCountryAdj[country];

  // Add USD exposure for senior roles in exposed categories
  if (usdExposureByRole[role] && (seniority === 'mid' || seniority === 'senior')) {
    score += 1;
  }

  score = Math.min(10, Math.max(1, score));

  const dispersions: Record<string, string> = {
    '1': 'Dispersión muy baja', '2': 'Dispersión muy baja', '3': 'Dispersión baja',
    '4': 'Dispersión moderada-baja', '5': 'Dispersión moderada',
    '6': 'Dispersión moderada-alta', '7': 'Dispersión alta',
    '8': 'Dispersión alta', '9': 'Dispersión muy alta', '10': 'Guerra por talento',
  };

  let interpretation = '';
  if (score >= 8) interpretation = 'Los salarios para este perfil varían mucho: hay guerra por talento y necesitas ofrecer un salario muy competitivo';
  else if (score >= 5) interpretation = 'Los salarios están dispersos: necesitas una oferta atractiva para competir por buenos candidatos';
  else if (score >= 3) interpretation = 'Los salarios del mercado son relativamente estables y predecibles';
  else interpretation = 'Los rangos salariales son estables: no hay presión significativa para pagar más';

  if (usdExposureByRole[role]) interpretation += '. Además, estos perfiles pueden recibir ofertas en dólares de empresas internacionales';

  return {
    score,
    raw: dispersions[String(score)] || 'Dispersión moderada',
    interpretation,
  };
}

// ============================================================
// V4: Exposición al nearshoring — Bloomberg Línea, análisis cualitativo
// ============================================================
const nearshoringByRole: Record<Role, number> = {
  operativo: 2,
  operaciones: 3,
  comercial: 4,
  tech: 8,
  marketing: 6,
  finanzas: 3,
  rrhh: 2,
  ejecutivo: 5,
};

// México y Colombia +1 por ser destinos preferentes
const nearshoringCountryAdj: Record<Country, number> = {
  mexico: 1,
  colombia: 1,
  brazil: 0,
  argentina: 0,
  chile: 0,
  peru: 0,
};

function getV4(country: Country, role: Role): { score: number; raw: string; interpretation: string } {
  let score = nearshoringByRole[role] + nearshoringCountryAdj[country];
  score = Math.min(10, Math.max(1, score));

  let level: string;
  let interpretation: string;
  if (score >= 8) {
    level = 'Competencia alta';
    interpretation = 'Empresas de EE.UU., Europa y otros países contratan activamente estos perfiles en tu región, ofreciendo salarios en dólares y trabajo remoto';
  } else if (score >= 5) {
    level = 'Competencia moderada';
    interpretation = 'Algunas empresas extranjeras buscan estos perfiles en tu país, lo que genera competencia adicional por candidatos';
  } else {
    level = 'Competencia baja';
    interpretation = 'Este perfil se contrata principalmente a nivel local: las empresas extranjeras no suelen competir por estos candidatos';
  }

  return { score, raw: level, interpretation };
}

// ============================================================
// V5: Fragilidad estructural — ILOSTAT (informalidad)
// ============================================================
const informalityByCountry: Record<Country, number> = {
  mexico: 55,
  colombia: 58,
  brazil: 40,
  argentina: 45,
  chile: 27,
  peru: 68,
};

function informalityToScore(rate: number): number {
  if (rate > 65) return 8;
  if (rate > 55) return 6;
  if (rate > 40) return 5;
  if (rate > 30) return 4;
  if (rate > 20) return 3;
  return 2;
}

function getV5(country: Country): { score: number; raw: string; interpretation: string } {
  const rate = informalityByCountry[country];
  const score = informalityToScore(rate);

  let interpretation: string;
  if (score >= 7) interpretation = 'Gran parte de la fuerza laboral trabaja de manera informal: hay pocos candidatos con experiencia formal verificable';
  else if (score >= 5) interpretation = 'Una porción significativa del mercado es informal, lo que reduce la cantidad de candidatos con historial laboral comprobable';
  else interpretation = 'La mayoría de trabajadores están en el mercado formal: es más fácil encontrar candidatos con experiencia verificable';

  return {
    score,
    raw: `Informalidad ${rate}%`,
    interpretation,
  };
}

// ============================================================
// Generar todas las combinaciones
// ============================================================
const countries: Country[] = ['mexico', 'colombia', 'brazil', 'argentina', 'chile', 'peru'];
const roles: Role[] = ['operativo', 'operaciones', 'comercial', 'tech', 'marketing', 'finanzas', 'rrhh', 'ejecutivo'];
const seniorities: Seniority[] = ['junior', 'mid', 'senior'];

interface VariableData {
  score: number;
  raw: string;
  interpretation: string;
}

interface CombinationData {
  v1: VariableData;
  v2: VariableData;
  v3: VariableData;
  v4: VariableData;
  v5: VariableData;
}

const data: Record<string, CombinationData> = {};

for (const country of countries) {
  for (const role of roles) {
    for (const seniority of seniorities) {
      const key = `${country}.${role}.${seniority}`;
      data[key] = {
        v1: getV1(country),
        v2: getV2(role),
        v3: getV3(country, role, seniority),
        v4: getV4(country, role),
        v5: getV5(country),
      };
    }
  }
}

// Write to file
const fs = require('fs');
const path = require('path');
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'scoring-data.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`Generated ${Object.keys(data).length} combinations → ${outputPath}`);

// Verify with examples from the document
function calculateIDC(d: CombinationData): number {
  return d.v1.score * 0.25 + d.v2.score * 0.25 + d.v3.score * 0.20 + d.v4.score * 0.15 + d.v5.score * 0.15;
}

console.log('\nVerificación con ejemplos del documento:');
const devSeniorCO = data['colombia.tech.senior'];
console.log(`Dev Senior Colombia: ${calculateIDC(devSeniorCO).toFixed(2)} (esperado: ~6.35)`);
console.log(`  V1=${devSeniorCO.v1.score} V2=${devSeniorCO.v2.score} V3=${devSeniorCO.v3.score} V4=${devSeniorCO.v4.score} V5=${devSeniorCO.v5.score}`);

const adminJrAR = data['argentina.rrhh.junior'];
console.log(`Analista Admin Jr Argentina: ${calculateIDC(adminJrAR).toFixed(2)} (esperado: ~3.15)`);
console.log(`  V1=${adminJrAR.v1.score} V2=${adminJrAR.v2.score} V3=${adminJrAR.v3.score} V4=${adminJrAR.v4.score} V5=${adminJrAR.v5.score}`);
