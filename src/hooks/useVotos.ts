import { useEffect, useMemo, useState } from "react";

export type VoteValue = "Favor" | "Contra" | "Abstencion" | "Sin voto" | "Ausente" | string;

export interface CongresistaRecord {
  nombre: string;
  votos: Record<string, VoteValue>;
}

interface UseVotosResult {
  records: CongresistaRecord[];
  leyes: string[];
  isLoading: boolean;
  error: string | null;
}

export type VotosDataset = "colchado" | "mef";

const datasetFiles: Record<VotosDataset, string> = {
  colchado: "/votos_colchado.json",
  mef: "/votos_mef.json",
};

export function useVotos(dataset: VotosDataset = "colchado"): UseVotosResult {
  const [records, setRecords] = useState<CongresistaRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);
    setRecords([]);

    fetch(datasetFiles[dataset])
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo de votos.");
        }
        return response.json() as Promise<Record<string, Record<string, VoteValue>>>;
      })
      .then((data) => {
        if (!active) return;
        const entries = Object.entries(data).map(([nombre, votos]) => ({
          nombre,
          votos,
        }));
        entries.sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
        setRecords(entries);
      })
      .catch((err: Error) => {
        if (!active) return;
        console.error(err);
        setError(err.message || "Error desconocido");
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dataset]);

  const leyes = useMemo(() => {
    if (records.length === 0) return [];
    const keys = new Set<string>();
    records.forEach((item) => {
      Object.keys(item.votos).forEach((ley) => keys.add(ley));
    });
    return Array.from(keys).sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  }, [records]);

  return { records, leyes, isLoading, error };
}
