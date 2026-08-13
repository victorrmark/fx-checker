export default function EmptyState({title, message}: {title?: string, message?: string}) {
  return (
    <div className="w- full px-10 gap-4 flex flex-col items-center">
      <p className="text-2 text-neutral-100">{title}</p>{" "}
      <p className="text-center text-3 text-neutral-200 whitespace-pre-line">
        {message}
      </p>
    </div>
  );
}
