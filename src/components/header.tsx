import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/erecruit-color.png"
            alt="erecruit"
            width={110}
            height={28}
            className="h-6 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-0.5">
          <Link
            href="/metodologia"
            className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            Metodologia
          </Link>
          <a
            href="https://erecruit.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[var(--color-brand)] hover:bg-brand-50 transition-all"
          >
            erecruit.ca &rarr;
          </a>
        </nav>
      </div>
    </header>
  );
}
