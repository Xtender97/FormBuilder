import {
  ArrayPath,
  Control,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { Button } from '../../Button/Button';
import { Field } from './CreateFieldForm';

export interface IOptionsInputProps {
  control: Control<Field>;
  register: UseFormRegister<Field>;
  name: ArrayPath<Field>;
}

export function OptionsInput({ control, name, register }: IOptionsInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <div className="vertical-flex gap-10">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-5 w-100">
              <input
                className="input flex-grow"
                {...register(`options.${index}.label`)}
                placeholder="Label"
              />
              <input
                className="input flex-grow"
                {...register(`options.${index}.value`)}
                placeholder="Value"
              />
              <Button onClick={() => remove(index)} label="X" />
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          append({ label: '', value: '' });
        }}
        label="Add Option"
      />
    </>
  );
}
