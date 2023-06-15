import { useState } from 'react';
import { CreateFieldForm, Field } from './CreateFieldForm/CreateFieldForm';
import { FormFields } from './FormFields/FormFields';
import './FormBuilder.scss';
import { FormPreview } from './FormPreview/FormPreview';

export function FormBuilder() {
  const [formFields, setFormFields] = useState<Field[]>([]);

  return (
    <div className="form-builder flex gap-10 h-100">
      <div className="left-bar card p-20">
        <CreateFieldForm setFormFields={setFormFields} />
        <FormFields formFields={formFields} setFormFields={setFormFields} />
      </div>
      <div className="preview card p-20">
        <FormPreview formFields={formFields} />
      </div>

      <div className="right-bar card p-20">
        <pre>{JSON.stringify(formFields, null, 4)}</pre>
      </div>
    </div>
  );
}
