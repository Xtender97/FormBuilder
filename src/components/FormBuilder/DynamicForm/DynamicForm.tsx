import { useState } from 'react';
import { Field, FieldType } from '../../../types/form.types';
import { ChangeEvent } from '../../../types/global.types';
import { DynamicInput } from './DynamicInput';
import { Button } from '../../Button/Button';
import { FormErrors, FormValues } from '../../../types/form.types';

export interface IDynamicFormProps {
  formFields: Field[];
  onSubmit: (data: FormValues) => void;
}

export function DynamicForm({ formFields, onSubmit }: IDynamicFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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

  const validateInputs = () => {
    setFormErrors({});

    const requiredFields = formFields.filter((field) => field.required);

    const requiredFieldsValues = requiredFields.map(
      (field) => formValues[field.name]
    );

    const errors = requiredFieldsValues.reduce((acc, value, index) => {
      if (
        (Array.isArray(value) && value.length === 0) ||
        (!Array.isArray(value) && !value && value !== 0)
      ) {
        acc[requiredFields[index].id] = 'Required field!';
        return acc;
      }

      return acc;
    }, {} as FormErrors);

    setFormErrors((prev) => ({ ...prev, ...errors }));

    return Object.keys(errors).length === 0;
  };

  const onSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    onSubmit(formValues);
  };

  return (
    <div className="vertical-flex gap-10">
      <h3>Dynamic Form</h3>
      <form className="vertical-flex gap-10" onSubmit={onSubmitEvent}>
        {formFields.map((field) => {
          return (
            <DynamicInput
              register={register}
              field={field}
              key={field.id}
              error={formErrors[field.id]}
            />
          );
        })}

        {formFields.length > 0 && (
          <Button type="submit" label="Submit" className="submit-button" />
        )}
      </form>
    </div>
  );
}
