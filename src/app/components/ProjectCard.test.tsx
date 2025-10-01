import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectCard from './ProjectCard'

describe('ProjectCard', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'This is a test project description',
    status: {
      label: 'Active',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
    },
    technologies: ['React', 'TypeScript', 'Next.js'],
    actions: {
      primary: {
        label: 'View Project',
        href: '/test-project',
      },
      secondary: {
        label: 'GitHub',
        href: 'https://github.com/test',
      },
    },
  }

  it('renders project title and description', () => {
    render(<ProjectCard {...mockProps} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test project description'),
    ).toBeInTheDocument()
  })

  it('renders status badge', () => {
    render(<ProjectCard {...mockProps} />)

    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders all technologies', () => {
    render(<ProjectCard {...mockProps} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders action buttons when provided', () => {
    render(<ProjectCard {...mockProps} />)

    expect(screen.getByText('View Project →')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('renders "Coming Soon" when comingSoon is true', () => {
    render(<ProjectCard {...mockProps} comingSoon={true} />)

    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    expect(screen.queryByText('View Project →')).not.toBeInTheDocument()
  })

  it('does not render actions when not provided', () => {
    const propsWithoutActions = {
      ...mockProps,
      actions: undefined,
    }

    render(<ProjectCard {...propsWithoutActions} />)

    expect(screen.queryByText('View Project →')).not.toBeInTheDocument()
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
  })
})
