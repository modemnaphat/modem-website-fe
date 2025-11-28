// Include in Project
import {
  HeaderSection,
  SkillsSection,
  TechnicSkillSection,
  ToolsSection,
  ContactSection,
  AboutMeSection,
  ProjectSection,
} from "@/app/components/page";
import { Navtop, Footer } from "@/app/components/shared";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-[100vw]">
      <div className="sticky top-0 h-[60px] z-950">
        <Navtop />
      </div>
      <div
        className={`max-w-6xl mx-auto w-full max-xl:px-4 mb-20 overflow-hidden`}
      >
        <HeaderSection />
        <div id="about">
          <AboutMeSection />
        </div>
        <SkillsSection />
        <TechnicSkillSection />
        <ToolsSection />
        <div id="projects">
          <ProjectSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </div>
      <div className={`w-full h-fit mt-8 mb-4`}>
        <Footer />
      </div>
    </div>
  );
}
