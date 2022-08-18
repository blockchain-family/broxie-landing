const ExternalLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string | undefined;
  children?: any;
}) => {
  return (
    <a
      href={href}
      className={`text-link ${className}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
};

export default ExternalLink;
