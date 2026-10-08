import { sampleCopy } from "../_lib/samples";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

// Samples use <p> so the page keeps one h1 and a logical heading outline.
const roles = [
  { role: "display", spec: "Newsreader 400 · 48 → 112px", className: "type-display", sample: "Known by name." },
  { role: "h1", spec: "Newsreader 400 · 40 → 72px", className: "type-h1", sample: "A school for curious minds" },
  { role: "h2", spec: "Newsreader 400 · 32 → 52px", className: "type-h2", sample: "Learning beyond the classroom" },
  { role: "h3", spec: "Newsreader 500 · 24 → 32px", className: "type-h3", sample: "Sciences and mathematics" },
  { role: "h4", spec: "Inter 600 · 18 → 20px", className: "type-h4", sample: "Laboratory programme" },
  { role: "body-lg", spec: "Inter 400 · 18 → 21px", className: "type-body-lg", sample: sampleCopy.standfirst },
  { role: "body", spec: "Inter 400 · 16px", className: "type-body", sample: sampleCopy.body },
  { role: "body-sm", spec: "Inter 400 · 14px", className: "type-body-sm", sample: "Captions, supporting notes and dense UI copy." },
  { role: "label", spec: "Inter 600 · 12px · caps", className: "type-label", sample: "Upper school · Admissions" },
  { role: "meta", spec: "Inter 400 · 13px · muted", className: "type-meta", sample: "Published 14 November · 4 min read" },
];

export function TypographySection() {
  return (
    <ShowcaseSection
      id="typography"
      index={2}
      title="Typography"
      description="Ten roles, no more. Newsreader carries editorial voice in display and headings; Inter handles everything functional. Sizes scale fluidly between mobile and large desktop."
    >
      <Specimen title="Type roles">
        <ul className="flex flex-col">
          {roles.map(({ role, spec, className, sample }) => (
            <li
              key={role}
              className="grid gap-xs border-b border-border-subtle py-lg first:pt-0 md:grid-cols-[10rem_1fr] md:gap-lg"
            >
              <div className="flex flex-col">
                <code className="type-body-sm font-medium">type-{role}</code>
                <span className="type-meta">{spec}</span>
              </div>
              <p className={className}>{sample}</p>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen title="In composition">
        <article className="flex max-w-narrow flex-col gap-md">
          <p className="type-label text-text-muted">Academic life</p>
          <p className="type-h2">{sampleCopy.headline}</p>
          <p className="type-body-lg">{sampleCopy.standfirst}</p>
          <p className="type-body text-text-muted">{sampleCopy.body}</p>
          <p className="type-meta">Head of Academics · Updated this term</p>
        </article>
      </Specimen>
    </ShowcaseSection>
  );
}
