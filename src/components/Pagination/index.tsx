import usePagination from '../../hooks/usePagination'
import './Pagination.scss'

type Props = {
  totalItems: number
  itemsPerPage: number
  isCircular?: boolean
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  isCircular = false,
}: Props) {
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    nextSeveralPages,
    previousSeveralPages,
  } = usePagination({ totalItems, itemsPerPage, isCircular })

  const isNextDisabled = currentPage === totalPages && !isCircular
  const isPreviousDisabled = currentPage === 1 && !isCircular

  return (
    <nav className="pagination">
      <p className="pagination__ctrl">
        <PaginationButton
          onClick={() => previousSeveralPages(3)}
          label={<LeftAnglesIcon />}
          isDisabled={isPreviousDisabled}
          className="pagination__btn pagination__btn--step"
          testId="step-previous-button"
        />

        <PaginationButton
          onClick={goToPreviousPage}
          label={
            <>
              <LeftArrowIcon /> Prev
            </>
          }
          isDisabled={isPreviousDisabled}
          className="pagination__btn pagination__btn--nav"
          testId="previous-button"
        />
      </p>

      <ul className="pagination__list">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className="pagination__item">
            <PaginationButton
              onClick={() => goToPage(index + 1)}
              label={(index + 1).toString()}
              isDisabled={false}
              isActive={currentPage === index + 1}
              className={`pagination__btn ${
                currentPage === index + 1 ? 'pagination__btn--active' : ''
              }`}
              testId={`page-button-${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <p className="pagination__ctrl">
        <PaginationButton
          onClick={goToNextPage}
          label={
            <>
              Next <RightArrowIcon />
            </>
          }
          isDisabled={isNextDisabled}
          className="pagination__btn pagination__btn--nav"
          testId="next-button"
        />

        <PaginationButton
          onClick={() => nextSeveralPages(3)}
          label={<RightAnglesIcon />}
          isDisabled={isNextDisabled}
          className="pagination__btn pagination__btn--step"
          testId="step-next-button"
        />
      </p>
    </nav>
  )
}

type ButtonProps = {
  onClick: () => void
  label: React.ReactNode
  isDisabled: boolean
  isActive?: boolean
  className?: string
  testId?: string
}

function PaginationButton({
  onClick,
  label,
  isDisabled,
  isActive = false,
  className,
  testId,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      data-testid={testId}
    >
      {label}
    </button>
  )
}

const LeftArrowIcon = () => (
  <svg
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
  </svg>
)

const LeftAnglesIcon = () => (
  <svg
    width="22"
    height="22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
  </svg>
)

const RightArrowIcon = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
  </svg>
)

const RightAnglesIcon = () => (
  <svg
    width="22"
    height="22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
  </svg>
)
