
export default function CompareSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-4 w-full bg-neutral-600 outline-neutral-500 animate-pulse p-3 sm:p-4 rounded-[10px]"
        ></div>
      ))}
    </>
  );
}
