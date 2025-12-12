import { and, count, desc, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { album } from '@/db/sql/album-schema'
import { getAuthenticatedUser } from '@/helpers/get-authenticated-user'
import { generateId } from '@/utils/generate-id'
import { pickAlbumFieldsForGet, pickAlbumFieldsForPost } from '@/utils/pick-fields/albums'
import { isValidNanoid } from '@/utils/validate-id'

export async function GET(request: Request) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const { searchParams, origin } = new URL(request.url)
    const page: number = parseInt(searchParams.get('page') || '1', 10)
    const limit: number = parseInt(searchParams.get('limit') || '10', 10)
    const offset = (page - 1) * limit

    const [albums, total]: [(typeof album.$inferSelect)[], { count: number }[]] = await Promise.all(
      [
        db
          .select()
          .from(album)
          .where(and(eq(album.userId, user.id), eq(album.favorite, false)))
          .orderBy(desc(album.createdAt))
          .limit(limit)
          .offset(offset),
        db
          .select({ count: count() })
          .from(album)
          .where(and(eq(album.userId, user.id), eq(album.favorite, false))),
      ]
    )
    const baseUrl = `${origin}/api/albums`
    const totalPages = Math.ceil(total[0].count / limit)
    const buildLink = (targetPage: number) => `${baseUrl}?page=${targetPage}&limit=${limit}`

    if (albums.length <= 0) {
      return NextResponse.json(
        {
          success: true,
          status_code: 200,
          message: 'The albums list is empty',
          results: {
            total_records: total[0].count,
            pagination: {
              total_pages: page,
              current_page: limit,
              items_per_page: 0,
            },
            links: {
              base_url: baseUrl,
              first_url: buildLink(1),
              prev_url: null,
              next_url: null,
              last_url: null,
            },
            data: [],
          },
        },
        { status: 200 }
      )
    }
    const results = albums.map(pickAlbumFieldsForGet)

    return NextResponse.json(
      {
        success: true,
        status_code: 200,
        message: 'List of albums',
        results: {
          total_records: total[0].count,
          pagination: {
            total_pages: Math.ceil(total[0].count / limit),
            current_page: page,
            items_per_page: limit,
          },
          links: {
            base_url: baseUrl,
            first_url: buildLink(1),
            prev_url: page > 1 ? buildLink(page - 1) : null,
            next_url: page < totalPages ? buildLink(page + 1) : null,
            last_url: buildLink(totalPages),
          },
          data: results,
        },
      },
      { status: 200 }
    )
  } catch (error: unknown) {
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

export async function POST(request: Request) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const { title, description } = await request.json()
    const nanoid = generateId()

    const result = await db
      .insert(album)
      .values({
        id: nanoid,
        title,
        description,
        userId: user.id,
      })
      .returning()

    const pickResult = result.map(pickAlbumFieldsForPost)

    return NextResponse.json(
      {
        success: true,
        status_code: 201,
        message: 'The album created successfully',
        data: pickResult,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
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

export async function DELETE(request: Request) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const { id } = await request.json()

    if (!id || !isValidNanoid(id)) {
      return NextResponse.json(
        {
          success: false,
          status_code: 400,
          message: 'The ID is missing to delete album',
        },
        { status: 400 }
      )
    }

    const result = await db
      .delete(album)
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

    return NextResponse.json(
      {
        success: true,
        status_code: 200,
        message: 'The album successfully deleted',
        data: {
          album_status: 'Deleted',
        },
      },
      { status: 200 }
    )
  } catch (error: unknown) {
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
