'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, ShieldCheck, Zap, Gem } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { icon: Award, value: '5+', label: 'Anos de Primazia', sub: 'Experiência sólida' },
    { icon: Users, value: '100%', label: 'Satisfação Total', sub: 'Clientes fidelizados' },
    { icon: Gem, value: '3', label: 'Pilares de Ouro', sub: 'Áreas de maestria' },
];

export default function About() {
    return (
        <section id="sobre" className="section relative overflow-hidden bg-[#0A0A0A] py-32">
            {/* Artistic Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--gold)]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Showcase Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Elegant Frame Decor */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[var(--gold)]/30 rounded-tl-3xl z-0" />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[var(--gold)]/30 rounded-br-3xl z-0" />

                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
                            <div className="relative aspect-[10/12] group">
                                <Image
                                    src="/images/team/Yuri Sambo-Diretor Geral About us Image.webp"
                                    alt="Yuri Sambo - Diretor Geral"
                                    fill
                                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                />
                                {/* Soft Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                {/* CEO Identity Card (Glass) */}
                                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">Yuri Sambo</h3>
                                        <p className="text-[var(--gold)] text-xs font-bold uppercase tracking-[0.2em] mt-1">Diretor Geral • CEO</p>
                                    </div>
                                    <ShieldCheck className="text-[var(--gold)] opacity-50" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Floating Experience Badge */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -top-10 -right-4 glass px-8 py-6 rounded-[2rem] border border-[var(--gold)]/30 shadow-[0_20px_40px_rgba(197,165,114,0.1)] z-20"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-extrabold text-gradient-gold">5+</span>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 mt-1">Anos Gold</span>
                            </div>
                        </motion.div>
                    </motion.div>


                    {/* Narrative side */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-10 h-[1px] bg-[var(--gold)]" />
                                <span className="text-[var(--gold)] text-xs font-bold tracking-[0.4em] uppercase">
                                    O Legado YSAM
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight">
                                Transformando Sonhos em <br />
                                <span className="text-gradient-gold italic">Obras de Arte</span>
                            </h2>

                            <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light mb-12">
                                <p>
                                    A nossa missão é <span className="text-white font-medium">criar espaços funcionais</span>, esteticamente agradáveis e duradouros. Queremos ser reconhecidos como uma referência na construção civil e remodelação, entregando projetos de alta qualidade que superem as expectativas.
                                </p>
                                <p>
                                    A nossa visão é sermos <span className="text-[var(--gold)]">líderes em inovação e excelência</span> na indústria. Queremos expandir a nossa presença e contribuir para o desenvolvimento sustentável das comunidades onde atuamos, transformando ideias em realidade.
                                </p>
                            </div>

                            {/* Stats Grid - Premiumized */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 0.6 }}
                                        className="relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold)]/50 transition-all group overflow-hidden"
                                    >
                                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--gold)]/5 rounded-full blur-2xl group-hover:bg-[var(--gold)]/10 transition-colors" />
                                        <stat.icon className="w-5 h-5 text-[var(--gold)] mb-3" />
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--gold)] mb-1 leading-tight">{stat.label}</span>
                                            <span className="text-[9px] text-white/40 uppercase tracking-normal">{stat.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
