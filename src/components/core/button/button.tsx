import { useMemo } from 'react';

const Button = ({
  variant,
  children,
  onClick,
}: {
  variant: 'primary';
  children?: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
}) => {
  const bgClass = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'bg-primaryBg';
      default:
        return undefined;
    }
  }, [variant]);

  return (
    <button
      className={`px-3 py-2 md:px-8 md:py-4 text-base rounded-2xl ${bgClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
