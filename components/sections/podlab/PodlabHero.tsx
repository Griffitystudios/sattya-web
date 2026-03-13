import { Hero } from "../../../components/ui/Hero";

export default function PodlabHero() {
  return (
    <div>
      <Hero
        logoSrc="/images/podlabwhitelogo.png"
        slides={[{ backgroundImage: "/images/podlabbg.png" }]}
      />
    </div>
  );
}
