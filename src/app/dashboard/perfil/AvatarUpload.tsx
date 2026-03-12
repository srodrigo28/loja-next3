'use client'

import { AvatarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

interface Props {
  preview: string | null
  avatar_url?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AvatarUpload({ preview, avatar_url, onChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      {preview ? (
        <Image src={preview} alt="Preview" width={120} height={160} className="rounded-full border" />
      ) : avatar_url ? (
        <Image src={avatar_url} alt="Avatar" width={120} height={160} className="rounded-full border" />
      ) : (
        <div className="w-[120px] h-[160px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <AvatarIcon className="w-8 h-8" />
        </div>
      )}
      <label htmlFor="file" className="text-sm text-blue-600 hover:underline cursor-pointer">
        Alterar imagem
      </label>
      <input id="file" type="file" accept="image/*" onChange={onChange} className="hidden" />
    </div>
  )
}
