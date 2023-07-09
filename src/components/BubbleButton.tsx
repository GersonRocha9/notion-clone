import { ComponentProps, ReactNode } from 'react'

interface BubbleButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
  text?: string
}

export function BubbleButton({
  icon,
  text,
  ...buttonProps
}: BubbleButtonProps) {
  return (
    <button
      {...buttonProps}
      className="p-2 text-zinc-300 text-sm flex items-center gap-1.5 leading-none hover:text-zinc-50 hover:bg-zinc-600 transition-colors data-[active=true]:text-violet-400 data-[active=true]:bg-zinc-600"
    >
      {icon}
      {text && <span>{text}</span>}
    </button>
  )
}
