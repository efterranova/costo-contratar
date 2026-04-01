export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-blue-50/40 to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-indigo-200/30 via-blue-200/20 to-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-20 pb-8 md:pt-28 md:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 dark:bg-white/5 border border-indigo-200/60 dark:border-indigo-500/20 px-4 py-2 text-[13px] shadow-sm mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">Datos actualizados Q2 2026</span>
            <span className="text-muted-foreground/50">|</span>
            <span className="text-muted-foreground">Fuentes publicas verificables</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight leading-[1.1] text-foreground mb-6">
            Descubre que tan dificil sera{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                cubrir tu vacante
              </span>
              <svg className="absolute -bottom-1 left-0 w-full h-3 text-indigo-300/40" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M1 5.5C40 2 80 2 100 4.5C120 7 160 3 199 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Selecciona un pais, un tipo de rol y el nivel de experiencia. Nuestro indice analiza{' '}
            <strong className="text-foreground font-medium">5 variables del mercado laboral</strong>{' '}
            y te dice que tan complejo sera encontrar al candidato ideal.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {[
              { number: '6', label: 'Paises LATAM' },
              { number: '8', label: 'Categorias de rol' },
              { number: '144', label: 'Combinaciones analizadas' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <span className="text-xl font-heading font-bold text-indigo-600">{stat.number}</span>
                <span className="text-muted-foreground text-[13px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-12">
          <a href="#calculadora" className="flex flex-col items-center gap-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors group">
            <span className="text-xs">Calcular ahora</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
