import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skills from './Skills'

describe('Skills', () => {
  it('renders all three skill categories', () => {
    render(<Skills />)

    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
  })

  it('renders frontend skills', () => {
    render(<Skills />)

    expect(
      screen.getByText(
        'React, Next.js, TypeScript, Tailwind CSS, JavaScript ES6+',
      ),
    ).toBeInTheDocument()
  })

  it('renders backend skills', () => {
    render(<Skills />)

    expect(
      screen.getByText('Node.js, Express, PostgreSQL, MongoDB, REST APIs'),
    ).toBeInTheDocument()
  })

  it('renders tools', () => {
    render(<Skills />)

    expect(
      screen.getByText('Git, Docker, AWS, Vercel, Figma, VS Code'),
    ).toBeInTheDocument()
  })

  it('renders skills in a grid layout', () => {
    const { container } = render(<Skills />)

    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('md:grid-cols-3')
  })
})
