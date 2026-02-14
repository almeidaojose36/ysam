'use server';

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    phone: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

export async function submitContactForm(formData: FormData) {
    const validatedFields = contactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Por favor, verifique os campos e tente novamente.',
        };
    }

    const { name, email, phone, service, message } = validatedFields.data;

    try {
        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('messages')
            .insert([
                {
                    name,
                    email,
                    phone,
                    service,
                    message,
                    created_at: new Date().toISOString(),
                },
            ]);

        if (dbError) {
            console.error('Supabase Error:', dbError);
            throw new Error('Falha ao salvar a mensagem.');
        }

        // 2. Send email notification via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'YSAM Website <onboarding@resend.dev>', // Use verified domain later
            to: ['contacto@grupoysam.com'], // Update with verified email
            subject: `Novo Pedido de Orçamento: ${name} (${service || 'Geral'})`,
            html: `
        <h1>Novo Contacto via Website</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Serviço de Interesse:</strong> ${service || 'Não especificado'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
        });

        if (emailError) {
            console.error('Resend Error:', emailError);
            // We don't throw here because DB save succeeded, just log it
        }

        return { success: true, message: 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.' };
    } catch (error) {
        console.error('Submission Error:', error);
        return { success: false, message: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' };
    }
}
