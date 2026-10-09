import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { getVisibleNavigation, primaryAction } from "@/config/navigation";
import { school } from "@/data/school";
import type { SocialPlatform } from "@/types/school";
import { SiteLogo } from "./SiteLogo";
import { telHref } from "@/lib/utils/tel";

const platformNames: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

/**
 * Global footer, rendered once by the root layout. A Server Component with
 * no client code and no entrance motion: it is always fully visible.
 *
 * On the inverse surface, it continues the navy of the closing Admissions
 * call to action, separated only by a hairline. Three groups:
 * - identity: wordmark, a short introduction and the site's enquiry action
 * - Explore: the main navigation (the same list as the navbar)
 * - Contact: address, phone, email and any social links
 * then a quiet bottom row with copyright and any legal links.
 *
 * Every group but the identity is optional and disappears cleanly when its
 * data is missing.
 */
export function Footer() {
  const { name, brand, location, contact, socialLinks, footer } = school;
  const navigation = getVisibleNavigation();
  const address = [location.streetAddress, location.locality, location.region, location.postalCode, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="theme-inverse">
      <Container width="wide" className="pb-xl">
        <div className="grid-editorial gap-y-2xl border-t border-border pt-section-sm">
          <div className="col-span-12 flex flex-col items-start gap-lg lg:col-span-5">
            <SiteLogo name={name} logo={brand.logo} />
            {footer?.description && <p className="type-body max-w-narrow text-text-muted">{footer.description}</p>}
            <ButtonLink
              href={primaryAction.href}
              variant="secondary"
              size="sm"
              icon={<ArrowRight aria-hidden="true" className="size-4" />}
              className="mt-xs"
            >
              {primaryAction.label}
            </ButtonLink>
          </div>

          {navigation.length > 0 && (
            <nav aria-labelledby="footer-explore" className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-7">
              <h2 id="footer-explore" className="type-label text-text-muted">
                Explore
              </h2>
              <ul className="mt-lg grid grid-cols-2 gap-x-lg gap-y-sm md:grid-cols-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href} variant="reveal" external={item.external} className="type-body">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-10">
            <h2 className="type-label text-text-muted">
              Contact
            </h2>
            <address className="type-body mt-lg flex flex-col items-start gap-sm not-italic">
              {address && <span className="max-w-[28ch] text-text-muted">{address}</span>}
              {location.mapUrl && (
                <TextLink href={location.mapUrl} variant="reveal" external>
                  View on a map
                </TextLink>
              )}
              {contact.phone && (
                <TextLink href={telHref(contact.phone)} variant="reveal">
                  {contact.phone}
                </TextLink>
              )}
              {contact.email && (
                <TextLink href={`mailto:${contact.email}`} variant="reveal">
                  {contact.email}
                </TextLink>
              )}
              {contact.officeHours && <span className="type-body-sm text-text-muted">{contact.officeHours}</span>}
            </address>
            {socialLinks.length > 0 && (
              <ul aria-label="Social media" className="mt-lg flex flex-wrap gap-x-lg gap-y-sm">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    <TextLink href={link.url} variant="reveal" external className="type-body-sm">
                      {platformNames[link.platform]}
                    </TextLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="type-meta mt-section-sm flex flex-wrap items-center justify-between gap-x-xl gap-y-sm border-t border-border-subtle pt-lg text-text-muted">
          <p>
            © {process.env.BUILD_YEAR} {name}
          </p>
          {footer?.legalLinks && footer.legalLinks.length > 0 && (
            <ul aria-label="Legal" className="flex flex-wrap gap-x-lg gap-y-sm">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} variant="reveal">
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
