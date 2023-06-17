import { z } from 'zod';

const fieldTypes = ['text', 'number', 'select', 'radio', 'checkbox'] as const;

export type FieldType = (typeof fieldTypes)[number];

export const schema = z
  .object({
    id: z.string().default(''),
    name: z.string().min(1),
    type: z.enum(fieldTypes),
    required: z.boolean(),
    options: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .optional(),
  })
  .transform((data) => {
    return {
      ...data,
      id: Math.random().toString(36).substring(7),
    };
  })
  .refine(
    (data) => {
      const shouldHaveOptions = ['select', 'radio', 'checkbox'].includes(
        data.type
      );
      if (shouldHaveOptions && data.options?.length === 0) {
        return false;
      }

      return true;
    },
    { message: 'Options are required for this field type!', path: ['options'] }
  )
  .refine(
    (data) => {
      const shouldHaveOptions = ['select', 'radio', 'checkbox'].includes(
        data.type
      );
      if (shouldHaveOptions && data.options?.length) {
        const values = data.options.map((option) => option.value);
        const uniqueValues = new Set(values);
        if (values.length !== uniqueValues.size) {
          return false;
        }
      }

      return true;
    },
    { message: 'Options must have unique values!', path: ['options'] }
  );

export type Field = z.infer<typeof schema>;

export type FormValues = Record<string, string | string[] | number | undefined>;

export type FormErrors = Record<string, string | undefined>;
