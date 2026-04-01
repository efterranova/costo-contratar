import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-500/20 group-hover:shadow-md group-hover:shadow-indigo-500/30 transition-shadow">
            <span className="text-white font-bold text-xs leading-none">e</span>
          </div>
          <span className="font-heading font-semibold text-[15px] tracking-tight text-foreground">
            erecruit
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/metodologia"
            className="rounded-lg px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Metodologia
          </Link>
          <a
            href="https://erecruit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-primary hover:bg-primary/5 transition-all"
          >
            erecruit.com
          </a>
        </nav>
      </div>
    </header>
  );
}
