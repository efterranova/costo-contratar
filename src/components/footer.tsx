import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <Image src="/erecruit-color.png" alt="erecruit" width={100} height={26} className="h-5 w-auto" />
            <a href="https://erecruit.ca/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">erecruit.ca</a>
          </div>
          <p className="text-[11px] text-muted-foreground/60">
            Datos Q2 2026 &middot; Fuentes publicas verificables
          </p>
        </div>
      </div>
    </footer>
  );
}
