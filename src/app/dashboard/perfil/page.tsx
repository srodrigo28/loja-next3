'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { AvatarUpload } from './AvatarUpload'
import { FormPerfil } from './FormPerfil'
import { FormData } from './schema'

export default function PerfilPage() {
  const { user, setUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (user?.avatar_url) {
      setPreview(user.avatar_url)
    }
  }, [user])

  async function onSubmit(data: FormData) {
    setLoading(true)
    let avatar_url = user?.avatar_url || ''

    const fileInput = document.getElementById('file') as HTMLInputElement
    const file = fileInput?.files?.[0]

    if (file) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('box')
        .upload(`perfil/${user?.id}-${file.name}`, file, {
          upsert: true,
          contentType: file.type,
        })

      if (uploadError) {
        toast.error('Erro ao enviar imagem.')
        setLoading(false)
        return
      }

      avatar_url = supabase.storage.from('box').getPublicUrl(uploadData.path).data.publicUrl
    }

    const { error } = await supabase
      .from('usuarios')
      .update({ ...data, avatar_url })
      .eq('id', user?.id)

    if (error) {
      toast.error('Erro ao atualizar perfil.')
    } else {
      toast.success('Perfil atualizado com sucesso!')
      setUser({ ...user!, ...data, avatar_url })
    }

    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto py-10 px-4"
    >
      <div className="bg-white shadow-md rounded-xl p-6">
        <AvatarUpload preview={preview} avatar_url={user?.avatar_url} onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) setPreview(URL.createObjectURL(file))
        }} />
        <FormPerfil
          defaultValues={{
            nome: user?.nome || '',
            telefone: user?.telefone || '',
            email: user?.email || '',
          }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </motion.div>
  )
}