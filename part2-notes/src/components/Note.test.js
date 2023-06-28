import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Note from './Note'
// import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )


  // const button = screen.getByText('make not important')
  const button = screen.getByRole('button', {
    name: /important/i
  })
  fireEvent.click(button)

  // The expectation of the test verifies that the mock function has been called exactly once.
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler).toHaveBeenCalled()
})