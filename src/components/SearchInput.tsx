import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchInput({ value, onChange, className }: SearchInputProps) {
  return (
    <label className={cn("group relative block", className)}>
      <span className="sr-only">Buscar congresista</span>
      <Search className="pointer-events-none absolute inset-y-0 left-4 my-auto h-5 w-5 text-slate-400 transition group-focus-within:text-primary" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar congresista por nombre..."
        className="pl-12"
      />
    </label>
  );
}

