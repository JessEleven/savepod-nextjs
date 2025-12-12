import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/libs/auth'

export async function getAuthenticatedUser() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  const user = data?.user

  if (!user) {
    return {
      error: NextResponse.json(
        {
          success: false,
          status_code: 401,
          message: 'User is not authenticated',
        },
        { status: 401 }
      ),
      user: null,
    }
  }
  return { user, error: null }
}
