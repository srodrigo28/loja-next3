'use client'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ReactInputMask from 'react-input-mask'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormData, perfilSchema } from './schema'

interface Props {
  defaultValues: FormData
  onSubmit: (data: FormData) => void
  loading: boolean
}

export function FormPerfil({ defaultValues, onSubmit, loading }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input placeholder="Nome completo" {...register('nome')} />
        {errors.nome && (
          <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <ReactInputMask
              mask="(99) 99999-9999"
              className="w-full border rounded px-4 py-2"
              placeholder="Telefone"
              {...field}
            />
          )}
        />
        {errors.telefone && (
          <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <Input type="email" placeholder="Email" {...register('email')} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </form>
  )
}
