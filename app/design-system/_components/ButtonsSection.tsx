import { ArrowRight } from "lucide-react";
import { Button, ButtonLink, type ButtonVariant } from "@/components/ui/Button";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const variants: { variant: ButtonVariant; label: string; use: string }[] = [
  { variant: "primary", label: "Apply now", use: "One per region" },
  { variant: "secondary", label: "Book a visit", use: "Alternatives" },
  { variant: "ghost", label: "Filter", use: "Dense UI" },
  { variant: "text", label: "Read the prospectus", use: "Inline actions" },
];

const arrow = <ArrowRight aria-hidden="true" className="size-4" />;

function ButtonMatrix() {
  return (
    <div className="flex flex-col">
      {variants.map(({ variant, label, use }) => (
        <div
          key={variant}
          className="grid items-center gap-md border-b border-border-subtle py-lg sm:grid-cols-[8rem_1fr] sm:gap-lg"
        >
          <div className="flex flex-col">
            <code className="type-body-sm font-medium">{variant}</code>
            <span className="type-meta">{use}</span>
          </div>
          <div className="flex flex-wrap items-center gap-md">
            <Button variant={variant}>{label}</Button>
            <Button variant={variant} icon={arrow}>
              {label}
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ButtonsSection() {
  return (
    <ShowcaseSection
      id="buttons"
      index={6}
      title="Buttons"
      description="Restrained and rectangular. Buttons perform actions; ButtonLink navigates with identical styling. Hover, pressed, focus and disabled states all come from tokens and adapt on dark surfaces."
    >
      <Specimen title="Variants and states">
        <ButtonMatrix />
        <p className="type-meta mt-md max-w-narrow">
          Hover and press to see state changes; Tab to see the focus ring. Trailing icons nudge forward on hover.
        </p>
      </Specimen>

      <Specimen title="Sizes and links">
        <div className="flex flex-wrap items-center gap-md">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <ButtonLink href="#links" variant="secondary" icon={arrow}>
            ButtonLink to Links
          </ButtonLink>
        </div>
      </Specimen>

      <Specimen title="On an inverse surface">
        <div className="theme-inverse p-card">
          <ButtonMatrix />
        </div>
      </Specimen>
    </ShowcaseSection>
  );
}
