import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// ─── Material labels for prompt construction ─────────────────────────────────
const materialLabels: Record<string, Record<string, string>> = {
    floor: {
        hardwood: 'solid hardwood flooring',
        laminate: 'laminate floating floor',
        ceramic: 'ceramic tile flooring',
        marble: 'polished marble floor',
        vinyl: 'luxury vinyl plank flooring',
        microcement: 'microcement floor finish',
        stone: 'natural stone flooring',
    },
    walls: {
        paint: 'smooth matte painted walls',
        stucco: 'venetian stucco finish',
        wallpaper: 'modern wallpaper',
        tile: 'decorative wall tiles',
        stone: 'natural stone cladding',
        brick: 'exposed brick walls',
        '3d-panel': '3D decorative wall panels',
        microcement: 'microcement wall finish',
    },
    ceiling: {
        drywall: 'drywall false ceiling with integrated lighting',
        sanca: 'crown molding sanca with indirect LED lighting',
        'exposed-beam': 'exposed structural wooden beams',
        wood: 'wooden ceiling paneling',
        paint: 'freshly painted smooth ceiling',
    },
    lighting: {
        recessed: 'recessed downlights / spotlights',
        'led-strip': 'indirect LED strip lighting',
        pendant: 'modern pendant lights',
        chandelier: 'elegant chandelier',
        track: 'track lighting system',
    },
    windows: {
        aluminium: 'modern aluminium window frames',
        pvc: 'PVC double-glazed window frames',
        'wood-frame': 'natural wood window frames',
        sliding: 'sliding glass windows',
        french: 'casement / French-style windows',
    },
    fixtures: {
        modern: 'modern minimalist fixtures and fittings',
        classic: 'classic traditional fixtures and fittings',
        industrial: 'industrial-style exposed fixtures',
        premium: 'premium designer fixtures and fittings',
    },
};

const scopeLabels: Record<string, string> = {
    floor: 'floors/pavimento',
    walls: 'walls/paredes',
    ceiling: 'ceiling/teto',
    lighting: 'lighting/iluminação',
    windows: 'windows and doors/caixilharia',
    fixtures: 'plumbing fixtures and fittings/instalações',
};

const budgetDescriptions: Record<string, string> = {
    economic: 'cost-effective, practical renovation with affordable materials',
    standard: 'mid-range renovation with good quality materials and finishes',
    premium: 'high-end renovation with premium materials and superior craftsmanship',
    luxury: 'ultra-luxury renovation with the finest materials, bespoke details and exquisite finishes',
};

// ─── Build the renovation prompt ─────────────────────────────────────────────
function buildRenovationPrompt(
    scopes: string[],
    materials: Record<string, string>,
    colors: { id: string; label: string; hex: string }[],
    budget: string,
    customInstructions: string
): string {
    let renovationDetails = '';
    for (const scope of scopes) {
        const scopeLabel = scopeLabels[scope] || scope;
        const materialId = materials[scope];
        const materialDesc = materialId && materialLabels[scope]?.[materialId]
            ? materialLabels[scope][materialId]
            : null;

        if (materialDesc) {
            renovationDetails += `- Change the ${scopeLabel} to: ${materialDesc}\n`;
        } else {
            renovationDetails += `- Renovate the ${scopeLabel} (choose appropriate modern materials)\n`;
        }
    }

    let colorDesc = '';
    if (colors.length > 0) {
        const colorNames = colors.map(c => `${c.label} (${c.hex})`).join(', ');
        colorDesc = `Use this color palette: ${colorNames}.`;
    }

    const budgetDesc = budgetDescriptions[budget] || budgetDescriptions.standard;

    return `Edit this room photo to show how it will look AFTER a complete, finished professional renovation. The room must appear fully COMPLETED, CLEAN, and MOVE-IN READY — not under construction.

You MUST preserve the EXACT same room:
- SAME camera angle and perspective — do NOT rotate, shift, or change the viewpoint
- SAME room layout, walls positions, doors positions, windows positions
- SAME room dimensions and proportions
- SAME spatial composition and depth

Apply these renovation changes to transform the room into a beautiful, finished space:
${renovationDetails}
${colorDesc}

Quality level: ${budgetDesc}.

${customInstructions ? `Additional notes: ${customInstructions}` : ''}

CRITICAL RULES:
1. Show the room as COMPLETELY FINISHED — all renovation work is done, the space is pristine and ready to live in.
2. REMOVE any construction debris, tools, dust, plastic covers, tape, or unfinished work from the scene.
3. All surfaces must be perfectly finished — smooth walls, clean floors, polished fixtures, installed lighting.
4. The room should look professionally staged, clean, and inviting — like an interior design magazine photo.
5. Do NOT change the room shape, camera position, viewing angle, or perspective in any way.
6. Do NOT rearrange furniture or change the room structure — only upgrade the finishes and materials.
7. Keep the same natural lighting direction and window positions.
Photorealistic, completed renovation, interior design photography, pristine and clean space.`;
}

// ─── Resize image to stay within API limits ──────────────────────────────────
function ensureImageSizeLimit(dataUri: string, maxSizeBytes: number = 8 * 1024 * 1024): string {
    // Check the approximate size of the base64 portion
    const matches = dataUri.match(/^data:(.+);base64,(.+)$/);
    if (!matches) return dataUri;

    const base64Data = matches[2];
    const estimatedBytes = (base64Data.length * 3) / 4;

    if (estimatedBytes <= maxSizeBytes) {
        return dataUri; // Already within limits
    }

    // If over limit, we'll let the API handle it and catch errors
    return dataUri;
}

export async function POST(request: NextRequest) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const byteplusApiKey = process.env.BYTEPLUS_API_KEY;

    if (!geminiApiKey || geminiApiKey === 'YOUR_API_KEY_HERE') {
        return NextResponse.json(
            { error: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env.local' },
            { status: 500 }
        );
    }

    try {
        const { image, scopes, materials, colors, budget, customInstructions } = await request.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const scopeList = (scopes || []) as string[];
        const materialSelections = (materials || {}) as Record<string, string>;
        const colorSelections = (colors || []) as { id: string; label: string; hex: string }[];
        const budgetLevel = budget || 'standard';
        const userNotes = customInstructions || '';

        const prompt = buildRenovationPrompt(
            scopeList,
            materialSelections,
            colorSelections,
            budgetLevel,
            userNotes
        );

        // Ensure the image format is correct
        const imageDataUri = ensureImageSizeLimit(image);

        // Extract base64 data and mime type from the uploaded image
        const matches = image.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
        }
        const mimeType = matches[1];
        const base64Data = matches[2];

        // ─── Attempt 1: Gemini Flash 2.5 Image Generation (PRIMARY) ─────────
        try {
            console.log('Calling Gemini Flash 2.5 image generation (primary)...');
            const genAI = new GoogleGenerativeAI(geminiApiKey);

            const geminiPrompt = `You are a professional renovation contractor and construction expert. 
Analyze this room photo and generate a photorealistic image showing ONLY the following renovation changes:

${prompt}

Generate a photorealistic image of this room after the renovation work is completed.`;

            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash-image',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                generationConfig: {
                    responseModalities: ['TEXT', 'IMAGE'],
                } as any,
            });

            const result = await model.generateContent([
                { inlineData: { mimeType, data: base64Data } },
                geminiPrompt,
            ]);

            const response = result.response;
            const candidates = response.candidates;
            let generatedImage: string | null = null;
            let text = '';

            if (candidates && candidates.length > 0) {
                const content = candidates[0].content;
                if (content && content.parts) {
                    for (const part of content.parts) {
                        if (part.text) text += part.text;
                        if (part.inlineData) {
                            generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        }
                    }
                }
            }

            if (!generatedImage) {
                throw new Error('No image generated by Gemini API');
            }

            return NextResponse.json({
                text,
                generatedImage,
                success: true,
            });

        } catch (geminiError: any) {
            const errorMsg = geminiError.message || geminiError.toString();
            console.warn('Gemini image generation failed, attempting BytePlus fallback:', errorMsg);

            const isQuotaError = errorMsg.includes('429') || errorMsg.includes('Quota') || errorMsg.includes('limit') || errorMsg.includes('rate') || errorMsg.includes('RESOURCE_EXHAUSTED');
            const isServerError = errorMsg.includes('500') || errorMsg.includes('503');

            // ─── Attempt 2: BytePlus Seedream-4.5 I2I (FALLBACK) ─────────
            if (byteplusApiKey) {
                try {
                    console.log('Falling back to BytePlus Seedream-4.5 I2I...');

                    const seedreamResponse = await fetch(
                        'https://ark.ap-southeast.bytepluses.com/api/v3/images/generations',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${byteplusApiKey}`,
                            },
                            body: JSON.stringify({
                                model: 'seedream-4-5-251128',
                                prompt: prompt,
                                image: imageDataUri,
                                guidance_scale: 6,
                                sequential_image_generation: 'disabled',
                                response_format: 'b64_json',
                                size: '2K',
                                stream: false,
                                watermark: false,
                            }),
                        }
                    );

                    if (!seedreamResponse.ok) {
                        const errorData = await seedreamResponse.text();
                        console.error('Seedream API error:', seedreamResponse.status, errorData);
                        throw new Error(`Seedream API error ${seedreamResponse.status}: ${errorData}`);
                    }

                    const seedreamData = await seedreamResponse.json();
                    console.log('Seedream API response received (fallback)');

                    let generatedImage: string | null = null;
                    let revisedPrompt = '';

                    if (seedreamData.data && seedreamData.data.length > 0) {
                        const imageResult = seedreamData.data[0];

                        if (imageResult.b64_json) {
                            generatedImage = `data:image/png;base64,${imageResult.b64_json}`;
                        } else if (imageResult.url) {
                            const imgResponse = await fetch(imageResult.url);
                            const imgBuffer = await imgResponse.arrayBuffer();
                            const imgBase64 = Buffer.from(imgBuffer).toString('base64');
                            const contentType = imgResponse.headers.get('content-type') || 'image/png';
                            generatedImage = `data:${contentType};base64,${imgBase64}`;
                        }

                        if (imageResult.revised_prompt) {
                            revisedPrompt = imageResult.revised_prompt;
                        }
                    }

                    if (!generatedImage) {
                        throw new Error('No image generated by Seedream API');
                    }

                    return NextResponse.json({
                        text: revisedPrompt || null,
                        generatedImage,
                        success: true,
                        message: 'Imagem gerada pelo motor alternativo (BytePlus Seedream).',
                    });

                } catch (seedreamError: any) {
                    console.warn('BytePlus Seedream fallback also failed:', seedreamError.message);
                }
            }

            // ─── Attempt 3: Gemini text-only fallback (LAST RESORT) ─────────
            try {
                console.log('Falling back to Gemini text-only...');
                const genAI = new GoogleGenerativeAI(geminiApiKey);
                const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
                const fallbackPrompt = `You are a professional renovation contractor. Analyze this room photo and provide a detailed renovation plan for the following scope of work:

${prompt}

Provide:
1. A step-by-step renovation plan
2. Recommended materials with estimated quantities
3. Key considerations and potential challenges
4. Approximate timeline for the work

Keep it practical and focused on construction/renovation (not interior design).`;

                const fallbackResult = await fallbackModel.generateContent([
                    { inlineData: { mimeType, data: base64Data } },
                    fallbackPrompt,
                ]);

                const fallbackText = fallbackResult.response.text();

                return NextResponse.json({
                    text: fallbackText,
                    generatedImage: null,
                    success: true,
                    isFallback: true,
                    message: 'Serviço de imagens temporariamente indisponível. A apresentar plano de remodelação detalhado.',
                });

            } catch (textFallbackError: any) {
                console.error('Gemini text-only fallback also failed:', textFallbackError.message);
            }

            // All attempts failed
            if (isQuotaError) {
                return NextResponse.json(
                    { error: 'Limite de utilização atingido. Por favor tente mais tarde.' },
                    { status: 429 }
                );
            }

            throw geminiError;
        }

    } catch (error: unknown) {
        console.error('API error:', error);
        const message = error instanceof Error ? error.message : 'Failed to generate design';

        if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
            return NextResponse.json(
                { error: 'Limite de utilização atingido. Por favor tente mais tarde.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: `Erro ao gerar o design: ${message}` },
            { status: 500 }
        );
    }
}
