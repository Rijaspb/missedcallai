import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: "missed-call-ai",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
});