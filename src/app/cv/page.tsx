import type { Metadata } from "next";

import { ChatBot, Footer, Navtop } from "@/app/components/shared";

const CV_FILE = "/cv/Naphat_Mahakheta_CV.pdf";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Naphat Mahakheta.",
};

export default function CVPage() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] max-w-[100vw]">
      <div className="sticky top-0 h-[60px] z-950">
        <Navtop />
      </div>

      <main className="mx-auto mb-20 w-full max-w-6xl overflow-hidden px-4">
        <div className="flex flex-col gap-6 py-12 max-sm:py-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
              Curriculum Vitae
            </p>
            <h1 className="text-3xl font-bold text-white max-sm:text-2xl">
              Naphat Mahakheta
            </h1>
            <p className="max-w-2xl text-white/60">
              View my CV directly on this page, or open the PDF in a new tab for
              full-screen reading.
            </p>
          </div>

          <div className="flex justify-end">
            <a
              href={CV_FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/80"
            >
              Open PDF
            </a>
          </div>

          <div className="rounded-lg border border-[#282828] bg-white/[0.03] p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 rounded-t-md border border-b-0 border-[#282828] bg-[#111111] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-white/30" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <p className="ml-2 truncate text-sm text-white/60">
                Naphat_Mahakheta_CV.pdf
              </p>
            </div>

            <iframe
              src={`${CV_FILE}#view=FitH`}
              title="Naphat Mahakheta CV PDF preview"
              className="h-[calc(100dvh-260px)] min-h-[560px] w-full rounded-b-md border border-[#282828] bg-[#111111] max-sm:h-[70dvh] max-sm:min-h-[480px]"
            />
          </div>

          <p className="text-center text-sm text-white/50">
            If the preview does not load in your browser,{" "}
            <a
              href={CV_FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-400 underline-offset-4 hover:text-red-300 hover:underline"
            >
              open the PDF directly
            </a>
            .
          </p>
        </div>
      </main>

      <div className="w-full h-fit mt-8 mb-4">
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
}
