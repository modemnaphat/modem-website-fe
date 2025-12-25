import HeroCanvas from "./HeroCanvas";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[calc(100dvh-60px)] overflow-hidden bg-[#0a0a0a]">
      <HeroCanvas />

      <div className="relative z-10 px-6 text-center">
        <h1 className="font-hero text-8xl font-bold text-white mb-4 max-md:text-6xl">
          Hi. I'm{" "}
          <span className="bg-linear-to-r from-rose-500 to-red-700 text-transparent bg-clip-text">
            MODEM
          </span>
        </h1>

        <p className="text-3xl font-light text-gray-200 max-md:text-xl">
          Software Developer
        </p>
      </div>
    </section>
  );
}
