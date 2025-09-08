import { SimpleIcon } from 'simple-icons'

export const Logo = ({ icon }: { icon: SimpleIcon }) => {
  return (
    <svg
      fill={`#${icon.hex}`}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-6 h-6"
    >
      <path d={icon.path} />
    </svg>
  )
}
