import { useState } from 'react';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { Field, FormValues } from '../../../types/form.types';
import './FormPreview.scss';

export interface IFormPreviewProps {
  formFields: Field[];
}

export function FormPreview({ formFields }: IFormPreviewProps) {
  const [formData, setFormData] = useState<FormValues>({});

  const isEmptyObject = (obj: FormValues) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div className="form-preview">
      <div className="form scroll-bars p-5">
        <DynamicForm formFields={formFields} onSubmit={setFormData} />
      </div>
      <div className="result vertical-flex gap-10 p-10 scroll-bars">
        <h3>Result</h3>

        {!isEmptyObject(formData) && (
          <pre className="code">{JSON.stringify(formData, null, 4)}</pre>
        )}
      </div>
    </div>
  );
}
