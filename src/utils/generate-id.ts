import { customAlphabet } from 'nanoid'

const safeAlphabet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoidSafe: () => string = customAlphabet(safeAlphabet, 21)

/**
 * Generates a segmented ID every 7 characters, separated by ‘-’.
 * e.g. abC1234-deF4567-ghi7890
 */
export function generateId(): string {
  const rawId: string = nanoidSafe()
  const formattedId: string = rawId.match(/.{1,7}/g)!.join('-')

  return formattedId
}
