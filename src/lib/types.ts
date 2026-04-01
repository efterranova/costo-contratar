export type Country = 'mexico' | 'colombia' | 'brazil' | 'argentina' | 'chile' | 'peru';
export type RoleCategory = 'operativo' | 'operaciones' | 'comercial' | 'tech' | 'marketing' | 'finanzas' | 'rrhh' | 'ejecutivo';
export type SeniorityLevel = 'junior' | 'mid' | 'senior';

export interface ScoringInput {
  country: Country;
  role: RoleCategory;
  seniority: SeniorityLevel;
}

export interface VariableScore {
  id: 'v1' | 'v2' | 'v3' | 'v4' | 'v5';
  name: string;
  rawValue: string;
  score: number;
  weight: number;
  weightedScore: number;
  source: string;
  interpretation: string;
}

export interface IDCResult {
  totalScore: number;
  roundedScore: number;
  level: 'baja' | 'media' | 'alta';
  variables: VariableScore[];
  recommendation: string;
  serviceRoute: {
    name: string;
    description: string;
    priceRange: string;
  };
}

export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  country: Country;
  role: RoleCategory;
  seniority: SeniorityLevel;
  idcScore: number;
  idcLevel: string;
}
