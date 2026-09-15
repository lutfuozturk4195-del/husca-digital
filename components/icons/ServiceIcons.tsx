type IconProps = { className?: string };

const shared = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
} as const;

function AuditIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15.2 15.2 21 21" strokeLinecap="round" />
      <path d="M8 10.5h5M10.5 8v5" strokeLinecap="round" />
    </svg>
  );
}

function ContentIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M15 3v4h4" strokeLinejoin="round" />
      <path d="M8 12h8M8 15.5h8M8 8.5h3" strokeLinecap="round" />
    </svg>
  );
}

function GraphIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M12 7v3.2M11.2 11 6.6 15.4M12.8 11l4.6 4.4" strokeLinecap="round" />
    </svg>
  );
}

function CitationIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path
        d="M7 7c-2.5 1-4 3-4 6 0 2 1 3 2.5 3S8 15 8 13c0-1.5-1-2.5-2.5-2.7C6 8.8 7 7.8 8.5 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7c-2.5 1-4 3-4 6 0 2 1 3 2.5 3S17 15 17 13c0-1.5-1-2.5-2.5-2.7C15 8.8 16 7.8 17.5 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfraIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function MonitorIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M4 18V6M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14l3.5-4 3 2.5L18 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  "ai-search-visibility-audit": AuditIcon,
  "geo-content-engineering": ContentIcon,
  "entity-knowledge-graph-optimization": GraphIcon,
  "ai-citation-building": CitationIcon,
  "technical-geo-infrastructure": InfraIcon,
  "ai-citation-monitoring": MonitorIcon,
};
