import { useState } from 'react';
import './FormBuilder.scss';
import { CreateFieldForm } from './CreateFieldForm/CreateFieldForm';

export type FormState = {
  [key: string]: any;
};

export function FormBuilder() {
  const [formState, setFormState] = useState<FormState[]>([]);

  return (
    <div className="form-builder flex gap-10 h-100">
      <div className="side-bar card p-10">
        <CreateFieldForm formState={formState} setFormState={setFormState} />
      </div>
      <div className="preview card p-10">
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </div>
    </div>
  );
}
