import { and, eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { album } from '@/db/sql/album-schema'
import { getAuthenticatedUser } from '@/helpers/get-authenticated-user'
import { pickAlbumFieldsForGet, pickAlbumFieldsForPatch } from '@/utils/pick-fields/albums'
import { isValidNanoid } from '@/utils/validate-id'

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const id = request.nextUrl.pathname.split('/').pop()

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json(
        {
          success: false,
          status_code: 400,
          message: 'The ID is missing to get the album',
        },
        { status: 400 }
      )
    }

    const result = await db.query.album.findFirst({
      where: and(eq(album.id, id), eq(album.userId, user.id), eq(album.favorite, false)),
    })

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          status_code: 404,
          message: 'The album was not found',
          data: [],
        },
        { status: 404 }
      )
    }
    const pickResult = pickAlbumFieldsForGet(result)

    return NextResponse.json(
      {
        success: true,
        status_code: 200,
        message: 'The album successfully found',
        data: pickResult,
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return NextResponse.json(
      {
        success: false,
        status_code: 500,
        message,
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const id = request.nextUrl.pathname.split('/').pop()

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json(
        {
          success: false,
          status_code: 400,
          message: 'The ID is missing to update album',
        },
        { status: 400 }
      )
    }
    const { title, description } = await request.json()

    const result = await db
      .update(album)
      .set({ title, description })
      .where(and(eq(album.id, id), eq(album.userId, user.id), eq(album.favorite, false)))
      .returning()

    if (!result.length) {
      return NextResponse.json(
        {
          success: false,
          status_code: 404,
          message: 'The album was not found',
          data: [],
        },
        { status: 404 }
      )
    }
    const pickResult = result.map(pickAlbumFieldsForPatch)

    return NextResponse.json(
      {
        success: true,
        status_code: 200,
        message: 'The album updated successfully',
        data: pickResult,
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return NextResponse.json(
      {
        success: false,
        status_code: 500,
        message,
      },
      { status: 500 }
    )
  }
}
