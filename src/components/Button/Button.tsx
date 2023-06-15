import './Button.scss';
import cls from 'classnames';

export interface IButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({
  onClick,
  label,
  className,
  type = 'button',
}: IButtonProps) {
  return (
    <button
      type={type}
      className={cls('button', className)}
      onClick={() => onClick?.()}
    >
      {label}
    </button>
  );
}
