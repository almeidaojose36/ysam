'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const desktopHeadlinePrefix = 'Requalificação Moderna ';
    const desktopHeadlineHighlight = 'Para O Seu Lar';
    const srHeadline = `${desktopHeadlinePrefix}${desktopHeadlineHighlight}`;

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, []);

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 50, rotateX: 45 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.02,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        }),
    };

    return (
        <section id="inicio" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Video Background with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}>
                    <Image
                        src="/images/hero-poster.webp"
                        alt="Hero Poster"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover scale-105 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src="/video/hero.mp4?v=compressed"
                    onCanPlay={() => setIsVideoLoaded(true)}
                />
            </div>

            {/* Premium Multi-layered Overlay */}
            <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A] pointer-events-none" />
            <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/80 via-transparent to-black/80 opacity-40 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 md:pt-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 backdrop-blur-sm"
                >
                    <Sparkles size={12} className="text-[var(--gold)] md:w-[14px] md:h-[14px]" />
                    <span className="text-[var(--gold)] text-[11px] font-semibold tracking-[0.04em] md:hidden">
                        Excelência em construção e design
                    </span>
                    <span className="hidden md:inline text-[var(--gold)] text-xs font-bold tracking-[0.4em] uppercase">
                        Excelência em Construção & Design
                    </span>
                </motion.div>

                {/* Mobile-first headline treatment for cleaner typography on small screens */}
                <h1 className="font-heading text-white perspective-1000 max-w-4xl mx-auto mb-6 md:mb-8">
                    <span className="sr-only">{srHeadline}</span>

                    <motion.span
                        aria-hidden
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.8 }}
                        className="sm:hidden inline-flex flex-col items-center text-[clamp(2.05rem,10.8vw,2.9rem)] font-bold leading-[0.98] tracking-[-0.02em] text-balance"
                    >
                        <span className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]">Requalificamos</span>
                        <span className="text-[var(--gold-light)] drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]">o seu lar</span>
                        <span className="mt-3 text-[0.53em] leading-tight tracking-[0.06em] font-medium text-white/80 uppercase">
                            com design moderno
                        </span>
                    </motion.span>

                    <span aria-hidden className="hidden sm:inline text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                        {desktopHeadlinePrefix.split('').map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className={letter === ' ' ? 'inline-block w-2 md:w-6' : 'inline-block drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]'}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                        <span className="inline-block whitespace-nowrap">
                            {desktopHeadlineHighlight.split('').map((letter, i) => (
                                <motion.span
                                    key={`suffix-${i}`}
                                    custom={i + desktopHeadlinePrefix.length}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className={letter === ' ' ? 'inline-block w-2 md:w-6' : 'inline-block drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]'}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </span>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-[15px] md:text-xl text-white/90 max-w-xl md:max-w-2xl mb-8 md:mb-12 font-light leading-7 md:leading-relaxed tracking-[0.008em] md:tracking-wide px-5 md:px-4 text-balance"
                >
                    <span className="sm:hidden">
                        Projetamos e executamos espaços modernos, funcionais e com acabamento premium.
                    </span>
                    <span className="hidden sm:inline">
                        Elevando o padrão da construção civil em Angola com <span className="text-[var(--gold-light)] font-medium">soluções inteligentes</span> e acabamentos de luxo.
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="grid grid-cols-2 gap-2 md:gap-6 relative z-10 w-full max-w-[24rem] px-4 sm:px-0 sm:w-auto sm:max-w-none sm:flex sm:justify-center sm:items-center"
                >
                    <a href="#simulador" className="btn-gold h-10 md:h-auto px-3 py-2.5 md:px-10 md:py-4 text-[13px] md:text-sm font-bold group relative z-20 cursor-pointer w-full sm:w-auto justify-center whitespace-nowrap">
                        <span className="flex items-center gap-2">
                            Simulador AI <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                    <a href="#portfolio" className="btn-outline h-10 md:h-auto px-3 py-2.5 md:px-10 md:py-4 text-[13px] md:text-sm font-bold relative z-20 cursor-pointer w-full sm:w-auto justify-center whitespace-nowrap">
                        <span className="sm:hidden">Galeria</span>
                        <span className="hidden sm:inline">Galeria de Projectos</span>
                    </a>

                    {/* Decorative glow behind button - moved to end and given low z-index */}
                    <div className="absolute -inset-4 bg-[var(--gold)]/20 blur-2xl rounded-full opacity-0 pointer-events-none z-0" />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-white/40"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1"
                >
                    <div className="w-1 h-2 bg-[var(--gold)] rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
