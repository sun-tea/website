export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: 'React, Next.js, TypeScript, Tailwind CSS, JavaScript ES6+',
    },
    {
      title: 'Backend',
      skills: 'Node.js, Express, PostgreSQL, MongoDB, REST APIs',
    },
    {
      title: 'Tools',
      skills: 'Git, Docker, AWS, Vercel, Figma, VS Code',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {skillCategories.map(category => (
        <div
          key={category.title}
          className="bg-pink-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-fuchsia-600">
            {category.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{category.skills}</p>
        </div>
      ))}
    </div>
  )
}
