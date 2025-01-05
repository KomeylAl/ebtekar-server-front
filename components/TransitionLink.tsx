"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/lib/animation-utils"

interface Props {
  href: string
  label: string
}

const TransitionLink = ({ href, label }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <button
    className={`text-white font-semibold 
      text-lg hover:text-amber-500 transition duration-300 hover:underline hover:underline-offset-8
      ${pathname === href ? 'text-amber-500 underline underline-offset-8' : 'text-white'}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

export default TransitionLink