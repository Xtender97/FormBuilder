import { useForm } from 'react-hook-form';
import { SetState } from '../../../types/global.types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../Button/Button';
import { OptionsInput } from './OptionsInput';

export interface ICreateFieldFormProps {
  setFormFields: SetState<Field[]>;
}

const fieldTypes = ['text', 'number', 'select', 'radio', 'checkbox'] as const;

const schema = z
  .object({
    id: z.string().default(''),
    name: z.string().min(1),
    type: z.enum(fieldTypes),
    required: z.boolean(),
    options: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .optional(),
  })
  .transform((data) => {
    return {
      ...data,
      id: Math.random().toString(36).substring(7),
    };
  });

export type Field = z.infer<typeof schema>;

export function CreateFieldForm({ setFormFields }: ICreateFieldFormProps) {
  const { register, handleSubmit, watch, control, reset } = useForm<Field>({
    resolver: zodResolver(schema),
    defaultValues: {
      options: [{ label: '', value: '' }],
    },
  });

  const type = watch('type');

  const hasOptions =
    type === 'select' || type === 'radio' || type === 'checkbox';

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          setFormFields((prev) => [...prev, data]);
          reset();
        })}
        className="vertical-flex gap-10"
      >
        <label htmlFor="name" className="vertical-flex gap-5 label">
          Field Name
          <input
            className="input"
            id="name"
            {...register('name')}
            placeholder="Field Name"
          />
        </label>
        <label htmlFor="name" className="vertical-flex gap-5 label">
          Field Type
          <select {...register('type')} className="input">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </label>

        {hasOptions && (
          <label htmlFor="options" className="vertical-flex gap-5 label">
            Options
            <OptionsInput
              control={control}
              name="options"
              register={register}
            />
          </label>
        )}

        <label htmlFor="required" className="flex gap-10 align-center label">
          Required
          <input id="required" type="checkbox" {...register('required')} />
        </label>
        <Button className="align-start" label="Add Field" type="submit" />
      </form>
    </div>
  );
}
