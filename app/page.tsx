import { Metadata } from "next";
import { generateMetadata } from "../lib/seo";
import SubstackNewsletter from "../components/sections/spotted/SubstackNewsletter";
import HomepageHero from "../components/sections/homepage/HomepageHero";

export const metadata: Metadata = generateMetadata(
  "Welcome to Sattya - Your Trusted Community Platform",
  "Discover events, connect with communities, and share experiences on Sattya. Join our growing network today.",
);

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <HomepageHero />
      <SubstackNewsletter />
    </section>
  );
}
