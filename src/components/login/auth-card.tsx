import { LoginWithGitHub } from './social-login-buttons'

export default function AuthCard() {
  return (
    <div className='my-3 mr-3 flex items-center justify-center rounded-[10px] bg-neutral-900/75 p-10 lg:col-span-4 lg:p-14'>
      <div className='w-full max-w-sm text-white'>
        <h2 className='mb-6 font-semibold text-3xl lg:text-4xl'>Login</h2>
        <p className='mb-4 text-normal'>Create an account to get started.</p>

        <div className='font-normal text-neutral-800'>
          {/* Button for GitHub */}
          <LoginWithGitHub />
        </div>
      </div>
    </div>
  )
}
