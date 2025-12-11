import type { SVGProps } from 'react'

const iconSize = 18

// Sidebar Toggle
export const LayoutSidebarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='currentColor'
    className='icon icon-tabler icons-tabler-filled icon-tabler-layout-sidebar'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M6 21a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3zm12 -16h-8v14h8a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1' />
  </svg>
)

export const LayoutSidebarIconOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-layout-sidebar'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
    <path d='M9 4l0 16' />
  </svg>
)

// Sidebar
export const LayoutGridIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-layout-grid'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
    <path d='M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
    <path d='M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
    <path d='M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
  </svg>
)

export const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-folder'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2' />
  </svg>
)

export const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-settings'
    {...props}
  >
    <path
      stroke='none'
      d='M0 0h24v24H0z'
      fill='none'
    />
    <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z' />
    <path d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
  </svg>
)
