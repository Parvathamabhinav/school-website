import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import type { Announcement } from "@/types/school";

interface AnnouncementBarProps {
  announcement?: Announcement;
}

/**
 * Optional site-wide notice above the navbar. Renders nothing (and takes no
 * space) when the announcement is missing or disabled.
 */
export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  if (!announcement?.enabled) return null;

  const { text, href, linkLabel } = announcement;

  return (
    <div className="border-b border-border-subtle bg-surface-muted">
      <Container className="py-xs">
        {/* One paragraph so text and link wrap together: two lines at most on phones. */}
        <p className="type-body-sm text-center">
          {text}
          {href && linkLabel && (
            <TextLink href={href} variant="underline" className="ml-sm font-medium">
              {linkLabel}
            </TextLink>
          )}
        </p>
      </Container>
    </div>
  );
}
