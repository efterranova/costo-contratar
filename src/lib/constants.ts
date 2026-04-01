import type { Country, RoleCategory, SeniorityLevel } from './types';

export const WEIGHTS = {
  v1: 0.25,
  v2: 0.25,
  v3: 0.20,
  v4: 0.15,
  v5: 0.15,
} as const;

export const COUNTRIES: { value: Country; label: string }[] = [
  { value: 'mexico', label: 'México' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'brazil', label: 'Brasil' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'chile', label: 'Chile' },
  { value: 'peru', label: 'Perú' },
];

export const ROLES: { value: RoleCategory; label: string }[] = [
  { value: 'operativo', label: 'Operativo / Producción' },
  { value: 'operaciones', label: 'Operaciones / Logística' },
  { value: 'comercial', label: 'Comercial / Ventas' },
  { value: 'tech', label: 'Tecnología / IT / Desarrollo' },
  { value: 'marketing', label: 'Marketing / Comunicación' },
  { value: 'finanzas', label: 'Finanzas / Contabilidad' },
  { value: 'rrhh', label: 'RRHH / Administración' },
  { value: 'ejecutivo', label: 'Ejecutivo / C-Level' },
];

export const SENIORITY_LEVELS: { value: SeniorityLevel; label: string }[] = [
  { value: 'junior', label: 'Junior (0-2 años)' },
  { value: 'mid', label: 'Mid (3-5 años)' },
  { value: 'senior', label: 'Senior / Especializado (6+ años)' },
];

export const VARIABLE_NAMES: Record<string, string> = {
  v1: '¿Cuántas empresas están contratando?',
  v2: '¿Cuántas buscan el mismo perfil?',
  v3: '¿Qué tan competitivos son los salarios?',
  v4: '¿Compites con empresas extranjeras?',
  v5: '¿Qué tan difícil es encontrar talento formal?',
};

export const VARIABLE_SOURCES: Record<string, string> = {
  v1: 'ManpowerGroup MEOS Q2 2026',
  v2: 'Computrabajo Market Research 2026',
  v3: 'Interfell / Hays Salary Guide 2026',
  v4: 'Bloomberg Línea / Análisis de mercado',
  v5: 'ILOSTAT / OIT 2025',
};
