import { ButtonHTMLAttributes } from 'react';
import { Link } from '@tanstack/react-router';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'post'
    | 'navigationActive'
    | 'navigationInactive';
}

export const Button = ({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer';
  const variantStyles = {
    primary:
      'rounded-full w-full bg-primary text-white filter hover:brightness-125 py-3 text-lg shadow-xs',
    secondary:
      'rounded-full w-full bg-transparent text-white outline outline-1 outline-secondary-400',
    post: 'rounded-full w-full bg-primary text-white',
    navigationActive:
      '!font-bold rounded-none px-6 py-2 border-b-[3px] border-b-primary bg-transparent text-primary',
    navigationInactive:
      '!font-bold rounded-none px-6 py-2 border-b border-b-secondary-400/20 bg-transparent text-secondary-400 hover:text-primary',
  };
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
