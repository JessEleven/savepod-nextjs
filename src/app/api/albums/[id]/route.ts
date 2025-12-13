import { and, eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { db } from '@/db/drizzle'
import { album } from '@/db/sql/album-schema'
import { getAuthenticatedUser } from '@/helpers/get-authenticated-user'
import { ApiResponse } from '@/libs/api-response'
import { pickAlbumFieldsForGet, pickAlbumFieldsForPatch } from '@/utils/pick-fields/albums'
import { isValidNanoid } from '@/utils/validate-id'

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const id = request.nextUrl.pathname.split('/').pop()

    if (!id || !isValidNanoid(id)) {
      return ApiResponse.clientError('The ID is missing to get the album', 400)
    }

    const result = await db.query.album.findFirst({
      where: and(eq(album.id, id), eq(album.userId, user.id), eq(album.favorite, false)),
    })

    if (!result) {
      return ApiResponse.clientError('The album was not found', 404, [])
    }
    const pickResult = pickAlbumFieldsForGet(result)

    return ApiResponse.success('The album successfully found', 200, pickResult)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return ApiResponse.serverError(message, 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const id = request.nextUrl.pathname.split('/').pop()

    if (!id || !isValidNanoid(id)) {
      return ApiResponse.clientError('The ID is missing to update album', 400)
    }
    const { title, description } = await request.json()

    const result = await db
      .update(album)
      .set({
        title,
        description,
      })
      .where(and(eq(album.id, id), eq(album.userId, user.id), eq(album.favorite, false)))
      .returning()

    if (!result.length) {
      return ApiResponse.clientError('The album was not found', 404, [])
    }
    const pickResult = result.map(pickAlbumFieldsForPatch)

    return ApiResponse.success('The album updated successfully', 200, pickResult)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return ApiResponse.serverError(message, 500)
  }
}
