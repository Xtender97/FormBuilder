import { useState } from 'react';
import {
  Field,
  FieldType,
} from './FormBuilder/CreateFieldForm/CreateFieldForm';
import { ChangeEvent } from '../types/global.types';
import { DynamicInput } from './DynamicInput';
import { Button } from './Button/Button';

export interface IDynamicFormProps {
  formFields: Field[];
}

export function DynamicForm({ formFields }: IDynamicFormProps) {
  const [formValues, setFormValues] = useState<
    Record<string, string | string[] | number | undefined>
  >({});

  const register = (field: string, type: FieldType) => {
    return {
      onChange: (e: ChangeEvent) => {
        if (type === 'checkbox') {
          const checkBoxEvent = e as React.ChangeEvent<HTMLInputElement>;

          if (checkBoxEvent.target.checked) {
            setFormValues({
              ...formValues,
              [field]: [
                ...((formValues[field] ? formValues[field] : []) as string[]),
                checkBoxEvent.target.value,
              ],
            });
          } else {
            setFormValues({
              ...formValues,
              [field]: (formValues[field] as string[])?.filter(
                (value) => value !== checkBoxEvent.target.value
              ),
            });
          }
        } else {
          setFormValues({ ...formValues, [field]: e.target.value });
        }
      },
    };
  };

  return (
    <div className="vertical-flex gap-10">
      <h3>Dynamic Form</h3>
      <form
        className="vertical-flex gap-10"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(formValues);
        }}
      >
        {formFields.map((field) => {
          return (
            <DynamicInput register={register} field={field} key={field.id} />
          );
        })}

        <Button type="submit" label="Submit" className="submit-button" />
      </form>
    </div>
  );
}
