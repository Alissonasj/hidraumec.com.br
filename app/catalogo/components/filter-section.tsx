import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { CaretDownIcon } from '@phosphor-icons/react';

export function FilterSection({
  title,
  options,
  selected,
  onToggle,
  defaultOpen
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className='group uppercase flex w-full justify-between place-items-center'>
        <div>{title}</div>
        <CaretDownIcon className='transition-transform duration-200 group-data-panel-open:rotate-180' />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <FieldSet className='space-y-3 border-0 p-0'>
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
      </CollapsibleContent>
    </Collapsible>
  );
}
