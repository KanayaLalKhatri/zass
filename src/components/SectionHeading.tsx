import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 flex items-center gap-4">
        <span className="font-mono text-sm font-bold text-accent-2">{index}.</span>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
        <span className="ml-2 h-px flex-1 bg-foreground/20" />
      </div>
    </Reveal>
  );
}
