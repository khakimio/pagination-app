export default class PaginationController {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  totalPages: number
  isCircular: boolean

  constructor(totalItems: number, itemsPerPage: number, isCircular = false) {
    this.totalItems = totalItems
    this.itemsPerPage = itemsPerPage
    this.totalPages = Math.ceil(totalItems / itemsPerPage)
    this.currentPage = 1
    this.isCircular = isCircular
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    } else if (this.isCircular) {
      this.currentPage = 1
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
    } else if (this.isCircular) {
      this.currentPage = this.totalPages
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  nextSeveralPages(step: number) {
    if (this.isCircular) {
      this.currentPage = ((this.currentPage + step - 1) % this.totalPages) + 1
    } else {
      this.currentPage = Math.min(this.currentPage + step, this.totalPages)
    }
  }

  previousSeveralPages(step: number) {
    if (this.isCircular) {
      this.currentPage =
        ((this.currentPage - step - 1 + this.totalPages) % this.totalPages) + 1
    } else {
      this.currentPage = Math.max(this.currentPage - step, 1)
    }
  }

  get currentState() {
    return this.currentPage
  }
}
