import './Button.scss';
import cls from 'classnames';

export interface IButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
}

export function Button({ onClick, label, className }: IButtonProps) {
  return (
    <button className={cls('button', className)} onClick={() => onClick?.()}>
      {label}
    </button>
  );
}
