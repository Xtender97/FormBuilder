import { ChangeEvent } from '../../../types/global.types';
import { Field, FieldType } from '../../../types/form.types';
import './DynamicInput.scss';
export interface IDynamicInputProps {
  register: (
    name: string,
    type: FieldType
  ) => {
    onChange: (e: ChangeEvent) => void;
  };
  field: Field;
  error: string | undefined;
}

export function DynamicInput({ register, field, error }: IDynamicInputProps) {
  const renderInput = (type: typeof field.type) => {
    switch (type) {
      case 'text':
        return (
          <input
            id={field.name}
            className="input"
            {...register(field.name, field.type)}
          />
        );
      case 'number':
        return (
          <input
            id={field.name}
            className="input"
            {...register(field.name, field.type)}
            type="number"
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            className="input"
            defaultValue={''}
            {...register(field.name, field.type)}
          >
            <option value="" disabled>
              Select your option
            </option>
            {field.options?.map((option) => {
              const id = field.id + option.value;

              return (
                <option value={option.value} key={id}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );

      case 'radio':
        return (
          <div className="flex gap-10">
            {field.options?.map((option) => {
              const id = field.id + option.value;
              return (
                <label
                  key={id}
                  htmlFor={id}
                  className="flex gap-5 align-center"
                >
                  <input
                    id={id}
                    name={field.name}
                    type="radio"
                    value={option.value}
                    {...register(field.name, field.type)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex gap-10">
            {field.options?.map((option) => {
              const id = field.id + option.value;

              return (
                <label
                  key={id}
                  htmlFor={id}
                  className="flex gap-5 align-center"
                >
                  <input
                    name={field.name}
                    id={id}
                    type="checkbox"
                    value={option.value}
                    {...register(field.name, field.type)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="dynamic-input vertical-flex gap-10">
      <label className="label" htmlFor={field.name}>
        {field.name} {field.required && '*'}
      </label>
      {renderInput(field.type)}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
