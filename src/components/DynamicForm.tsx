import { Field } from './FormBuilder/CreateFieldForm/CreateFieldForm';

export interface IDynamicFormProps {
  formFields: Field[];
}

export function DynamicForm({ formFields }: IDynamicFormProps) {
  return (
    <div>
      <h3>Dynamic Form</h3>
    </div>
  );
}
