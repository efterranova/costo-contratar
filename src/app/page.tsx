import { HeroSection } from '@/components/hero-section';
import { IDCCalculator } from '@/components/idc-calculator';

function HowItWorks() {
  return (
    <section className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Como funciona el IDC</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { n: '1', title: 'Selecciona', desc: 'Elige pais, tipo de rol y nivel de experiencia que buscas cubrir.' },
              { n: '2', title: 'Analisis automatico', desc: '5 variables del mercado laboral se cruzan con datos reales y fuentes publicas.' },
              { n: '3', title: 'Resultado + IA', desc: 'Obtienes un score, desglose detallado y analisis personalizado por inteligencia artificial.' },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-white text-xs font-bold mb-3">
                  {step.n}
                </div>
                <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              { label: 'Datos verificables', sub: 'Cada variable tiene fuente publica' },
              { label: 'Resultado inmediato', sub: 'Score y analisis en segundos' },
            ].map((t) => (
              <div key={t.label} className="py-3">
                <p className="text-[12px] font-semibold mb-0.5">{t.label}</p>
                <p className="text-[11px] text-muted-foreground">{t.sub}</p>
              </div>
            ))}
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
      <IDCCalculator />
      <HowItWorks />
    </>
  );
}
