import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function dateFormat(date: string) {
  const formattedDate = dayjs.utc(date).local().format('MMM DD, YYYY • hh:mm a')

  return formattedDate
}

export function dateISO(date: string) {
  const isoFormat = dayjs.utc(date).toISOString()

  return isoFormat
}
