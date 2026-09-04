import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/home-2",
        "/home-3",
        "/home-4",
        "/login",
        "/register",
        "/profile",
        "/forgot-password",
        "/reset-password",
        "/donation/success",
        "/donation/cancel",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
