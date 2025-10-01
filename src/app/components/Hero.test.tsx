import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the hero heading', () => {
    render(<Hero />)

    expect(screen.getByText("Hi, I'm Sun")).toBeInTheDocument()
  })

  it('renders job title', () => {
    render(<Hero />)

    expect(screen.getByText('1x Frontend Developer')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<Hero />)

    expect(
      screen.getByText('Caring about efficient and accessible web apps.'),
    ).toBeInTheDocument()
  })

  it('renders "What I like" link', () => {
    render(<Hero />)

    const whatILikeLink = screen.getByText('What I like')
    expect(whatILikeLink).toBeInTheDocument()
    expect(whatILikeLink).toHaveAttribute('href', 'me')
  })

  it('renders "Get In Touch" link', () => {
    render(<Hero />)

    const getInTouchLink = screen.getByText('Get In Touch')
    expect(getInTouchLink).toBeInTheDocument()
    expect(getInTouchLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/xuanthinguyen/',
    )
    expect(getInTouchLink).toHaveAttribute('target', '_blank')
    expect(getInTouchLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
