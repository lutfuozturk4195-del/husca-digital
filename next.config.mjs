/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static-first, edge-friendly output. Blog pages are fully pre-rendered
  // (generateStaticParams) so both crawlers and LLM fetchers get fast,
  // complete HTML with no client-side wait.
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
