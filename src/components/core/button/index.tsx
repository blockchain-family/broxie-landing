import React, { useMemo } from 'react';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  size?: 'sm' | 'lg' | 'base';
  roundedFull?: boolean | undefined;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { variant, size, roundedFull, className, ...domProps } = props;

    const btnClass = useMemo(() => {
      switch (variant) {
        case 'primary':
          return 'bg-primaryBg';
        case 'secondary':
          return 'bg-primary/20';
        case 'tertiary':
          return 'bg-primary text-black';
        default:
          return undefined;
      }
    }, [variant]);

    const btnSizeClass = useMemo(() => {
      switch (size) {
        case 'sm':
          return 'h-10 px-2 sm:px-5' + (roundedFull === true ? ' w-10' : '');
        case 'lg':
          return 'h-14 px-6' + (roundedFull === true ? ' w-14' : '');
        default:
          return (
            'h-10 sm:h-14 px-2 sm:px-6' +
            (roundedFull === true ? ' w-10 sm:w-14' : '')
          );
      }
    }, [roundedFull, size]);

    const btnRadiusClass = useMemo(
      () => (roundedFull === true ? 'rounded-full' : 'rounded-2xl'),
      [roundedFull]
    );

    return (
      <button
        {...domProps}
        className={
          'flex items-center justify-center text-base disabled:opacity-50 ' +
          `${btnRadiusClass} ${btnSizeClass} ${btnClass} ${className ?? ''}`
        }
        ref={ref}
      />
    );
  }
);

export default Button;
