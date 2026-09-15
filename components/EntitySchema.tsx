/**
 * Renders one JSON-LD <script> tag for an arbitrary schema.org graph.
 * Kept generic so pages can compose multiple entities (Organization,
 * ProfessionalService, FAQPage, BlogPosting, BreadcrumbList, ...) via
 * lib/schema.ts and pass the result straight through.
 */
export default function EntitySchema({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
