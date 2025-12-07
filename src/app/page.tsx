import AuthCard from '@/components/login/auth-card'

export default function HomePage() {
  return (
    <main className='grid min-h-screen grid-cols-1 bg-neutral-800 lg:grid-cols-9 xl:grid-cols-10 2xl:grid-cols-12'>
      {/* Column left: Welcome */}
      <div className='flex flex-col justify-center p-10 text-white lg:col-span-5 lg:p-16 xl:col-span-6 2xl:col-span-8'>
        <h1 className='mb-6 font-bold text-4xl lg:text-5xl'>Welcome to our platform</h1>
        <p className='text-lg opacity-80 lg:text-xl'>
          Manage your albums and photos in the fastest way.
        </p>
      </div>

      {/* Column right: Login */}
      <AuthCard />
    </main>
  )
}
