import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field';

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
    <FieldSet className='space-y-3 border-0 p-0'>
      <FieldLegend className='mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700'>
        {title}
      </FieldLegend>
      <FieldGroup className='gap-3'>
        {options.map((option) => (
          <Field
            key={option}
            orientation='horizontal'
          >
            <FieldLabel className='cursor-pointer text-sm text-slate-600 transition-colors hover:text-red-700'>
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <span>{option}</span>
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
