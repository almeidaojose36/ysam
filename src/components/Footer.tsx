'use client';

import { Facebook, Instagram, Linkedin, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const footerLinks = {
    services: [
        { label: 'Remodelação Residencial', href: '#servicos' },
        { label: 'Espaços Corporativos', href: '#servicos' },
        { label: 'Construção Civil', href: '#servicos' },
        { label: 'Simulador AI', href: '#simulador' },
    ],
    company: [
        { label: 'Sobre Nós', href: '#sobre' },
        { label: 'Portfólio', href: '#portfolio' },
        { label: 'Equipa', href: '#lideranca' },
        { label: 'Contactos', href: '#contactos' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/OrganizacoesYSAM', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/OrganizacoesYSAM', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/OrganizacoesYSAM', label: 'LinkedIn' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#030303] overflow-hidden">
            {/* Subtle gold border at top */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

            <div className="container mx-auto px-6 pt-20 pb-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-12 h-12">
                                <Image src="/images/logo.webp" alt="YSAM Logo" fill className="object-contain" />
                            </div>
                            <div>
                                <span className="block text-lg font-bold tracking-tighter text-white leading-none">YSAM</span>
                                <span className="block text-[8px] uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mt-0.5">Soluções Premium</span>
                            </div>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs font-light">
                            Elevamos os padrões da construção civil e design de interiores em Angola. O Grupo YSAM cria legados de excelência.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:bg-[var(--gold)]/20 hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-6">Serviços</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                                        <div className="w-0 group-hover:w-3 h-[1px] bg-[var(--gold)] transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-6">Empresa</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-white/40 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                                        <div className="w-0 group-hover:w-3 h-[1px] bg-[var(--gold)] transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-6">Contactos</h4>
                        <ul className="space-y-5 text-sm">
                            <li>
                                <a href="tel:+244924625000" className="text-white/40 hover:text-[var(--gold)] transition-colors flex items-center gap-3">
                                    <Phone size={14} className="text-[var(--gold)]/50 flex-shrink-0" />
                                    +244 924 625 000 / +244 916 057 605
                                </a>
                            </li>
                            <li>
                                <a href="mailto:geral@orgysam.com" className="text-white/40 hover:text-[var(--gold)] transition-colors flex items-center gap-3">
                                    <Mail size={14} className="text-[var(--gold)]/50 flex-shrink-0" />
                                    contacto@grupoysam.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={14} className="text-[var(--gold)]/50 flex-shrink-0 mt-0.5" />
                                <span className="text-white/40 leading-relaxed">
                                    Av. Dr Agostinho Neto,<br />
                                    Ed. Sistec, 1º Andar<br />
                                    Cabinda, Angola
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-xs uppercase tracking-widest">
                        © {new Date().getFullYear()} Grupo YSAM. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex gap-8 text-xs text-white/20 uppercase tracking-wider">
                            <a href="#" className="hover:text-white/50 transition-colors">Termos</a>
                            <a href="#" className="hover:text-white/50 transition-colors">Privacidade</a>
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[var(--gold)] hover:border-[var(--gold)]/40 transition-all duration-300"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
