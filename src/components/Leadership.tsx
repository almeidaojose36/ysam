'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

const team = [
    {
        name: 'Yuri Sambo',
        role: 'Diretor Geral',
        image: '/images/team/Yuri Sambo-Diretor Geral.webp',
        socials: { linkedin: '#', instagram: '#' }
    },
    {
        name: 'Estevão Mabiala',
        role: 'Diretor de Operações',
        image: '/images/team/Estevão Mabiala-Diretor de Operações.webp',
        socials: { linkedin: '#', instagram: '#' }
    },
    {
        name: 'Dádiva Café',
        role: 'Coord. Administrativa',
        image: '/images/team/Dádiva Café-Coordenadora Administrativa e Financeira.webp',
        socials: { linkedin: '#', instagram: '#' }
    },
    {
        name: 'Ronildo Bendo',
        role: 'Supervisor',
        image: '/images/team/Ronildo Bendo-Supervisor de Operações.webp',
        socials: { linkedin: '#', instagram: '#' }
    },
];

export default function Leadership() {
    return (
        <section className="section relative overflow-hidden bg-[#050505] py-24">
            {/* Ambient Background Glimmer */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5"
                    >
                        <span className="text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.3em]">
                            A Nossa Liderança
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 tracking-tight">
                        Quem Faz <span className="text-gradient-gold">Acontecer</span>
                    </h2>
                    <div className="flex justify-center items-center gap-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--gold)]/50" />
                        <div className="w-2 h-2 rounded-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]" />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--gold)]/50" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center sm:justify-items-stretch">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className="group relative w-full max-w-[24rem] sm:max-w-none"
                        >
                            {/* Moving Light Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--gold)]/40 via-transparent to-[var(--gold)]/20 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />

                            <div className="relative h-full bg-[#111111]/90 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-6 flex flex-col items-center transition-all duration-500 group-hover:bg-[#0F0F0F] group-hover:translate-y-[-8px] shadow-2xl">

                                {/* Avatar Container */}
                                <div className="relative w-[78%] sm:w-full aspect-square mb-8 sm:mb-10 group-hover:mb-8 transition-all duration-500 mx-auto">
                                    {/* Rotating Border Ring */}
                                    <div className="absolute -inset-3 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/20 rounded-full transition-all duration-700 group-hover:rotate-180" />

                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 group-hover:border-[var(--gold)]/50 transition-colors duration-500 shadow-2xl">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-center scale-105 sm:scale-110 group-hover:scale-110 sm:group-hover:scale-120 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                                    </div>

                                    {/* Hover Socials */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black transition-all duration-300">
                                            <Linkedin size={14} />
                                        </a>
                                        <a href="#" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black transition-all duration-300">
                                            <Instagram size={14} />
                                        </a>
                                    </div>
                                </div>

                                {/* Text Info */}
                                <div className="text-center w-full px-2">
                                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[var(--gold-light)] transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-[var(--gold)]/30 transition-all duration-500">
                                        <p className="text-[var(--gold)] text-[11px] font-bold uppercase tracking-[0.15em] leading-none">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Aesthetic Bottom Detail */}
                                <div className="mt-8 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                                    <div className="w-8 h-[1px] bg-gradient-to-r from-[var(--gold)] to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
