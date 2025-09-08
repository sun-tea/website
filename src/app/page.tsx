import FeaturedProjects from './components/FeaturedProjects'
import Hero from './components/Hero'
import Skills from './components/Skills'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-10% via-30% to-70% from-pink-200 via-fuchsia-300 to-indigo-400 dark:from-pink-950 dark:via-fuchsia-950 dark:to-indigo-950">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Hero />
        <Skills />
        <FeaturedProjects />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
    </main>
  )
}
