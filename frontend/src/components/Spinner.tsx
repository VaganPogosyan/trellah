interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export default function Spinner({ size = "md", label }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <span
        className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeMap[size]}`}
        aria-hidden="true"
      />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
}
