export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-background/60 to-background" />

      <div className="relative container mx-auto px-4 md:px-6 pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Pill */}
          <div className="stagger-1 inline-flex items-center gap-2 rounded-full bg-white border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9373] animate-pulse" />
            Datos Q2 2026 &middot; Fuentes publicas
          </div>

          {/* Headline */}
          <h1 className="stagger-2 text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-4">
            Que tan dificil sera
            <br />
            <span className="text-[var(--color-brand)]">cubrir tu vacante</span>?
          </h1>

          {/* Sub */}
          <p className="stagger-3 text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            Selecciona pais, rol y experiencia. Nuestro indice cruza <strong className="text-foreground">5 variables</strong> del mercado laboral
            y te entrega un diagnostico basado en datos reales.
          </p>

          {/* Stats row */}
          <div className="stagger-4 flex items-center justify-center gap-6 md:gap-10 text-xs text-muted-foreground">
            {[
              { n: '6', l: 'Paises' },
              { n: '8', l: 'Roles' },
              { n: '144', l: 'Combinaciones' },
              { n: '5', l: 'Variables' },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-foreground tabular-nums">{s.n}</span>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
