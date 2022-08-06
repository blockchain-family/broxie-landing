import { useMemo } from 'react';

const Button = ({
  variant,
  children,
  onClick,
}: {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
}) => {
  const bgClass = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'bg-primaryBg hover:bg-hoverBg hover:text-hover';
      case 'secondary':
        return 'bg-secondaryBg hover:bg-hoverBg hover:text-hover';
      case 'tertiary':
        return 'bg-transparent border border-hoverBg hover:bg-hoverBg hover:text-hover';
      default:
        return undefined;
    }
  }, [variant]);

  return (
    <button
      className={`px-3 py-2 sm:px-8 sm:py-4 text-base rounded-2xl ${bgClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
