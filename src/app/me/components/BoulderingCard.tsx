'use client'

import { useState } from 'react'

import { useBoulderingAuth } from '../contexts/BoulderingAuthContext'
import { useBoulderingData } from '../hooks/useBouldering'
import { BoulderingService } from '../services/BoulderingService'

export const BoulderingCard = () => {
  const [hoveredProblem, setHoveredProblem] = useState<{
    id: string
    photo: string
  } | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const { isAuthenticated } = useBoulderingAuth()
  const {
    data: articles,
    isLoading,
    error,
  } = useBoulderingData(isAuthenticated)

  const stats = articles
    ? BoulderingService.calculateStats(articles)
    : undefined

  const allCompletedProblems =
    articles
      ?.filter(article => article.check === true)
      .sort(
        (a, b) =>
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      ) || []

  const totalPages = Math.ceil(allCompletedProblems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const completedProblems = allCompletedProblems.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        <span className="mr-2">🧗‍♂️</span> Climbing
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.completedProblems}/{stats.totalProblems}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Problems Completed
          </div>
        </div>
      </div>

      {completedProblems && completedProblems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Recent Completions
          </h4>
          <ul className="space-y-1">
            {completedProblems.map(problem => {
              const photoUrl = problem.photos?.[0]?.photo

              return (
                <li
                  key={problem._id}
                  className="flex justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-200 cursor-pointer transition-colors"
                  onMouseEnter={() => {
                    if (photoUrl) {
                      setHoveredProblem({ id: problem._id, photo: photoUrl })
                    }
                  }}
                  onMouseMove={e => {
                    if (photoUrl && hoveredProblem?.id === problem._id) {
                      setMousePosition({
                        x: e.clientX + 10,
                        y: e.clientY - 100,
                      })
                    }
                  }}
                  onMouseLeave={() => setHoveredProblem(null)}
                >
                  <span className="flex gap-1">
                    {problem.summary || 'Unnamed problem'}{' '}
                    <span className="text-gray-400 dark:text-gray-600">
                      | {problem.category}
                    </span>
                  </span>
                  <span className="text-xs">
                    {problem.date
                      ? new Date(problem.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'No date'}
                  </span>
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      )}

      {hoveredProblem && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-2 border border-gray-200 dark:border-gray-700">
            <img
              src={hoveredProblem.photo}
              alt="Boulder problem"
              width={450}
              height={450}
              style={{ objectFit: 'cover', borderRadius: '0.375rem' }}
              onError={e => {
                setHoveredProblem(null)
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-500 italic">
          Only include routes in my level range aka around V3/6a (at best)
        </div>
      </div>
    </div>
  )
}
