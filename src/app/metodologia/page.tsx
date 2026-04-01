import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metodología — IDC | erecruit',
  description: 'Conoce las fuentes, fórmula y limitaciones del Índice de Dificultad de Contratación.',
};

const sources = [
  {
    name: 'ManpowerGroup MEOS Q2 2026',
    provides: 'Net Employment Outlook (NEO) por país, sector y tamaño de empresa. Publicación trimestral, 42 países.',
    format: 'PDF descargable, infografías. Gratuito.',
    url: 'go.manpowergroup.com/meos',
    variable: 'V1',
  },
  {
    name: 'Computrabajo Market Research 2026',
    provides: 'Demanda por tipo de perfil, prioridades de RRHH, datos de candidatos LATAM. Basado en 1,200+ profesionales de RRHH y 7,800+ candidatos.',
    format: 'Blog público + PDF descargable. Gratuito.',
    url: 'blog-empresas.computrabajo.com',
    variable: 'V2',
  },
  {
    name: 'Interfell Smart Hiring 2026',
    provides: 'Rangos salariales tech por país, rol y seniority. Tiers de países.',
    format: 'PDF descargable con registro. Gratuito.',
    url: 'interfell.com/guia-salarial',
    variable: 'V3',
  },
  {
    name: 'Hays Salary Guide 2026',
    provides: 'Salarios por rol y país (México, Colombia, Chile, Brasil). Indicador de resiliencia IA.',
    format: 'Web interactiva + PDF. Gratuito.',
    url: 'salaryguide-americas.hays.com',
    variable: 'V3',
  },
  {
    name: 'ILOSTAT (OIT)',
    provides: 'Tasas de desempleo, informalidad, participación laboral por país. Series históricas.',
    format: 'Dataset descargable (CSV, Excel, API). Gratuito.',
    url: 'ilostat.ilo.org/data',
    variable: 'V5',
  },
  {
    name: 'Banco Mundial — Datos abiertos',
    provides: 'Indicadores laborales, PIB, educación, informalidad por país.',
    format: 'Dataset descargable (CSV, API). Gratuito.',
    url: 'datos.bancomundial.org',
    variable: 'V5',
  },
  {
    name: 'Bloomberg Línea',
    provides: 'Análisis de tendencias de empleo LATAM, nearshoring, datos de ManpowerGroup.',
    format: 'Artículos públicos. Gratuito.',
    url: 'bloomberglinea.com',
    variable: 'V4',
  },
  {
    name: 'OIT Panorama Laboral 2025',
    provides: 'Informe anual: empleo, salarios, perspectivas LATAM. Datos comparativos.',
    format: 'PDF descargable. Gratuito.',
    url: 'ilo.org',
    variable: 'V5',
  },
];

export default function MetodologiaPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Metodología</h1>
      <p className="text-muted-foreground mb-10">
        Cómo calculamos el Índice de Dificultad de Contratación
      </p>

      {/* Formula */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Fórmula</h2>
        <div className="rounded-xl bg-muted/50 border border-border p-6 font-mono text-sm">
          <p className="mb-4">IDC = (V1 &times; 0.25) + (V2 &times; 0.25) + (V3 &times; 0.20) + (V4 &times; 0.15) + (V5 &times; 0.15)</p>
          <p className="text-muted-foreground text-xs">
            El IDC es un promedio ponderado de 5 variables, cada una convertida a escala 1-10.
          </p>
        </div>
      </section>

      {/* Variables */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Variables del modelo</h2>
        <div className="space-y-4">
          {[
            { id: 'V1', name: '¿Cuántas empresas están contratando?', weight: '25%', desc: 'Mide cuántas empresas planean aumentar contrataciones en cada país. Si muchas empresas están contratando al mismo tiempo, hay más competencia por los candidatos disponibles.' },
            { id: 'V2', name: '¿Cuántas buscan el mismo perfil?', weight: '25%', desc: 'Mide qué porcentaje de la demanda total se concentra en cada tipo de perfil. Si muchas empresas buscan el mismo perfil que tú, será más difícil encontrar candidatos. Los perfiles ejecutivos reciben score alto porque hay muy pocos candidatos disponibles.' },
            { id: 'V3', name: '¿Qué tan competitivos son los salarios?', weight: '20%', desc: 'Analiza qué tan dispersos son los salarios del mercado para este perfil. Si la diferencia entre lo mínimo y lo máximo que se paga es muy grande, significa que las empresas están compitiendo agresivamente con dinero. También se considera si el perfil recibe ofertas en dólares de empresas internacionales.' },
            { id: 'V4', name: '¿Compites con empresas extranjeras?', weight: '15%', desc: 'Evalúa si empresas de Estados Unidos, Europa u otros países contratan activamente estos perfiles en tu región, ofreciendo trabajo remoto y salarios en dólares. Esto es especialmente fuerte en tecnología y roles digitales, y en países como México y Colombia.' },
            { id: 'V5', name: '¿Qué tan difícil es encontrar talento formal?', weight: '15%', desc: 'Se basa en la tasa de informalidad laboral del país. En países donde mucha gente trabaja de manera informal, es más difícil encontrar candidatos con experiencia laboral formal y verificable.' },
          ].map((v) => (
            <div key={v.id} className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400 px-2 py-0.5 rounded">
                  {v.id}
                </span>
                <span className="font-medium">{v.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">Peso: {v.weight}</span>
              </div>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weights justification */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Justificación de los pesos</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          V1 y V2 reciben el mayor peso (25% cada una) porque son las variables más directamente
          relacionadas con la dificultad percibida por el empleador: cuántas empresas están compitiendo
          por contratar y cuántas buscan el mismo tipo de perfil. V3 recibe 20% porque la competencia
          salarial determina si el empleador puede competir con su presupuesto. V4 y V5 reciben 15%
          cada una porque son factores estructurales que condicionan pero no determinan la dificultad directa.
        </p>
      </section>

      {/* Output */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Interpretación del score</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 pr-4">Score</th>
                <th className="text-left py-3 pr-4">Nivel</th>
                <th className="text-left py-3">Recomendación</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    1–3
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium">Baja dificultad</td>
                <td className="py-3 text-muted-foreground">Alta disponibilidad de candidatos. Proceso ágil con buena descripción de vacante.</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-amber-600">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    4–6
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium">Dificultad media</td>
                <td className="py-3 text-muted-foreground">Competencia significativa. Necesita diferenciarse con propuesta de valor clara.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    7–10
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium">Alta dificultad</td>
                <td className="py-3 text-muted-foreground">Alta competencia o escasez. Necesita búsqueda activa y evaluación especializada.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Catálogo de fuentes</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Todas las fuentes son públicas, gratuitas y verificables.
        </p>
        <div className="space-y-4">
          {sources.map((s) => (
            <div key={s.name} className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400 px-1.5 py-0.5 rounded">
                  {s.variable}
                </span>
                <span className="text-sm font-medium">{s.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.provides}</p>
              <p className="text-xs text-muted-foreground/60">{s.format}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Update frequency */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Frecuencia de actualización</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong>V1</strong> (ManpowerGroup MEOS): Trimestral — marzo, junio, septiembre, diciembre</li>
          <li><strong>V2</strong> (Computrabajo): Anual — publicación entre enero y febrero</li>
          <li><strong>V3</strong> (Guías salariales): Anual — publicación entre enero y marzo</li>
          <li><strong>V4</strong> (Nearshoring): Semestral — actualización cualitativa</li>
          <li><strong>V5</strong> (ILOSTAT / Banco Mundial): Anual — datos con rezago de 6-12 meses</li>
        </ul>
      </section>

      {/* Limitations */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Limitaciones</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>El score es un indicador relativo de dificultad, no una predicción absoluta. Un score de 7 no significa que sea imposible contratar, significa que requiere más esfuerzo.</li>
          <li>Los datos se actualizan trimestralmente. El mercado puede cambiar más rápido en circunstancias excepcionales.</li>
          <li>El modelo usa proxies, no datos directos de tiempo de cobertura. No existe fuente pública con esa granularidad.</li>
          <li>La categoría de rol es genérica. Especialidades específicas dentro de una categoría pueden variar.</li>
          <li>Los datos de nearshoring (V4) son cualitativos y se basan en análisis de tendencias.</li>
        </ul>
      </section>

      {/* What IDC is NOT */}
      <section className="rounded-xl bg-muted/30 border border-border p-6">
        <h2 className="text-xl font-semibold mb-4">Lo que el IDC NO es</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong>No es una predicción de tiempo de cobertura en días.</strong> No existen fuentes abiertas para respaldar ese dato.</li>
          <li><strong>No es un benchmark salarial.</strong> Ya existen herramientas mejores para eso.</li>
          <li><strong>No usa datos inventados.</strong> Cada variable tiene una fuente pública verificable.</li>
        </ul>
      </section>
    </div>
  );
}
