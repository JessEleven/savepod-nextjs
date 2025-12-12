import Image from 'next/image'
import { tv } from 'tailwind-variants'
import Logo from '../../../public/favicon.svg'

const appLogo = tv({
  base: 'flex items-center',
  variants: {
    display: {
      flex: 'flex-row items-center gap-x-1.5',
      block: 'flex-col items-center gap-y-1.5',
    },
    iconSize: {
      18: 'h-[18px] w-[18px]',
      26: 'h-[26px] w-[26px]',
      40: 'h-[40px] w-[40px]',
      54: 'h-[54px] w-[54px]',
    },
    fontSize: {
      12: 'text-sm',
      20: 'text-xl',
    },
  },
  defaultVariants: {
    display: 'flex',
    iconSize: 26,
    fontSize: 12,
  },
})

type AppLogoProps = {
  display?: 'flex' | 'block'
  showText?: boolean
  iconSize?: 18 | 26 | 40 | 54
  fontSize?: 12 | 20
}

export default function AppLogo({ display, showText, iconSize, fontSize }: AppLogoProps) {
  return (
    <div className={appLogo({ display })}>
      <Image
        src={Logo}
        alt='Logo'
        className={appLogo({ iconSize })}
        priority
      />
      {showText && <span className={appLogo({ fontSize }) + ' ' + 'font-medium'}>savepod</span>}
    </div>
  )
}
