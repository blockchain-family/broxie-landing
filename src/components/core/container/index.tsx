import { useMemo } from 'react';

type ContainerProps = {
  size: 'sm';
  className?: string;
  children?: any;
};

const Container = ({ children, className, size }: ContainerProps) => {
  const maxWidthClass = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'sm:max-w-[40rem]';
    }
  }, [size]);

  return (
    <div
      className={`max-w-[25rem] ${maxWidthClass} px-4 w-full mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
