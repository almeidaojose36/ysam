'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

const headlineLetters = 'Requalificação Moderna Para O Seu Lar'.split('');

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
            <div className="absolute inset-0 z-1 bg-black/40" />
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />
            <div className="absolute inset-0 z-3 bg-gradient-to-r from-black/80 via-transparent to-black/80 opacity-40" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 backdrop-blur-sm"
                >
                    <Sparkles size={14} className="text-[var(--gold)]" />
                    <span className="text-[var(--gold)] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                        Excelência em Construção & Design
                    </span>
                </motion.div>

                {/* Staggered Headline Animation */}
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white perspective-1000">
                    {headlineLetters.map((letter, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className={letter === ' ' ? 'inline-block w-4 md:w-6' : 'inline-block drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]'}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-base md:text-xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed tracking-wide"
                >
                    Elevando o padrão da construção civil em Angola com <span className="text-[var(--gold-light)] font-medium">soluções inteligentes</span> e acabamentos de luxo.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 relative"
                >
                    {/* Decorative glow behind button */}
                    <div className="absolute -inset-4 bg-[var(--gold)]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                    <a href="#simulador" className="btn-gold px-10 py-4 text-sm font-bold group">
                        <span className="flex items-center gap-2">
                            Simulador AI <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                    <a href="#portfolio" className="btn-outline px-10 py-4 text-sm font-bold">
                        Galeria de Projectos
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
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

// Final check on imports - should be at the top

