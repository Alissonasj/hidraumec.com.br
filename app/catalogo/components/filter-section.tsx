import { Checkbox } from '@/components/ui/checkbox';

export function FilterSection({
  title,
  options,
  selected,
  onToggle
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <fieldset className='space-y-3 border-0 p-0'>
      <legend className='mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700'>
        {title}
      </legend>
      {options.map((option) => (
        <label
          key={option}
          className='flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition-colors hover:text-red-700'
        >
          <Checkbox
            checked={selected.includes(option)}
            onCheckedChange={() => onToggle(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </fieldset>
  );
}
