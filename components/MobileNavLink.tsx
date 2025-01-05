"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/lib/animation-utils"
import { IconType } from "react-icons"
import { Icon } from "next/dist/lib/metadata/types/metadata-types"

interface Props {
  href: string
  icon: any
}

const MobileNavLink = ({ href, icon }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <button
    className={`
      ${
        pathname === href
          ? "text-blue-600"
          : "hover:text-blue-600 transition duration-200"
      }`}
      onClick={handleClick}
    >
      {icon}
    </button>
  )
}

export default MobileNavLink