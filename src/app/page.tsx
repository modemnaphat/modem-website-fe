// Include in Project
import {
  HeaderSection,
  SkillsSection,
  TechnicSkillSection,
  ToolsSection,
  ContactSection
} from "@/app/components/page";
import { Navtop, Footer } from "@/app/components/shared";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-[100vw]">
      <div className={`sticky top-0 h-[60px] z-900`}>
        <Navtop />
      </div>
      <div
        className={`max-w-6xl mx-auto w-full max-xl:px-4 my-20 overflow-hidden`}
      >
        <SkillsSection />
        <TechnicSkillSection />
        <ToolsSection />
        <ContactSection />
      </div>
      <div className={`w-full h-fit mt-8 mb-4`}>
        <Footer />
      </div>
    </div>
  );
}
