import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";

/**
 * Foundation placeholder: confirms data, tokens and fonts are wired up.
 * The real homepage composition comes in a later step.
 */
export default function HomePage() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <Section>
        <Container>
          <h1 className="type-display">{school.name}</h1>
        </Container>
      </Section>
    </main>
  );
}
