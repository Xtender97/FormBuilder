import { useForm } from 'react-hook-form';
import { SetState } from '../../../types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../Button/Button';
import { OptionsInput } from './OptionsInput';
import { Field, schema } from '../../../types/form.types';

export interface ICreateFieldFormProps {
  setFormFields: SetState<Field[]>;
}

export function CreateFieldForm({ setFormFields }: ICreateFieldFormProps) {
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
      type: 'text',
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
        {errors['name'] && (
          <span className="error">{errors['name'].message}</span>
        )}
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
        {errors['type'] && (
          <span className="error">{errors['type'].message}</span>
        )}
        {hasOptions && (
          <>
            <label htmlFor="options" className="vertical-flex gap-5 label">
              Options
              <OptionsInput
                control={control}
                name="options"
                register={register}
              />
            </label>
            {errors['options'] && (
              <span className="error">{errors['options'].message}</span>
            )}
          </>
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
