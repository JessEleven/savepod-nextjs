'use client'

import { authClient } from '@/libs/auth-client'
import { GitHubIcon } from '@/resources/icons/brand-icons'

export function LoginWithGitHub() {
  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/home',
      })
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return (
    <button
      type='submit'
      aria-label='GitHub'
      className='flex w-full cursor-pointer items-center justify-center gap-x-1.5 rounded-md bg-neutral-100 py-1.5 transition-colors duration-200 ease-in-out hover:bg-neutral-200/90'
      onClick={signInWithGithub}
    >
      <GitHubIcon className='text-neutral-900' />
      <span>Continue with GitHub</span>
    </button>
  )
}
