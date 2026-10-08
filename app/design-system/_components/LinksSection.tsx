import { TextLink } from "@/components/ui/TextLink";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const standaloneLinks = ["Curriculum overview", "Term dates", "Policies and reports"];

function LinkExamples() {
  return (
    <div className="flex flex-col gap-xl">
      <p className="type-body max-w-narrow">
        Inline links stay underlined so they are recognisable without colour: read the{" "}
        <TextLink href="#typography">typography guidelines</TextLink> or review the{" "}
        <TextLink href="#color">colour tokens</TextLink> before building new components.
      </p>

      <ul className="flex flex-col gap-sm">
        {standaloneLinks.map((label) => (
          <li key={label}>
            <TextLink href="#links" variant="reveal" className="type-h4">
              {label}
            </TextLink>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-x-xl gap-y-md">
        <TextLink href="#links" variant="underline" className="type-body-sm font-medium">
          Discover the sixth form
        </TextLink>
        <TextLink href="https://example.com" external variant="reveal" className="type-body-sm font-medium">
          External resource
        </TextLink>
      </div>
    </div>
  );
}

export function LinksSection() {
  return (
    <ShowcaseSection
      id="links"
      index={7}
      title="Links"
      description="Three treatments. The underline is a single CSS layer sized by --link-line, so later refinements (GSAP-driven or otherwise) apply everywhere from one place."
    >
      <Specimen title="inline · reveal · underline">
        <LinkExamples />
      </Specimen>
      <Specimen title="On an inverse surface">
        <div className="theme-inverse p-card">
          <LinkExamples />
        </div>
      </Specimen>
    </ShowcaseSection>
  );
}
