'use client';

function renderMarkdown(text: string) {
  // Split into paragraphs
  return text.split('\n').filter(Boolean).map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    // Numbered list items: "1. text" or "- text"
    const listMatch = line.match(/^(\d+\.\s|-\s)(.*)/);
    if (listMatch) {
      return (
        <li key={i} className="text-[13px] leading-relaxed text-foreground/80 ml-4 list-disc">
          {rendered.slice(1)}
        </li>
      );
    }

    return (
      <p key={i} className="text-[13px] leading-relaxed text-foreground/80">
        {rendered}
      </p>
    );
  });
}

interface AIInterpretationProps {
  text?: string;
  loading?: boolean;
}

export function AIInterpretation({ text = '', loading = false }: AIInterpretationProps) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
        <div className="h-5 w-5 rounded-md bg-[var(--color-brand)] flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-[13px] font-semibold">Analisis personalizado por IA</h3>
      </div>

      <div className="p-5">
        {loading || !text ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[13px] text-[var(--color-brand)] font-medium">
              <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generando analisis personalizado...
            </div>
            <div className="space-y-2 animate-pulse">
              <div className="h-2.5 bg-muted rounded w-full" />
              <div className="h-2.5 bg-muted rounded w-11/12" />
              <div className="h-2.5 bg-muted rounded w-4/5" />
              <div className="h-2.5 bg-muted rounded w-full mt-3" />
              <div className="h-2.5 bg-muted rounded w-10/12" />
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {renderMarkdown(text)}
          </div>
        )}
      </div>
    </div>
  );
}
