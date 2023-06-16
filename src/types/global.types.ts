export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;
