import { NextResponse } from 'next/server'

type ApiResponseBody<T = unknown> = {
  success: boolean
  status_code: number
  message: string
  data?: T
  results?: T
}

export class ApiResponse {
  // For the status codes 200, 201...
  static success<T>(message: string, statusCode: number, data?: T) {
    const body: ApiResponseBody<T> = {
      success: true,
      status_code: statusCode,
      message,
      data,
    }
    return NextResponse.json(body, { status: statusCode })
  }

  // For the status codes 400, 401, 404, 422...
  static clientError(message: string, statusCode: number, data?: unknown) {
    const body: ApiResponseBody = {
      success: false,
      status_code: statusCode,
      message,
      data,
    }
    return NextResponse.json(body, { status: statusCode })
  }

  // For the status codes 500...
  static serverError(message: string, statusCode: number) {
    const body: ApiResponseBody = {
      success: false,
      status_code: statusCode,
      message,
    }
    return NextResponse.json(body, { status: statusCode })
  }

  // For the pagination
  static paginated<T>(message: string, statusCode: number, results: T) {
    const body: ApiResponseBody<T> = {
      success: true,
      status_code: statusCode,
      message,
      results,
    }
    return NextResponse.json(body, { status: statusCode })
  }
}
