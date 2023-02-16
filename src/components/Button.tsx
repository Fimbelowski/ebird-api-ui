export default function Button({
  disabled = false,
  label,
  onClick,
  type,
}: {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}) {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
