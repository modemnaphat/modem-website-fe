// Include in Project
import { HeaderSection, SkillsSection } from "@/app/components/page";
import { Navtop, Footer } from "@/app/components/shared";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <div className={`sticky top-0 h-[60px] z-900`}>
        <Navtop />
      </div>
      <div className={`max-w-6xl mx-auto w-full max-xl:px-4 mt-4`}>
        <SkillsSection />
      </div>
      <div className={`w-full h-fit mt-8 mb-4`}>
        <Footer />
      </div>
    </div>
  );
}
