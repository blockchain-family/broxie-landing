import { useMemo } from 'react';

const Button = ({
  variant,
  children,
  disabled,
  className,
  onClick,
}: {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: any;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const bgClass = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'bg-primaryBg';
      case 'secondary':
        return 'bg-secondaryBg';
      case 'tertiary':
        return 'bg-transparent border border-hoverBg';
      default:
        return undefined;
    }
  }, [variant]);

  return (
    <button
      className={`px-3 py-2 sm:px-8 sm:py-4 text-base rounded-2xl ${bgClass} disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
