interface VoteSummaryProps {
  items: Array<{ status: string; count: number }>;
}

export function VoteSummary({ items }: VoteSummaryProps) {
  if (items.length === 0) return null;

  return (
    <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {items.map(({ status, count }) => (
        <div
          key={status}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left shadow-inner shadow-white/5"
        >
          <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">{status}</dt>
          <dd className="mt-1 text-2xl font-bold text-slate-50">{count}</dd>
        </div>
      ))}
    </dl>
  );
}

