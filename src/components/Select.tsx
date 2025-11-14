import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  value,
  items,
  onChange,
  error,
}: {
  label: string;
  name?: string;
  value: string;
  items: React.ReactElement[];
  onChange: (e: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="grid grid-cols-1">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="col-start-1 row-start-1 appearance-none block w-full cursor-default grid-cols-1 rounded-md bg-white mt-1 px-3 py-1.5 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
        >
          <option value="">Select a {label}</option>
          {items}
        </select>
        <ChevronDown className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-5" />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function SelectItem({ value, label }: { value: string; label: string }) {
  return <option value={value}>{label}</option>;
}
