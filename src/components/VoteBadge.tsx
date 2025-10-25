import { cva, type VariantProps } from "class-variance-authority";
import type { VoteValue } from "@/hooks/useVotos";
import { cn } from "@/lib/utils";

const voteBadgeVariants = cva(
  "inline-flex min-w-[6.75rem] justify-center rounded-full border px-3 py-1 text-sm font-medium tracking-wide backdrop-blur transition",
  {
    variants: {
      intent: {
        favor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
        contra: "border-rose-500/40 bg-rose-500/10 text-rose-300",
        abstencion: "border-amber-500/40 bg-amber-500/10 text-amber-200",
        ausente: "border-indigo-500/45 bg-indigo-500/10 text-indigo-200",
        sinVoto: "border-slate-500/30 bg-slate-500/10 text-slate-200",
        otro: "border-slate-600/40 bg-slate-700/30 text-slate-100",
      },
    },
    defaultVariants: {
      intent: "otro",
    },
  },
);

type VoteIntent = NonNullable<VariantProps<typeof voteBadgeVariants>["intent"]>;

const intentMap: Record<string, VoteIntent> = {
  favor: "favor",
  contra: "contra",
  abstencion: "abstencion",
  ausente: "ausente",
  "sin voto": "sinVoto",
  "sin dato": "otro",
};

function resolveIntent(value: VoteValue): VoteIntent {
  const normalized = String(value).toLowerCase();
  return intentMap[normalized] ?? "otro";
}

interface VoteBadgeProps {
  value: VoteValue;
}

export function VoteBadge({ value }: VoteBadgeProps) {
  return <span className={cn(voteBadgeVariants({ intent: resolveIntent(value) }))}>{value}</span>;
}
