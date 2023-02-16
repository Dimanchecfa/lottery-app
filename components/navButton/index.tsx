import React from 'react'

interface Props {
    title ?: string,
    isActive ?: boolean ,
    onClick ?: () => void
}

function NavButton({ title , isActive , onClick }: Props) {
  return (
   <button className={`${ isActive && "bg-[#036756]" } hover:bg-[#036756]
    text-white px-4 py-2 rounded`} onClick={onClick}>
        {title}
   </button>
  )
}

export default NavButton