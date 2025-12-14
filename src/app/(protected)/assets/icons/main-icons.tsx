import type { SVGProps } from 'react'

const iconSize = 18

export const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-refresh'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
    <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
  </svg>
)

export const FolderPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-folder-plus'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5' />
    <path d='M16 19h6' />
    <path d='M19 16v6' />
  </svg>
)
