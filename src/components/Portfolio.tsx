'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles, LayoutGrid } from 'lucide-react';

const portfolioItems = [
    { id: 1, title: 'Serviços de Remodelação', category: 'residencial', image: '/images/residential/residential_high_ceiling_mezzanine.webp', span: 'tall', location: 'Cabinda Centro' },
    { id: 2, title: 'Escritórios Contentorizados', category: 'corporativo', image: '/images/corporate/corporate_open_plan_office.webp', span: 'normal', location: 'Refinaria Kilamba' },
    { id: 3, title: 'Acesso Principal e Catracas', category: 'industrial', image: '/images/industrial/industrial_container_conversion_structure.webp', span: 'normal', location: 'Refinaria de Cabinda' },
    { id: 4, title: 'Construção de Fossa 10x10', category: 'industrial', image: '/images/industrial/construction_excavator_site_work.webp', span: 'normal', location: 'Refinaria de Cabinda' },
    { id: 5, title: 'Divisória e Estantes', category: 'residencial', image: '/images/residential/residential_room_divider_shelving.webp', span: 'tall', location: 'Cabinda' },
    { id: 6, title: 'Sala de Reuniões Executiva', category: 'corporativo', image: '/images/corporate/corporate_meeting_room_wood_table.webp', span: 'normal', location: 'Cabinda' },
    { id: 7, title: 'Papel de Parede e TV', category: 'residencial', image: '/images/residential/residential_tv_wall_backlight.webp', span: 'normal', location: 'Cabinda' },
    { id: 8, title: 'Aplicação de Placa 3D', category: 'residencial', image: '/images/residential/residential_gold_3d_wall_panel.webp', span: 'normal', location: 'Cabinda' },
];

const filters = [
    { id: 'todos', label: 'Todos os Projectos' },
    { id: 'residencial', label: 'Residencial' },
    { id: 'corporativo', label: 'Corporativo' },
    { id: 'industrial', label: 'Industrial' },
];

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('todos');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredItems = portfolioItems.filter(
        (item) => activeFilter === 'todos' || item.category === activeFilter
    );

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (lightboxIndex === null) return;
        const newIndex = direction === 'next'
            ? (lightboxIndex + 1) % filteredItems.length
            : (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
        setLightboxIndex(newIndex);
    };

    return (
        <section id="portfolio" className="section relative overflow-hidden bg-[#050505] py-32">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--gold)]/5 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <LayoutGrid size={16} className="text-[var(--gold)]" />
                        <span className="text-[var(--gold)] text-xs font-bold tracking-[0.4em] uppercase">
                            Obras Concluídas
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 tracking-tight">
                        Galeria de <span className="text-gradient-gold italic">Prestígio</span>
                    </h2>

                    {/* Filter Navigation */}
                    <div className="flex flex-wrap justify-center gap-3 mt-10 p-1.5 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 w-fit mx-auto">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeFilter === filter.id
                                    ? 'bg-[var(--gold)] text-dark shadow-lg'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* High-End Masonry Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative group cursor-hover overflow-hidden rounded-[2rem] border border-white/5 ${item.span === 'tall' ? 'row-span-2' : ''
                                    }`}
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Refined Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Project Info Card */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-[1px] bg-[var(--gold)]" />
                                        <span className="text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.2em]">{item.category}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles size={10} className="text-[var(--gold)]" /> {item.location}
                                    </p>
                                </div>

                                {/* Floating Action Button */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/20 hover:bg-[var(--gold)] hover:text-dark transition-colors">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Premium Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12 md:p-24"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--gold)] transition-all z-[110]"
                            onClick={closeLightbox}
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation */}
                        <button
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 glass rounded-full flex items-center justify-center text-white/30 hover:text-[var(--gold)] border-white/5 hover:border-[var(--gold)] transition-all z-[110]"
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 glass rounded-full flex items-center justify-center text-white/30 hover:text-[var(--gold)] border-white/5 hover:border-[var(--gold)] transition-all z-[110]"
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full h-full flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full max-h-[80vh]">
                                <Image
                                    src={filteredItems[lightboxIndex].image}
                                    alt={filteredItems[lightboxIndex].title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Project Info Bar */}
                            <div className="mt-8 text-center max-w-2xl px-4">
                                <span className="text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">{filteredItems[lightboxIndex].category}</span>
                                <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">{filteredItems[lightboxIndex].title}</h4>
                                <div className="flex items-center justify-center gap-4 text-white/40">
                                    <span className="text-xs uppercase tracking-widest">{filteredItems[lightboxIndex].location}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    <span className="text-xs uppercase tracking-widest">Projecto {lightboxIndex + 1} de {filteredItems.length}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
