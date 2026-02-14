'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Home, Building2, HardHat, Sparkles } from 'lucide-react';

const tabs = [
    { id: 'residential', label: 'Residencial', icon: Home, desc: 'Projectos Habitacionais' },
    { id: 'corporate', label: 'Corporativo', icon: Building2, desc: 'Ambientes de Trabalho' },
    { id: 'industrial', label: 'Industrial', icon: HardHat, desc: 'Infraestrutura de Peso' },
];

const services = {
    residential: {
        headline: 'Remodelação e Acabamentos',
        description: 'Elevamos o padrão da sua moradia com acabamentos de luxo e design funcional.',
        features: [
            {
                title: 'Sancas e Tetos Falsos',
                description: 'Iluminação cénica e acabamentos em gesso que transformam a atmosfera.',
                image: '/images/residential/residential_ceiling_blue_led.webp',
                tag: 'Interiores'
            },
            {
                title: 'Paineis de Parede',
                description: 'Placas 3D e papel de parede premium para uma estética contemporânea.',
                image: '/images/residential/residential_gold_3d_wall_panel.webp',
                tag: 'Decoração'
            },
            {
                title: 'Mobiliário Moderno',
                description: 'Carpintaria de luxo e móveis sob medida para cada m2.',
                image: '/images/residential/residential_modern_tv_unit_painting.webp',
                tag: 'Personalizado'
            },
        ],
    },
    corporate: {
        headline: 'Espaços de Alta Performance',
        description: 'Design estratégico focado em produtividade e imagem corporativa de excelência.',
        features: [
            {
                title: 'Remodelação Executiva',
                description: 'Layouts modernos que equilibram funcionalidade e prestígio profissional.',
                image: '/images/corporate/modern_office_remodel.png',
                tag: 'Office'
            },
            {
                title: 'Open Spaces',
                description: 'Ambientes integrados que estimulam a colaboração e bem-estar.',
                image: '/images/corporate/corporate_open_plan_office.webp',
                tag: 'Design'
            },
            {
                title: 'Zonas de Decisão',
                description: 'Salas de reunião equipadas com o que há de mais moderno em acústica.',
                image: '/images/corporate/corporate_meeting_room_wood_table.webp',
                tag: 'Boardroom'
            },
        ],
    },
    industrial: {
        headline: 'Construção e Infraestruturas',
        description: 'Segurança e durabilidade em projectos de grande escala, fossas e acessos complexos.',
        features: [
            {
                title: 'Construção Civil',
                description: 'Execução rigorosa e acompanhamento técnico em todas as fases.',
                image: '/images/industrial/construction_site_engineers_planning.webp',
                tag: 'Civil'
            },
            {
                title: 'Módulos Habitacionais',
                description: 'Transformação de contentores em escritórios e casas modulares.',
                image: '/images/industrial/industrial_container_conversion_structure.webp',
                tag: 'Modular'
            },
            {
                title: 'Gestão de Obras',
                description: 'Fiscalização e logística avançada para cumprir prazos reais.',
                image: '/images/industrial/construction_excavator_site_work.webp',
                tag: 'Grandes Obras'
            },
        ],
    },
};

export default function Services() {
    const [activeTab, setActiveTab] = useState<'residential' | 'corporate' | 'industrial'>('residential');
    const currentService = services[activeTab];

    return (
        <section id="servicos" className="section relative overflow-hidden bg-[#0A0A0A] py-32">
            {/* Dark Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(var(--gold) 0.5px, transparent 0.5px)`,
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Sparkles size={16} className="text-[var(--gold)]" />
                        <span className="text-[var(--gold)] text-xs font-bold tracking-[0.4em] uppercase">
                            Portfólio de Serviços
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Soluções de <span className="text-gradient-gold italic">Elite</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base leading-relaxed uppercase tracking-widest font-light">
                        Adaptamos a nossa mestria às necessidades específicas de cada sector.
                    </p>
                </motion.div>

                {/* Tab Navigation - Premium Glass */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 p-2 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 w-fit mx-auto shadow-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'residential' | 'corporate' | 'industrial')}
                            className={`flex items-center gap-4 px-8 py-3.5 rounded-[2rem] transition-all duration-500 group relative ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-dark shadow-[0_10px_30px_rgba(197,165,114,0.3)]'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={22} className={activeTab === tab.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100 transition-opacity'} />
                            <div className="text-left">
                                <p className="text-xs font-black uppercase tracking-widest leading-none">{tab.label}</p>
                                <p className={`text-[8px] font-bold uppercase tracking-tighter mt-1 ${activeTab === tab.id ? 'text-black/60' : 'text-white/20'}`}>{tab.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Service Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    >
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{currentService.headline}</h3>
                            <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">{currentService.description}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {currentService.features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[var(--gold)]/30 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                                >
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    />

                                    {/* Dark gradient for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                                    {/* Glass Overlay Card */}
                                    <div className="absolute inset-x-4 bottom-4 bg-black/60 backdrop-blur-xl p-6 rounded-[1.8rem] border border-white/15 transform transition-all duration-500 group-hover:translate-y-[-8px]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2.5 py-1 rounded bg-[var(--gold)]/20 text-[var(--gold)] text-[8px] font-bold uppercase tracking-widest">{feature.tag}</span>
                                            <div className="flex-grow h-[1px] bg-white/10" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-2 text-white group-hover:text-[var(--gold-light)] transition-colors">{feature.title}</h4>
                                        <p className="text-white/70 text-xs leading-relaxed font-light">{feature.description}</p>
                                    </div>

                                    {/* Top Shine */}
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
