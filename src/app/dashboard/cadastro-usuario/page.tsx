// src/app/dashboard/cadastro-usuario/page.tsx
'use client'

import {
    useForm,
    SubmitHandler,
    Controller,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import InputMask from 'react-input-mask'
import { toast } from 'sonner'
import Image from 'next/image'

const schema = z.object({
    nome: z.string().min(3, 'Nome obrigatório'),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(11, 'Telefone inválido'),
    senha: z.string().min(6, 'Mínimo 6 caracteres'),
    imagem: z.any().optional(),
})

type FormData = z.infer<typeof schema>

export default function CadastroUsuarioPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const router = useRouter()
    const [carregando, setCarregando] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setCarregando(true)

        // 1. Cria usuário no Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.senha,
        })

        if (authError || !authData.user) {
            toast.error('Erro ao criar usuário')
            setCarregando(false)
            return
        }

        let avatar_url = 'https://via.placeholder.com/150' // Default

        // 2. Upload da imagem (opcional)
        if (data.imagem?.[0]) {
            const file = data.imagem[0]
            const fileName = `${Date.now()}_${file.name}`
            const { data: imageData, error: imageError } = await supabase.storage
                .from('box')
                .upload(`perfil/${fileName}`, file)

            if (!imageError && imageData) {
                const { data: urlData } = supabase.storage
                    .from('box')
                    .getPublicUrl(`perfil/${fileName}`)

                avatar_url = urlData?.publicUrl ?? avatar_url
            }
        }

        // 3. Insere na tabela `usuarios`
        const { error: insertError } = await supabase.from('usuarios').insert([
            {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senha: data.senha,
                avatar_url,
                user_id: authData.user.id,
            },
        ])

        if (insertError) {
            toast.error('Erro ao salvar no banco')
            setCarregando(false)
            return
        }

        toast.success('Usuário cadastrado com sucesso!')
        reset()
        setPreview(null)
        router.push('/dashboard')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Cadastro de Usuário
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input placeholder="Nome completo" {...register('nome')} />
                {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

                <Input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                        <InputMask
                            mask="(99) 99999-9999"
                            className="w-full border rounded px-4 py-2"
                            placeholder="Telefone"
                            {...field}
                        />
                    )}
                />


                {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}

                <Input type="password" placeholder="Senha" {...register('senha')} />
                {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Foto de perfil (opcional)</label>
                    <Input
                        type="file"
                        accept="image/*"
                        {...register('imagem')}
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                setPreview(URL.createObjectURL(file))
                            }
                        }}
                    />
                    {preview && (
                        <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={96}
                                height={96}
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                <Button type="submit" className="w-full mt-4" disabled={carregando}>
                    {carregando ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
            </form>
        </motion.div>
    )
}
