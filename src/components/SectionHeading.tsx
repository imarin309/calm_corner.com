interface SectionHeadingProps {
  id?: string;
  label?: string;
  title?: string;
}

/** title を省くと、小さなラベル自体を見出しとして扱う */
export default function SectionHeading({
  id,
  label,
  title,
}: SectionHeadingProps) {
  if (!title) {
    return (
      <h2
        id={id}
        className="mb-(--space-sm) font-hand text-sm tracking-wider text-accent"
      >
        {label}
      </h2>
    );
  }

  return (
    <div className="mb-(--space-md)">
      {label && (
        <p className="font-hand text-xs tracking-wider text-accent">{label}</p>
      )}
      <h2 id={id} className="mt-1 text-xl font-bold text-ink">
        {title}
      </h2>
    </div>
  );
}
