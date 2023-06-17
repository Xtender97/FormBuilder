import { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './JsonInput.scss';
import { Field, schema } from '../../types/form.types';
import { z } from 'zod';

export interface IJsonInputProps {
  onLoaded: (json: Field[]) => void;
}

export function JsonInput({ onLoaded }: IJsonInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="json-input vertical-flex gap-10 ">
      <input
        ref={ref}
        type="file"
        className="input"
        accept=".json"
        onChange={(e) => {
          setError(null);
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            try {
              const json = JSON.parse(reader.result as string);
              const fieldArray = z.array(schema).parse(json);
              onLoaded(fieldArray);
            } catch (error) {
              if (error instanceof z.ZodError) {
                setError(error.message);
              }
            }
          };
          reader.readAsText(file);

          if (ref.current) ref.current.value = '';
        }}
      />
      <Button label="Upload" onClick={() => ref.current?.click()} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
