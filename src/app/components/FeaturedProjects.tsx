import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "Qu'est ce qu'on mange\xa0?",
    description:
      'A practical web app for planning quick, hearty meals. Built to solve my own cooking struggles with beginner-friendly recipes and smart filtering.',
    status: {
      label: 'Live Demo',
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-800 dark:text-green-200',
    },
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Responsive'],
    actions: {
      primary: {
        label: 'Try it out',
        href: '/meal-planner',
      },
      secondary: {
        label: 'View Code',
        href: '#',
      },
    },
  },
  {
    title: 'E-Commerce Store',
    description:
      'Full-stack e-commerce solution with Stripe payments, inventory management, and admin dashboard. Built with Next.js and PostgreSQL.',
    status: {
      label: 'In Progress',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-800 dark:text-yellow-200',
    },
    technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
    comingSoon: true,
  },
  {
    title: 'Task Management App',
    description:
      'Real-time collaborative task management with drag-and-drop functionality, team workspaces, and progress tracking.',
    status: {
      label: 'Planned',
      bgColor: 'bg-gray-100  dark:bg-gray-900',
      textColor: 'text-gray-800 dark:text-gray-200',
    },
    technologies: ['React', 'WebSocket', 'Node.js'],
    comingSoon: true,
  },
]

export default function FeaturedProjects() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-200">
        Featured Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}
