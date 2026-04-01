import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/erecruit-color.png"
            alt="erecruit"
            width={120}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/metodologia"
            className="rounded-lg px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Metodologia
          </Link>
          <a
            href="https://erecruit.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-primary hover:bg-primary/5 transition-all"
          >
            erecruit.ca
          </a>
        </nav>
      </div>
    </header>
  );
}
