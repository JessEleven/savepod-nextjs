'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { createAlbum } from '@/libs/fetch-api/album'
import { type CreateAlbumInput, createAlbumSchema } from '@/schemas/album.schema'

export default function NewAlbumPage() {
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateAlbumInput>({
    resolver: zodResolver(createAlbumSchema),
    mode: 'onChange',
  })

  const onSubmit = async (formData: CreateAlbumInput) => {
    const result = await createAlbum(formData)

    if (result.success) {
      router.push(`/albums/${result.data[0].id}`)
      router.refresh()
    }
  }

  // Function to adjust the height of the textarea
  const handleInput = () => {
    const el = textareaRef.current

    if (!el) return
    el.style.height = 'auto' // reset
    el.style.height = `${el.scrollHeight}px`
  }

  useEffect(() => {
    handleInput()
  }, [])

  return (
    <main className='flex items-center justify-center text-sm'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-10 flex w-full flex-col md:w-96 lg:w-[484px]'
      >
        <h2 className='font-medium text-2xl'>Create Album</h2>
        <p className='mt-2 text-neutral-400 text-sm'>Organize your images into a new album.</p>

        <label
          htmlFor='title'
          className='mt-4 mb-2'
        >
          Title
        </label>
        <input
          id='title'
          type='text'
          className='rounded-five px-2.5 py-1.5 outline-none ring-1 ring-neutral-700 focus:ring-neutral-500'
          placeholder='e.g., Vacations'
          {...register('title')}
        />

        {errors.title && (
          <span className='mt-2 text-[13px] text-rose-400'>{errors.title.message}</span>
        )}

        <label
          htmlFor='description'
          className='mt-4 mb-2'
        >
          Description
        </label>

        <div className='rounded-five ring-1 ring-neutral-700 transition focus-within:ring-neutral-500'>
          <textarea
            id='description'
            rows={3}
            className='scrollbar-custom max-h-[92px] w-full resize-none bg-transparent px-2.5 py-1.5 text-sm outline-none'
            placeholder='Is optional'
            {...register('description')}
            ref={(e) => {
              register('description').ref(e)
              textareaRef.current = e
            }}
            onInput={handleInput}
          />
          <h3
            className={`pr-2.5 pb-1.5 text-right text-neutral-400 text-xs ${(watch('description')?.length ?? 0) >= 250 && 'text-rose-400'}`}
          >
            {watch('description')?.length || 0}/250
          </h3>
        </div>

        {errors.description && (
          <span className='mt-2 text-[13px] text-rose-400'>{errors.description.message}</span>
        )}

        <div className='mt-7 flex items-center justify-end gap-x-4'>
          <Link
            href='/albums'
            className='app-transition block rounded-five border border-zinc-500/50 px-4 py-[5px] hover:bg-zinc-500/20'
          >
            Cancel
          </Link>

          <button
            type='submit'
            disabled={!isValid}
            className='app-transition cursor-pointer rounded-five bg-emerald-700 px-4 py-[5px] hover:bg-emerald-700/80 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </main>
  )
}
