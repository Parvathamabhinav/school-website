import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getVisibleNavigation, primaryAction } from "@/config/navigation";
import { school } from "@/data/school";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { NavbarShell } from "./NavbarShell";
import { SiteLogo } from "./SiteLogo";

/**
 * Global navbar. A Server Component: only the scroll-aware shell, the
 * desktop link list (current-page state) and the mobile menu hydrate.
 *
 * Breakpoints:
 * - < md:  identity + Menu
 * - md–xl: identity + CTA + Menu (seven links don't fit comfortably yet)
 * - ≥ xl:  identity + inline links + CTA
 */
export function Navbar() {
  const items = getVisibleNavigation();
  const brand = <SiteLogo name={school.name} logo={school.brand.logo} />;

  return (
    <NavbarShell>
      <Container className="flex items-center justify-between gap-lg py-lg transition-[padding] duration-(--motion-duration-normal) ease-emphasized group-data-[scrolled=true]/header:py-sm">
        {brand}
        <div className="flex items-center gap-lg xl:gap-xl">
          <div className="hidden xl:block">
            <DesktopNav items={items} />
          </div>
          <div className="hidden md:block">
            <ButtonLink href={primaryAction.href} size="sm">
              {primaryAction.label}
            </ButtonLink>
          </div>
          <div className="xl:hidden">
            <MobileNav items={items} action={primaryAction} brand={brand} contact={school.contact} />
          </div>
        </div>
      </Container>
    </NavbarShell>
  );
}
