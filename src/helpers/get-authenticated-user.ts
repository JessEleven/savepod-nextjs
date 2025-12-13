import { headers } from 'next/headers'
import { ApiResponse } from '@/libs/api-response'
import { auth } from '@/libs/auth'

export async function getAuthenticatedUser() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  const user = data?.user

  if (!user) {
    return {
      error: ApiResponse.clientError('User is not authenticated', 401),
      user: null,
    }
  }
  return { user, error: null }
}
