import { ChangeEvent } from '../types/global.types';
import {
  Field,
  FieldType,
} from './FormBuilder/CreateFieldForm/CreateFieldForm';

export interface IDynamicInputProps {
  register: (
    name: string,
    type: FieldType
  ) => {
    // value: any;
    onChange: (e: ChangeEvent) => void;
  };
  field: Field;
}

export function DynamicInput({ register, field }: IDynamicInputProps) {
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
            {...register(field.name, field.type)}
          >
            {field.options?.map((option) => {
              return <option value={option.value}>{option.label}</option>;
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
    <div className="vertical-flex gap-10">
      <label className="label" htmlFor={field.name}>
        {field.name}
      </label>
      {renderInput(field.type)}
    </div>
  );
}
