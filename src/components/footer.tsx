export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold text-xs">e</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Powered by <span className="font-medium text-foreground">erecruit</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Datos actualizados: Q2 2026. El IDC es un indicador relativo basado en fuentes públicas verificables.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="/metodologia" className="hover:text-foreground transition-colors">
              Metodología y fuentes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
