import { and, count, desc, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { album } from '@/db/sql/album-schema'
import { getAuthenticatedUser } from '@/helpers/get-authenticated-user'
import { ApiResponse } from '@/libs/api-response'
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
      return ApiResponse.paginated('The albums list is empty', 200, {
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
      })
    }
    const results = albums.map(pickAlbumFieldsForGet)

    return ApiResponse.paginated('List of albums', 200, {
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
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return ApiResponse.serverError(message, 500)
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

    return ApiResponse.success('The album created successfully', 200, pickResult)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return ApiResponse.serverError(message, 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const { user, error } = await getAuthenticatedUser()

    if (error) return error

    const { id } = await request.json()

    if (!id || !isValidNanoid(id)) {
      return ApiResponse.clientError('The ID is missing to delete album', 400)
    }

    const result = await db
      .delete(album)
      .where(and(eq(album.id, id), eq(album.userId, user.id), eq(album.favorite, false)))
      .returning()

    if (!result.length) {
      return ApiResponse.clientError('The album was not found', 404, [])
    }

    return ApiResponse.success('The album successfully deleted', 200, { album_status: 'Deleted' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    return ApiResponse.serverError(message, 500)
  }
}
