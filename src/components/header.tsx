import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">e</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">erecruit</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/metodologia"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Metodología
          </Link>
          <a
            href="https://erecruit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            erecruit.com
          </a>
        </nav>
      </div>
    </header>
  );
}
