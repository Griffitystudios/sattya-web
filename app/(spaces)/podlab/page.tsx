import Podlabvibe from "../../../components/sections/podlab/Podlabvibe";
import ComingSoon from "../../../components/ui/ComingSoon";
import { Hero } from "../../../components/ui/Hero";
import { podlabComingSoonConfig } from "../../../configs/podlab/podlab-coming-soon";
import { podlabConfig } from "../../../configs/podlab/podlab-hero";

export default function Podlab() {
  return (
    <div>
      <Hero {...podlabConfig}/>
      <ComingSoon {...podlabComingSoonConfig} />
    </div>
  );
}
