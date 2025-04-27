interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onSubmit?: () => void;
  className?: string;
}
export const Button = ({
  className,
  children,
  onClick,
  onSubmit,
}: ButtonProps) => {
  return (
    <button onClick={onClick} onSubmit={onSubmit} className={className}>
      {children}
    </button>
  );
};
