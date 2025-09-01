'use client'

import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      case 'system':
        return '💻'
      default:
        return '💻'
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return `System (${resolvedTheme})`
      default:
        return 'System'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed cursor-pointer top-4 right-4 z-50 p-4 rounded-lg bg-sky-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
      title={`Current: ${theme}, Resolved: ${resolvedTheme}. Click to cycle through themes.`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{getThemeIcon()}</span>
        <div className="text-left">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {getThemeLabel()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {theme === 'system' ? 'Auto' : 'Manual'}
          </div>
        </div>
      </div>
    </button>
  )
}
