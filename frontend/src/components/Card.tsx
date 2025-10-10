interface CardProps {
  title: string;
}

export default function Card({ title }: CardProps) {
  return (
    <article className="rounded-lg bg-white p-3 last:mb-3 text-sm text-slate-700 shadow-sm transition hover:shadow-md">
      <p>{title}</p>
    </article>
  );
}
