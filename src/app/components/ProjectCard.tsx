import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  status: {
    label: string
    bgColor: string
    textColor: string
  }
  technologies: string[]
  actions?: {
    primary?: {
      label: string
      href: string
    }
    secondary?: {
      label: string
      href: string
    }
  }
  comingSoon?: boolean
}

export default function ProjectCard({
  title,
  description,
  status,
  technologies,
  actions,
  comingSoon = false,
}: ProjectCardProps) {
  return (
    <div className="bg-violet-200 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <span
            className={`${status.bgColor} ${status.textColor} px-2 py-1 rounded text-xs font-medium`}
          >
            {status.label}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map(tech => (
            <span
              key={tech}
              className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {comingSoon ? (
            <span className="text-gray-400 dark:text-gray-200">
              Coming Soon
            </span>
          ) : (
            <>
              {actions?.primary && (
                <Link
                  href={actions.primary.href}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {actions.primary.label} →
                </Link>
              )}
              {actions?.secondary && (
                <a
                  href={actions.secondary.href}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {actions.secondary.label}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
