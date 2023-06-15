import { SetState } from '../../../types/global.types';
import { Button } from '../../Button/Button';
import { Field } from '../CreateFieldForm/CreateFieldForm';

export interface IFormFieldsProps {
  formFields: Field[];
  setFormFields: SetState<Field[]>;
}

export function FormFields({ formFields, setFormFields }: IFormFieldsProps) {
  const remove = (field: Field) => {
    setFormFields(formFields.filter((f) => f.id !== field.id));
  };

  return (
    <div className="vertical-flex gap-20 form-fields">
      <h3>Form</h3>

      {formFields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex-between gap-10 card p-10 align-center"
          >
            {index + 1}. {field.name} {field.required && '*'}
            <div className="flex gap-10 align-center">
              {field.type}
              <Button label="X" onClick={() => remove(field)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
