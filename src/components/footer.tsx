import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-[10px] leading-none">e</span>
              </div>
              <span className="font-heading font-semibold text-sm">erecruit</span>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Plataforma de contratacion para Latinoamerica. Conectamos empleadores con el talento que necesitan.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3">Herramienta</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                Calculadora IDC
              </Link>
              <Link href="/metodologia" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                Metodologia y fuentes
              </Link>
            </div>
          </div>

          {/* Data */}
          <div>
            <h4 className="text-[13px] font-semibold mb-3">Datos</h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Ultima actualizacion: Q2 2026.
              <br />
              Fuentes: ManpowerGroup, Computrabajo, ILOSTAT, Interfell, Hays.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground/70">
            El IDC es un indicador relativo basado en fuentes publicas. No constituye una prediccion garantizada.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Powered by erecruit
          </p>
        </div>
      </div>
    </footer>
  );
}
