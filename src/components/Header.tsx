'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Simulador AI', href: '#simulador' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contactos', href: '#contactos' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5'
        : 'py-6 bg-transparent'
        }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" style={{ width: `${scrollProgress}%` }} />

      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#inicio"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group flex items-center"
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/images/logo.webp"
              alt="YSAM Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="ml-3 hidden sm:block">
            <span className="block text-lg font-bold tracking-tighter text-white leading-none">YSAM</span>
            <span className="block text-[8px] uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mt-0.5">Soluções Premium</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-2.5 gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-[var(--gold)] transition-all relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-4"
        >
          <a
            href="#contactos"
            className="group relative px-6 py-2.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-dark text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Orçamento <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu — Full Screen Opaque Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-8 py-6 absolute top-0 left-0 right-0 z-20">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image src="/images/logo.webp" alt="YSAM" fill className="object-contain" />
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Centered Navigation */}
            <div className="flex flex-col items-center justify-center flex-grow w-full px-6 relative">
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--gold)]/10 blur-[100px] rounded-full pointer-events-none" />

              <nav className="flex flex-col items-center gap-8 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl md:text-4xl font-bold font-heading text-white/50 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    <span className="text-[var(--gold)] opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">•</span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="px-8 pb-12 w-full flex flex-col items-center relative z-10">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#contactos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-sm py-5 bg-white text-black font-bold text-center rounded-full text-sm uppercase tracking-widest hover:bg-[var(--gold)] transition-colors shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                Pedir Orçamento
              </motion.a>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-white/20 text-[10px] mt-8 uppercase tracking-[0.4em]"
              >
                YSAM • Cabinda
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
