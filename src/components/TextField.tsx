export default function TextField({
  prefixText,
  label,
  value,
  name,
  span,
  onChange,
  error,
}: {
  prefixText?: string;
  label: string;
  value: string;
  name?: string;
  span?: number;
  onChange: (e: string) => void;
  error?: string;
}) {
  return (
    <div className={`col-span-6 sm:col-span-${span ?? 3}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div
        className={`${
          error && "outline-red-500"
        } flex rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
      >
        {prefixText && (
          <span className="mt-0.5 ps-3 py-1.5 text-base text-gray-500 sm:text-sm/6">
            {prefixText}
          </span>
        )}
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white mt-1 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6 border-none outline-none"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
