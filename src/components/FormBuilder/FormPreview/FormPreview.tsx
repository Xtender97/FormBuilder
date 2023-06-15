import { DynamicForm } from '../../DynamicForm';
import { Field } from '../CreateFieldForm/CreateFieldForm';
import './FormPreview.scss';

export interface IFormPreviewProps {
  formFields: Field[];
}

export function FormPreview({ formFields }: IFormPreviewProps) {
  return (
    <div>
      <DynamicForm formFields={formFields} />
    </div>
  );
}
