import { useState } from "react";

export function usePagination(filteredTasks, TASKS_PER_PAGE) {
  const [page, setPage] = useState(1);

  const startIdx = (page - 1) * TASKS_PER_PAGE;
  const endIdx = startIdx + TASKS_PER_PAGE;
  const currentPageTasks = filteredTasks.slice(startIdx, endIdx);

  function onPrev() {
    if (page === 1) {
      return;
    }
    setPage((prevPage) => prevPage - 1);
  }

  function onNext() {
    const noOfPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
    if (page === noOfPages || noOfPages === 0) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }

  function resetPage() {
    setPage(1);
  }

  return {
    currentPageTasks,
    onPrev,
    onNext,
    resetPage,
    page
  }
}
