import { useState, useEffect } from 'react'
import PaginationController from './PaginationController'

type Props = {
  totalItems: number
  itemsPerPage: number
  isCircular?: boolean
}

export default function usePagination({
  totalItems,
  itemsPerPage,
  isCircular = false,
}: Props) {
  const [pagination] = useState(
    new PaginationController(totalItems, itemsPerPage, isCircular)
  )
  const [currentPage, setCurrentPage] = useState(pagination.currentState)

  useEffect(() => {
    setCurrentPage(pagination.currentState)
  }, [pagination])

  const goToNextPage = () => {
    pagination.goToNextPage()
    setCurrentPage(pagination.currentState)
  }

  const goToPreviousPage = () => {
    pagination.goToPreviousPage()
    setCurrentPage(pagination.currentState)
  }

  const goToPage = (page: number) => {
    pagination.goToPage(page)
    setCurrentPage(pagination.currentState)
  }

  const nextSeveralPages = (step: number) => {
    pagination.nextSeveralPages(step)
    setCurrentPage(pagination.currentState)
  }

  const previousSeveralPages = (step: number) => {
    pagination.previousSeveralPages(step)
    setCurrentPage(pagination.currentState)
  }

  return {
    currentPage,
    totalPages: pagination.totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    nextSeveralPages,
    previousSeveralPages,
  }
}
