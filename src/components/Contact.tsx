'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { submitContactForm } from '@/app/actions';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Sparkles } from 'lucide-react';

const contactInfo = [
    {
        icon: MapPin,
        label: 'Localização',
        value: 'Av. Dr Agostinho Neto, Ed. Sistec, 1º Andar',
        href: 'https://maps.google.com',
        accent: 'from-amber-500/20 to-orange-500/20',
    },
    {
        icon: Phone,
        label: 'Telefone',
        value: '+244 924 625 000 / +244 916 057 605',
        href: 'tel:+244924625000',
        accent: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'contacto@grupoysam.com',
        href: 'mailto:contacto@grupoysam.com',
        accent: 'from-blue-500/20 to-indigo-500/20',
    },
    {
        icon: Clock,
        label: 'Horário',
        value: 'Seg–Sex: 8h às 18h',
        href: null,
        accent: 'from-purple-500/20 to-pink-500/20',
    },
];

const inputClasses = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(197,165,114,0.08)] transition-all duration-300";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <section id="contactos" className="section relative overflow-hidden bg-[#060606] py-32">
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--gold)]/5 blur-[200px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[var(--gold)]/3 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <Sparkles size={16} className="text-[var(--gold)]" />
                        <span className="text-[var(--gold)] text-xs font-bold tracking-[0.4em] uppercase">
                            Vamos Conversar
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        O Seu Projecto <br className="hidden md:block" />
                        <span className="text-gradient-gold italic">Começa Aqui</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
                        Solicite um orçamento sem compromisso. A nossa equipa responde em menos de 24 horas.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Contact Form — takes 3 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-3 relative"
                    >
                        {/* Decorative corner marks */}
                        <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-[var(--gold)]/20 rounded-tl-3xl pointer-events-none" />
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-[var(--gold)]/20 rounded-br-3xl pointer-events-none" />

                        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                                <h3 className="text-xl font-bold tracking-tight">Pedir Orçamento Gratuito</h3>
                            </div>

                            <form action={async (formData) => {
                                setIsSubmitting(true);
                                const result = await submitContactForm(formData);
                                setIsSubmitting(false);

                                if (result.success) {
                                    toast.success(result.message);
                                    (document.getElementById('contact-form') as HTMLFormElement)?.reset();
                                } else {
                                    toast.error(result.message || 'Erro ao enviar mensagem');
                                }
                            }} id="contact-form" className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-3 block">Nome Completo</label>
                                        <input name="name" type="text" placeholder="José Silva" required className={inputClasses} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-3 block">Email</label>
                                        <input name="email" type="email" placeholder="jose@exemplo.com" required className={inputClasses} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-3 block">Telefone</label>
                                        <input name="phone" type="tel" placeholder="+244 9XX XXX XXX" className={inputClasses} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-3 block">Tipo de Serviço</label>
                                        <select name="service" className={inputClasses + " appearance-none"}>
                                            <option value="">Selecione...</option>
                                            <option value="Remodelação Residencial">Remodelação Residencial</option>
                                            <option value="Espaços Corporativos">Espaços Corporativos</option>
                                            <option value="Construção Civil">Construção Civil</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-3 block">Detalhes do Projecto</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Descreva o que pretende transformar..."
                                        required
                                        className={inputClasses + " resize-none"}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 px-8 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-dark font-bold text-sm uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_20px_50px_rgba(197,165,114,0.25)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Solicitar Orçamento
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info — takes 2 cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col gap-5"
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className="group relative p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-[2rem] hover:border-[var(--gold)]/30 transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10 flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--gold)]/20 transition-colors">
                                        <item.icon className="text-[var(--gold)]" size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-white text-sm font-medium hover:text-[var(--gold-light)] transition-colors truncate block">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-white text-sm font-medium">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Branded Location Card */}
                        <div className="flex-grow relative mt-2 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[var(--gold)]/10 via-[var(--gold)]/5 to-transparent border border-[var(--gold)]/20 p-8 flex flex-col items-center justify-center min-h-[200px]">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--gold) 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
                            <MapPin className="w-10 h-10 text-[var(--gold)] mb-4 relative z-10" />
                            <p className="text-xl font-bold text-white relative z-10 mb-1">Cabinda</p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] font-bold relative z-10">Angola 🇦🇴</p>
                            <div className="w-20 h-[1px] bg-[var(--gold)]/30 mt-4 relative z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
