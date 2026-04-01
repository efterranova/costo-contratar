export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-background/60 to-background" />

      <div className="relative container mx-auto px-4 md:px-6 pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="stagger-1 inline-flex items-center gap-2 rounded-full bg-white border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9373] animate-pulse" />
            Datos Q2 2026 &middot; Fuentes publicas verificables
          </div>

          <h1 className="stagger-2 text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-4">
            Que tan dificil sera
            <br />
            <span className="text-[var(--color-brand)]">cubrir tu vacante</span>?
          </h1>

          <p className="stagger-3 text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Ingresa el puesto que buscas, selecciona pais, categoria y experiencia. Nuestro indice analiza <strong className="text-foreground">5 variables del mercado laboral</strong> y la IA te da un diagnostico personalizado.
          </p>
        </div>
      </div>
    </section>
  );
}
