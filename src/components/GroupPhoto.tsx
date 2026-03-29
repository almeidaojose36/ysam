import Image from 'next/image';

export default function GroupPhoto() {
  return (
    <section
      aria-label="Fotografia de grupo da equipa YSAM"
      className="relative bg-[#050505] py-8 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-all duration-700 hover:border-[var(--gold)]/30">
          <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[var(--gold)]/10 to-transparent pointer-events-none" />
          <div className="relative aspect-[16/10] md:aspect-[18/8]">
            <Image
              src="/images/group-photo.webp"
              alt="Fotografia de grupo da equipa YSAM"
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded-[1.5rem] border border-white/15 bg-black/60 p-4 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[var(--gold)]" />
                <span className="text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Equipa YSAM
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold leading-tight text-white">
                A Força Por Trás de Cada Projecto
              </h3>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-white/70 leading-relaxed">
                Profissionais dedicados à construção, remodelação e execução com padrão premium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
