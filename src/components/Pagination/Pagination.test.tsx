import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '.'

describe('Pagination Component - Standard Navigation', () => {
  it('renders the correct number of pages based on total items and items per page', () => {
    render(<Pagination totalItems={50} itemsPerPage={10} />)
    expect(screen.getAllByRole('button', { name: /^[0-9]+$/ })).toHaveLength(5)
  })

  it('navigates to the next page when the "next-button" is clicked', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} />)

    expect(screen.getByTestId('page-button-1')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('next-button'))
    expect(screen.getByTestId('page-button-2')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('navigates to the previous page when the "previous-button" is clicked', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} />)

    await userEvent.click(screen.getByTestId('next-button'))
    expect(screen.getByTestId('page-button-2')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('previous-button'))
    expect(screen.getByTestId('page-button-1')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('disables next and previous buttons correctly at first and last pages', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} />)

    const prevButton = screen.getByTestId('previous-button')
    expect(prevButton).toBeDisabled()

    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))

    const nextButton = screen.getByTestId('next-button')
    expect(nextButton).toBeDisabled()
  })

  it('allows circular navigation when isCircular is true', async () => {
    render(<Pagination totalItems={50} itemsPerPage={10} isCircular={true} />)

    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))
    await userEvent.click(screen.getByTestId('next-button'))
    expect(screen.getByTestId('page-button-5')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('next-button'))
    expect(screen.getByTestId('page-button-1')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('previous-button'))
    expect(screen.getByTestId('page-button-5')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})

describe('Pagination Component - Step Navigation', () => {
  it('navigates multiple pages forward when "step-next-button" is clicked', async () => {
    render(<Pagination totalItems={100} itemsPerPage={10} />)

    expect(screen.getByTestId('page-button-1')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('step-next-button'))
    expect(screen.getByTestId('page-button-4')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('navigates multiple pages backward when "step-previous-button" is clicked', async () => {
    render(<Pagination totalItems={100} itemsPerPage={10} />)

    await userEvent.click(screen.getByTestId('step-next-button'))
    expect(screen.getByTestId('page-button-4')).toHaveAttribute(
      'aria-current',
      'page'
    )

    await userEvent.click(screen.getByTestId('step-previous-button'))
    expect(screen.getByTestId('page-button-1')).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('disables step navigation correctly when at the boundaries', async () => {
    render(<Pagination totalItems={30} itemsPerPage={10} />)

    const stepPrevButton = screen.getByTestId('step-previous-button')
    expect(stepPrevButton).toBeDisabled()

    await userEvent.click(screen.getByTestId('step-next-button'))
    await userEvent.click(screen.getByTestId('step-next-button'))

    const stepNextButton = screen.getByTestId('step-next-button')
    expect(stepNextButton).toBeDisabled()
  })
})
