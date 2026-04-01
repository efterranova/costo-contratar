import { HeroSection } from '@/components/hero-section';
import { IDCCalculator } from '@/components/idc-calculator';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Selecciona tu busqueda',
      description: 'Elige el pais, la categoria del rol y el nivel de experiencia que necesitas cubrir.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Analisis automatico',
      description: 'Nuestro modelo cruza 5 variables con datos reales de fuentes publicas como ManpowerGroup, ILOSTAT y guias salariales.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Score + interpretacion IA',
      description: 'Recibe un score de 1 a 10, el desglose de cada variable y un analisis personalizado generado por inteligencia artificial.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Como funciona
          </h2>
          <p className="text-muted-foreground text-[15px] max-w-lg mx-auto">
            En tres pasos obtienes un diagnostico completo de la dificultad de tu contratacion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              <div className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:border-indigo-200/60 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-indigo-400">{step.number}</span>
                </div>
                <h3 className="font-heading font-semibold text-[15px] mb-2">{step.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-heading font-semibold text-[14px] mb-1">Datos verificables</h4>
              <p className="text-[12px] text-muted-foreground">Cada variable tiene una fuente publica que puedes consultar</p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-heading font-semibold text-[14px] mb-1">Resultado inmediato</h4>
              <p className="text-[12px] text-muted-foreground">Obtienes tu score al instante, sin registro previo</p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mx-auto mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="font-heading font-semibold text-[14px] mb-1">Metodologia abierta</h4>
              <p className="text-[12px] text-muted-foreground">Formula, pesos y limitaciones publicados con total transparencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TrustSection />
      <IDCCalculator />
    </>
  );
}
