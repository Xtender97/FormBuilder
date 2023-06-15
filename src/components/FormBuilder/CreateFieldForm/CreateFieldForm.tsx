import { useForm } from 'react-hook-form';
import { SetState } from '../../../types/global.types';
import { FormState } from '../FormBuilder';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../Button/Button';
import { OptionsInput } from './OptionsInput';

export interface ICreateFieldFormProps {
  formState: FormState[];
  setFormState: SetState<FormState[]>;
}

const fieldTypes = ['text', 'number', 'select', 'radio', 'checkbox'] as const;

type FieldTypes = (typeof fieldTypes)[number];

const schema = z.object({
  name: z.string().min(1),
  type: z.enum(fieldTypes),
  required: z.boolean(),
  options: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
});

export type Field = z.infer<typeof schema>;

export function CreateFieldForm({
  formState,
  setFormState,
}: ICreateFieldFormProps) {
  console.log('fomr state', formState);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Field>({
    resolver: zodResolver(schema),
    defaultValues: {
      options: [{ label: '', value: '' }],
    },
  });

  console.log(errors);

  const type = watch('type');

  const hasOptions =
    type === 'select' || type === 'radio' || type === 'checkbox';

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          setFormState((prev) => [...prev, data]);
          reset();
        })}
        className="vertical-flex gap-10 p-5"
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
        <Button className="align-start" label="Add Field" />
      </form>
    </div>
  );
}
