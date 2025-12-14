type Props = {
  title: string
}

export function AlbumSectionTitle({ title }: Props) {
  return <h2 className='font-medium text-xl md:text-[27px]'>{title}</h2>
}
