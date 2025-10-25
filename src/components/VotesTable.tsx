import type { CongresistaRecord } from "@/hooks/useVotos";
import { VoteBadge } from "./VoteBadge";

interface VotesTableProps {
  records: CongresistaRecord[];
  leyes: string[];
}

export function VotesTable({ records, leyes }: VotesTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-glow">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm lg:text-base">
          <thead className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wide text-slate-400 lg:text-sm">
                Congresista
              </th>
              {leyes.map((ley) => (
                <th
                  key={ley}
                  className="p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  {ley}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(({ nombre, votos }) => (
              <tr key={nombre} className="border-t border-white/5 transition-colors hover:bg-white/5">
                <th scope="row" className="max-w-[240px] p-4 text-sm font-semibold text-slate-50">
                  {nombre}
                </th>
                {leyes.map((ley) => (
                  <td key={`${nombre}-${ley}`} className="p-4 text-center">
                    <VoteBadge value={votos[ley] ?? "Sin dato"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
