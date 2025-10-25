import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useVotos } from "@/hooks/useVotos";
import { SearchInput } from "@/components/SearchInput";
import { VoteSummary } from "@/components/VoteSummary";
import { VotesTable } from "@/components/VotesTable";

const statusOrder = ["Favor", "Contra", "Abstencion", "Ausente", "Sin voto"];

export default function App() {
  const { records, leyes, isLoading, error } = useVotos();
  const [query, setQuery] = useState("");

  const filteredRecords = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return records;
    return records.filter(({ nombre }) => nombre.toLowerCase().includes(term));
  }, [records, query]);

  const resumen = useMemo(() => {
    const counters = new Map<string, number>();
    filteredRecords.forEach(({ votos }) => {
      Object.values(votos).forEach((value) => {
        const key = typeof value === "string" ? value : String(value);
        counters.set(key, (counters.get(key) ?? 0) + 1);
      });
    });

    return statusOrder
      .filter((status) => counters.has(status))
      .map((status) => ({ status, count: counters.get(status)! }));
  }, [filteredRecords]);

  return (
    <div className="gradient-spotlight min-h-screen">
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-50">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
              CV
            </span>
            Congreso Visible
          </Link>
          <a
            href="https://www.congreso.gob.pe/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
          >
            <span aria-hidden="true">↗</span>
            Portal del Congreso
          </a>
        </div>
      </nav>

      <main className="relative isolate flex flex-col">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center">
          <div className="h-[480px] w-[720px] rounded-full bg-gradient-to-br from-primary/40 via-indigo-500/30 to-sky-400/20 blur-3xl" />
        </div>
        <header className="px-6 pb-10 pt-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <span aria-hidden="true">🗳️</span> Transparencia ciudadana
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Observatorio de votaciones del Congreso peruano
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 md:text-xl">
              Explora cómo votaron las y los congresistas en las leyes más recientes. Usa el buscador para
              encontrar rápidamente a tu representante y descubre sus posiciones.
            </p>
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="w-full md:max-w-xl">
                <SearchInput value={query} onChange={setQuery} />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1 font-medium">
                  {filteredRecords.length} congresistas
                </span>
                {query && <span className="text-slate-400">Filtrando por “{query}”</span>}
              </div>
            </div>
            <VoteSummary items={resumen} />
          </div>
        </header>

        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-20 text-center text-slate-300">
                <span className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white/70" />
                <p>Cargando datos de votación...</p>
              </div>
            )}
            {error && (
              <div className="rounded-3xl border border-rose-500/50 bg-rose-500/10 px-6 py-8 text-center text-rose-100">
                {error}
              </div>
            )}
            {!isLoading && !error && (
              <>
                {filteredRecords.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-24 text-center text-slate-300">
                    No encontramos congresistas que coincidan con “{query}”. Intenta con otro nombre.
                  </div>
                ) : (
                  <VotesTable records={filteredRecords} leyes={leyes} />
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
