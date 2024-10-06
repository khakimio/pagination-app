import usePagination from '../../hooks/usePagination'
import {
  LeftArrowIcon,
  LeftAnglesIcon,
  RightArrowIcon,
  RightAnglesIcon,
} from '../Icons/Arrows'
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
