'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Upload, Sparkles, CheckCircle, Camera, Wand2, ArrowLeftRight,
    Paintbrush, MessageSquare, ChevronDown, Layers, Lightbulb, Frame,
    Download, Mail, Phone, Share2,
} from 'lucide-react';

// ─── Renovation scope: what elements can be changed ─────────────────────────
const renovationScopes = [
    { id: 'floor', label: 'Pavimento', icon: '◻️', desc: 'Chão e revestimentos' },
    { id: 'walls', label: 'Paredes', icon: '🎨', desc: 'Pintura, revestimentos' },
    { id: 'ceiling', label: 'Teto', icon: '✨', desc: 'Sancas, tetos falsos' },
    { id: 'lighting', label: 'Iluminação', icon: '💡', desc: 'Pontos de luz, LED' },
    { id: 'windows', label: 'Caixilharia', icon: '🪟', desc: 'Janelas e portas' },
    { id: 'fixtures', label: 'Instalações', icon: '🚿', desc: 'Louças, torneiras' },
];

// ─── Material options per scope ─────────────────────────────────────────────
const materialOptions: Record<string, { id: string; label: string }[]> = {
    floor: [
        { id: 'hardwood', label: 'Madeira Maciça' },
        { id: 'laminate', label: 'Flutuante' },
        { id: 'ceramic', label: 'Cerâmica' },
        { id: 'marble', label: 'Mármore' },
        { id: 'vinyl', label: 'Vinílico' },
        { id: 'microcement', label: 'Microcimento' },
        { id: 'stone', label: 'Pedra Natural' },
    ],
    walls: [
        { id: 'paint', label: 'Pintura Lisa' },
        { id: 'stucco', label: 'Estucado' },
        { id: 'wallpaper', label: 'Papel de Parede' },
        { id: 'tile', label: 'Azulejo' },
        { id: 'stone', label: 'Pedra' },
        { id: 'brick', label: 'Tijolo Exposto' },
        { id: '3d-panel', label: 'Placa 3D' },
        { id: 'microcement', label: 'Microcimento' },
    ],
    ceiling: [
        { id: 'drywall', label: 'Teto Falso (Pladur)' },
        { id: 'sanca', label: 'Sancas / Molduras' },
        { id: 'exposed-beam', label: 'Vigas Expostas' },
        { id: 'wood', label: 'Forro de Madeira' },
        { id: 'paint', label: 'Pintura' },
    ],
    lighting: [
        { id: 'recessed', label: 'Embutida / Focos' },
        { id: 'led-strip', label: 'LED Indireto' },
        { id: 'pendant', label: 'Pendente' },
        { id: 'chandelier', label: 'Candeeiro' },
        { id: 'track', label: 'Calha / Trilho' },
    ],
    windows: [
        { id: 'aluminium', label: 'Alumínio' },
        { id: 'pvc', label: 'PVC' },
        { id: 'wood-frame', label: 'Madeira' },
        { id: 'sliding', label: 'Correr' },
        { id: 'french', label: 'Batente' },
    ],
    fixtures: [
        { id: 'modern', label: 'Moderno / Minimalista' },
        { id: 'classic', label: 'Clássico' },
        { id: 'industrial', label: 'Industrial' },
        { id: 'premium', label: 'Premium / Design' },
    ],
};

// ─── Color palette ──────────────────────────────────────────────────────────
const colorPalette = [
    { id: 'pure-white', label: 'Branco Puro', hex: '#FFFFFF' },
    { id: 'warm-white', label: 'Branco Quente', hex: '#F5F0E8' },
    { id: 'light-gray', label: 'Cinza Claro', hex: '#D1D5DB' },
    { id: 'dark-gray', label: 'Cinza Escuro', hex: '#4B5563' },
    { id: 'beige', label: 'Bege / Areia', hex: '#D4C5A9' },
    { id: 'terracotta', label: 'Terracota', hex: '#C67B5C' },
    { id: 'sage', label: 'Verde Salva', hex: '#9CAF88' },
    { id: 'navy', label: 'Azul Petróleo', hex: '#1E3A5F' },
    { id: 'charcoal', label: 'Antracite', hex: '#2D2D2D' },
    { id: 'gold', label: 'Dourado', hex: '#C5A572' },
];

// ─── Budget levels ──────────────────────────────────────────────────────────
const budgetLevels = [
    { id: 'economic', label: 'Económico', icon: '💰' },
    { id: 'standard', label: 'Standard', icon: '💰💰' },
    { id: 'premium', label: 'Premium', icon: '💰💰💰' },
    { id: 'luxury', label: 'Luxo', icon: '👑' },
];

const progressSteps = [
    'A analisar a divisão…',
    'A planear a remodelação…',
    'A aplicar materiais e acabamentos…',
    'Quase pronto…',
];

export default function AISimulator() {
    // Slider state
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [showHint, setShowHint] = useState(true);

    // Renovation config
    const [selectedScopes, setSelectedScopes] = useState<string[]>(['walls', 'floor']);
    const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({});
    const [selectedColors, setSelectedColors] = useState<string[]>(['warm-white']);
    const [selectedBudget, setSelectedBudget] = useState('standard');
    const [customInstructions, setCustomInstructions] = useState('');

    // Upload & generation state
    const [isUploading, setIsUploading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressStep, setProgressStep] = useState(0);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    // Expanded sections
    const [expandedSection, setExpandedSection] = useState<string | null>('scope');

    const sliderRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ─── Slider logic ──────────────────────────────────────────────────────
    const handleSliderMove = useCallback((clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percentage);
        setShowHint(false);
    }, []);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleSliderMove(e.clientX); };
    const handleTouchMove = (e: React.TouchEvent) => { handleSliderMove(e.touches[0].clientX); };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    // ─── File upload ───────────────────────────────────────────────────────
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsUploading(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) processFile(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target?.result as string);
            setGeneratedImage(null);
            setAiResponse(null);
            setErrorMessage(null);
            setInfoMessage(null);
        };
        reader.readAsDataURL(file);
    };

    // ─── Scope toggle ──────────────────────────────────────────────────────
    const toggleScope = (scopeId: string) => {
        setSelectedScopes(prev =>
            prev.includes(scopeId) ? prev.filter(s => s !== scopeId) : [...prev, scopeId]
        );
    };

    // ─── Color toggle ──────────────────────────────────────────────────────
    const toggleColor = (colorId: string) => {
        setSelectedColors(prev =>
            prev.includes(colorId)
                ? prev.filter(c => c !== colorId)
                : prev.length < 3 ? [...prev, colorId] : [prev[1], prev[2], colorId]
        );
    };

    // ─── Section toggle ────────────────────────────────────────────────────
    const toggleSection = (section: string) => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    // ─── Progress animation ────────────────────────────────────────────────
    const startProgressAnimation = () => {
        let currentStep = 0;
        progressIntervalRef.current = setInterval(() => {
            currentStep++;
            const pct = 90 * (1 - Math.exp(-currentStep / 40));
            setProgress(pct);
            setProgressStep(Math.min(Math.floor(pct / 25), 3));
            if (currentStep >= 180) {
                if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            }
        }, 50);
    };

    const stopProgressAnimation = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    // ─── Generate design ───────────────────────────────────────────────────
    const handleGenerateDesign = async () => {
        if (!uploadedImage) {
            setErrorMessage('Por favor, carregue uma fotografia primeiro.');
            return;
        }
        if (selectedScopes.length === 0) {
            setErrorMessage('Selecione pelo menos um elemento a renovar.');
            return;
        }

        setIsGenerating(true);
        setProgress(0);
        setProgressStep(0);
        setErrorMessage(null);
        setInfoMessage(null);
        setAiResponse(null);

        startProgressAnimation();

        try {
            const response = await fetch('/api/generate-design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: uploadedImage,
                    scopes: selectedScopes,
                    materials: selectedMaterials,
                    colors: selectedColors.map(cId => colorPalette.find(c => c.id === cId)),
                    budget: selectedBudget,
                    customInstructions: customInstructions.trim() || undefined,
                }),
            });

            const data = await response.json();
            stopProgressAnimation();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao gerar o design');
            }

            setProgress(100);
            setProgressStep(3);

            if (data.generatedImage) {
                setGeneratedImage(data.generatedImage);
                setSliderPosition(50);
                setShowHint(true);
            }
            if (data.message) setInfoMessage(data.message);
            if (data.text) setAiResponse(data.text);

            setTimeout(() => setIsGenerating(false), 800);
        } catch (error: unknown) {
            stopProgressAnimation();
            setIsGenerating(false);
            const message = error instanceof Error ? error.message : 'Erro inesperado';
            setErrorMessage(message);
        }
    };

    // ─── Collapsible Section Header ────────────────────────────────────────
    const SectionHeader = ({ id, icon, title, badge }: { id: string; icon: React.ReactNode; title: string; badge?: string }) => (
        <button
            onClick={() => toggleSection(id)}
            className="w-full flex items-center justify-between py-2 group"
        >
            <div className="flex items-center gap-2.5">
                <span className="text-[var(--gold)]">{icon}</span>
                <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.12em]">{title}</span>
                {badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-medium">
                        {badge}
                    </span>
                )}
            </div>
            <ChevronDown
                size={14}
                className={`text-white/30 transition-transform duration-300 ${expandedSection === id ? 'rotate-180' : ''}`}
            />
        </button>
    );

    return (
        <section id="simulador" className="simulator-section">
            <div className="simulator-bg-pattern" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                        style={{
                            background: 'linear-gradient(135deg, rgba(197,165,114,0.15), rgba(197,165,114,0.05))',
                            border: '1px solid rgba(197,165,114,0.3)',
                        }}
                    >
                        <Sparkles size={14} className="text-[var(--gold)]" />
                        <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.25em] uppercase">
                            Simulador de Remodelação
                        </span>
                        <Sparkles size={14} className="text-[var(--gold)]" />
                    </motion.div>

                    <h2 className="section-heading mt-2">
                        Visualize a Sua{' '}
                        <span className="text-gradient-gold">Remodelação</span>
                    </h2>
                    <p className="section-subheading mx-auto" style={{ marginBottom: 0 }}>
                        Carregue uma fotografia, escolha os acabamentos e materiais, e a nossa IA
                        mostra-lhe o resultado da remodelação em segundos.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
                    {/* ─── Comparison Slider ─────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="simulator-slider-wrapper">
                            <div
                                ref={sliderRef}
                                className="simulator-slider"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onTouchMove={handleTouchMove}
                            >
                                {/* BEFORE = Original uploaded photo (full background, visible on LEFT) */}
                                {uploadedImage ? (
                                    <img
                                        src={uploadedImage}
                                        alt="Antes — estado original"
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                ) : (
                                    <Image
                                        src="/images/before.jpeg"
                                        alt="Antes — estado original"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}

                                {/* AFTER = AI-generated (overlay, revealed from RIGHT) */}
                                <div
                                    className="absolute inset-0"
                                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                                >
                                    {generatedImage ? (
                                        <img
                                            src={generatedImage}
                                            alt="Depois — remodelação YSAM"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src="/images/after.jpeg"
                                            alt="Depois — remodelação YSAM"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    )}
                                </div>

                                {/* Handle */}
                                <div className="simulator-handle" style={{ left: `${sliderPosition}%` }}>
                                    <div className="simulator-handle-knob">
                                        <ArrowLeftRight className="text-[var(--dark)]" size={18} />
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="simulator-label simulator-label-left">
                                    <Camera size={12} /> Antes
                                </div>
                                <div className="simulator-label simulator-label-right">
                                    <Wand2 size={12} /> Depois
                                </div>

                                {/* Hint */}
                                <AnimatePresence>
                                    {showHint && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="simulator-hint"
                                        >
                                            <ArrowLeftRight size={16} />
                                            Arraste para comparar
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <p className="text-white/40 text-xs text-center mt-4 tracking-wide">
                            Deslize o cursor para ver o antes e depois da remodelação
                        </p>
                    </motion.div>

                    {/* ─── Controls Panel ────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="simulator-panel">
                            {/* Panel Header */}
                            <div className="simulator-panel-header">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}>
                                        <Wand2 size={18} className="text-[var(--dark)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white">Configurador de Remodelação</h3>
                                        <p className="text-xs text-white/50">Escolha os acabamentos · IA gera o resultado</p>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Zone */}
                            <div
                                className={`simulator-upload ${isUploading ? 'dragover' : ''} ${uploadedImage ? 'has-image' : ''}`}
                                onDragOver={(e) => { e.preventDefault(); setIsUploading(true); }}
                                onDragLeave={() => setIsUploading(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                                {uploadedImage ? (
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm font-medium text-white">Fotografia carregada</p>
                                            <p className="text-xs text-white/50 mt-0.5">Clique para alterar</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="simulator-upload-icon"><Upload size={24} /></div>
                                        <p className="text-sm font-medium text-white mb-1">Carregue uma fotografia da divisão</p>
                                        <p className="text-xs text-white/40">Arraste ou clique para selecionar</p>
                                    </>
                                )}
                            </div>

                            {/* ── Section 1: Renovation Scope ── */}
                            <div className="border-t border-white/5 pt-3">
                                <SectionHeader
                                    id="scope"
                                    icon={<Layers size={13} />}
                                    title="O Que Pretende Renovar"
                                    badge={`${selectedScopes.length} selecionado${selectedScopes.length !== 1 ? 's' : ''}`}
                                />
                                <AnimatePresence>
                                    {expandedSection === 'scope' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-2 pt-2 pb-1">
                                                {renovationScopes.map((scope) => {
                                                    const isSelected = selectedScopes.includes(scope.id);
                                                    return (
                                                        <button
                                                            key={scope.id}
                                                            onClick={() => toggleScope(scope.id)}
                                                            className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${isSelected
                                                                ? 'bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-white'
                                                                : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:bg-white/[0.06]'
                                                                }`}
                                                        >
                                                            <span style={{ fontSize: '16px' }}>{scope.icon}</span>
                                                            <div>
                                                                <p className="text-[11px] font-semibold leading-tight">{scope.label}</p>
                                                                <p className="text-[9px] opacity-50 leading-tight mt-0.5">{scope.desc}</p>
                                                            </div>
                                                            {isSelected && (
                                                                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--gold)]" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Section 2: Materials (contextual) ── */}
                            {selectedScopes.length > 0 && (
                                <div className="border-t border-white/5 pt-3">
                                    <SectionHeader
                                        id="materials"
                                        icon={<Frame size={13} />}
                                        title="Materiais e Acabamentos"
                                        badge={`${Object.keys(selectedMaterials).length} escolhido${Object.keys(selectedMaterials).length !== 1 ? 's' : ''}`}
                                    />
                                    <AnimatePresence>
                                        {expandedSection === 'materials' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-4 pt-2 pb-1">
                                                    {selectedScopes.map(scopeId => {
                                                        const scope = renovationScopes.find(s => s.id === scopeId);
                                                        const materials = materialOptions[scopeId];
                                                        if (!scope || !materials) return null;
                                                        return (
                                                            <div key={scopeId}>
                                                                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mb-2">
                                                                    {scope.icon} {scope.label}
                                                                </p>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {materials.map(mat => (
                                                                        <button
                                                                            key={mat.id}
                                                                            onClick={() => setSelectedMaterials(prev => ({ ...prev, [scopeId]: mat.id }))}
                                                                            className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200 ${selectedMaterials[scopeId] === mat.id
                                                                                ? 'bg-[var(--gold)] text-[var(--dark)]'
                                                                                : 'bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.08]'
                                                                                }`}
                                                                        >
                                                                            {mat.label}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* ── Section 3: Color Palette ── */}
                            <div className="border-t border-white/5 pt-3">
                                <SectionHeader
                                    id="colors"
                                    icon={<Paintbrush size={13} />}
                                    title="Paleta de Cores"
                                    badge={`${selectedColors.length} cor${selectedColors.length !== 1 ? 'es' : ''}`}
                                />
                                <AnimatePresence>
                                    {expandedSection === 'colors' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-[10px] text-white/30 mb-3 pt-1">Selecione até 3 cores da paleta pretendida</p>
                                            <div className="flex flex-wrap gap-2.5 pb-1">
                                                {colorPalette.map(color => {
                                                    const isSelected = selectedColors.includes(color.id);
                                                    return (
                                                        <button
                                                            key={color.id}
                                                            onClick={() => toggleColor(color.id)}
                                                            className="group flex flex-col items-center gap-1.5"
                                                            title={color.label}
                                                        >
                                                            <div
                                                                className={`w-8 h-8 rounded-full transition-all duration-200 ${isSelected
                                                                    ? 'ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--dark)] scale-110'
                                                                    : 'ring-1 ring-white/10 hover:ring-white/30'
                                                                    }`}
                                                                style={{ backgroundColor: color.hex }}
                                                            />
                                                            <span className={`text-[9px] leading-tight ${isSelected ? 'text-[var(--gold)]' : 'text-white/30'}`}>
                                                                {color.label}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Section 4: Budget Level ── */}
                            <div className="border-t border-white/5 pt-3">
                                <SectionHeader
                                    id="budget"
                                    icon={<Lightbulb size={13} />}
                                    title="Nível de Acabamento"
                                />
                                <AnimatePresence>
                                    {expandedSection === 'budget' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-4 gap-2 pt-2 pb-1">
                                                {budgetLevels.map(level => (
                                                    <button
                                                        key={level.id}
                                                        onClick={() => setSelectedBudget(level.id)}
                                                        className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-center transition-all duration-200 ${selectedBudget === level.id
                                                            ? 'bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-white'
                                                            : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:bg-white/[0.06]'
                                                            }`}
                                                    >
                                                        <span className="text-sm">{level.icon}</span>
                                                        <span className="text-[10px] font-semibold">{level.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Section 5: Custom Instructions ── */}
                            <div className="border-t border-white/5 pt-3">
                                <SectionHeader
                                    id="notes"
                                    icon={<MessageSquare size={13} />}
                                    title="Notas Adicionais"
                                />
                                <AnimatePresence>
                                    {expandedSection === 'notes' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <textarea
                                                value={customInstructions}
                                                onChange={(e) => setCustomInstructions(e.target.value)}
                                                placeholder="Ex: Quero manter as vigas originais, pintar a parede de fundo em azul, chão em madeira clara…"
                                                maxLength={400}
                                                rows={3}
                                                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--gold)]/50 transition-all mt-2"
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                }}
                                            />
                                            <p className="text-right text-[10px] text-white/20 mt-1">{customInstructions.length}/400</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Generate Button ── */}
                            <div className="border-t border-white/5 pt-4">
                                <button
                                    onClick={handleGenerateDesign}
                                    disabled={isGenerating || !uploadedImage}
                                    className="simulator-generate-btn"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-[var(--dark)] border-t-transparent rounded-full animate-spin" />
                                            A gerar remodelação…
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            Simular Remodelação
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Progress */}
                            <AnimatePresence>
                                {isGenerating && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        <div className="simulator-progress">
                                            <div className="simulator-progress-fill" style={{ width: `${progress}%` }} />
                                        </div>
                                        <p className="text-xs text-[var(--gold)] text-center font-medium">
                                            {progressSteps[progressStep]}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error */}
                            <AnimatePresence>
                                {errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="rounded-lg px-4 py-3 text-sm text-red-300 border border-red-500/30"
                                        style={{ background: 'rgba(239,68,68,0.1)' }}
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Info / Fallback */}
                            <AnimatePresence>
                                {infoMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="rounded-lg px-4 py-3 text-sm text-amber-300 border border-amber-500/30"
                                        style={{ background: 'rgba(245,158,11,0.1)' }}
                                    >
                                        ⚠️ {infoMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* AI Text Response */}
                            <AnimatePresence>
                                {aiResponse && !isGenerating && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="rounded-lg px-4 py-3 text-xs text-white/70 leading-relaxed max-h-40 overflow-y-auto"
                                        style={{
                                            background: 'rgba(197,165,114,0.08)',
                                            border: '1px solid rgba(197,165,114,0.2)',
                                        }}
                                    >
                                        <p className="text-[var(--gold)] text-[10px] uppercase tracking-[0.15em] font-semibold mb-1.5">
                                            🏗️ Detalhes da Remodelação
                                        </p>
                                        {aiResponse}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ── Download & Share Actions ── */}
                            <AnimatePresence>
                                {generatedImage && !isGenerating && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-3"
                                    >
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.12em] font-semibold text-center">
                                            Guardar ou Partilhar Resultado
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {/* Download */}
                                            <button
                                                onClick={() => {
                                                    if (!generatedImage) return;
                                                    // Convert data URL to Blob for reliable download
                                                    const parts = generatedImage.match(/^data:(.+);base64,(.+)$/);
                                                    if (!parts) return;
                                                    const mime = parts[1];
                                                    const ext = mime.includes('png') ? 'png' : 'jpeg';
                                                    const byteString = atob(parts[2]);
                                                    const ab = new ArrayBuffer(byteString.length);
                                                    const ia = new Uint8Array(ab);
                                                    for (let i = 0; i < byteString.length; i++) {
                                                        ia[i] = byteString.charCodeAt(i);
                                                    }
                                                    const blob = new Blob([ab], { type: mime });
                                                    const url = URL.createObjectURL(blob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = `YSAM-Remodelacao-${Date.now()}.${ext}`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    URL.revokeObjectURL(url);
                                                }}
                                                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg transition-all duration-200 bg-white/[0.04] border border-white/[0.08] hover:bg-[var(--gold)]/15 hover:border-[var(--gold)]/30 group"
                                            >
                                                <Download size={16} className="text-white/50 group-hover:text-[var(--gold)] transition-colors" />
                                                <span className="text-[10px] font-medium text-white/50 group-hover:text-white/80 transition-colors">Guardar</span>
                                            </button>

                                            {/* WhatsApp */}
                                            <button
                                                onClick={() => {
                                                    const msg = encodeURIComponent(
                                                        `Olá YSAM! 👋\n\nGerei uma simulação de remodelação no vosso site e gostaria de pedir um orçamento.\n\nDetalhes da remodelação:\n- Elementos: ${selectedScopes.map(s => renovationScopes.find(r => r.id === s)?.label).filter(Boolean).join(', ')}\n- Nível: ${selectedBudget}\n${customInstructions ? `- Notas: ${customInstructions}` : ''}\n\nPor favor vejam a imagem que descarreguei do simulador. Obrigado!`
                                                    );
                                                    window.open(`https://wa.me/244924625000?text=${msg}`, '_blank');
                                                }}
                                                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg transition-all duration-200 bg-white/[0.04] border border-white/[0.08] hover:bg-green-500/15 hover:border-green-500/30 group"
                                            >
                                                <Phone size={16} className="text-white/50 group-hover:text-green-400 transition-colors" />
                                                <span className="text-[10px] font-medium text-white/50 group-hover:text-white/80 transition-colors">WhatsApp</span>
                                            </button>

                                            {/* Email */}
                                            <button
                                                onClick={() => {
                                                    const subject = encodeURIComponent('Pedido de Orçamento — Simulação de Remodelação YSAM');
                                                    const body = encodeURIComponent(
                                                        `Olá Equipa YSAM,\n\nGerei uma simulação de remodelação no vosso website e gostaria de pedir um orçamento.\n\nDetalhes da remodelação pretendida:\n- Elementos a renovar: ${selectedScopes.map(s => renovationScopes.find(r => r.id === s)?.label).filter(Boolean).join(', ')}\n- Nível de acabamento: ${selectedBudget}\n${customInstructions ? `- Notas adicionais: ${customInstructions}` : ''}\n\nEm anexo envio a imagem gerada pelo simulador.\n\nAguardo o vosso contacto.\nObrigado!`
                                                    );
                                                    window.open(`mailto:geral@orgysam.com?subject=${subject}&body=${body}`, '_blank');
                                                }}
                                                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg transition-all duration-200 bg-white/[0.04] border border-white/[0.08] hover:bg-[var(--gold)]/15 hover:border-[var(--gold)]/30 group"
                                            >
                                                <Mail size={16} className="text-white/50 group-hover:text-[var(--gold)] transition-colors" />
                                                <span className="text-[10px] font-medium text-white/50 group-hover:text-white/80 transition-colors">Email</span>
                                            </button>
                                        </div>

                                        {/* CTA to request a quote */}
                                        <a
                                            href="#contactos"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(197,165,114,0.2), rgba(197,165,114,0.08))',
                                                border: '1px solid rgba(197,165,114,0.3)',
                                                color: 'var(--gold)',
                                            }}
                                        >
                                            <Share2 size={14} />
                                            Pedir Orçamento com Esta Simulação
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer */}
                            <p className="text-white/25 text-[10px] text-center leading-relaxed">
                                Simulação gerada por IA Seedream. Imagens ilustrativas — contacte-nos
                                para um orçamento personalizado.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
