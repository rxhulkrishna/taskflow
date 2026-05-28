import { useEffect, useState } from "react";
import Analytics from "../components/Analytics";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { TASKS_PER_PAGE } from "../constants/constants";

const initialFilter = {
  status: "all",
  category: "all",
  priority: "all",
  search: '',
};

function getInitialTasks() {
  const saved = localStorage.getItem("tasks");
  return saved !== null ? JSON.parse(saved) : [];
}

function MainContent() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [filters, setFilters] = useState(initialFilter);
  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const noOfTasks = tasks.length;

  function taskToggle(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleAddTasks(task) {
    setTasks(task);
    setFilters(initialFilter);
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleFilterChange(newFilter) {
    // if (filters === newFilter) return;
    setFilters(newFilter);
    setPage(1);
  }

  const analyticsData = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filters.status === "completed") return task.completed;
      if (filters.status === "pending") return !task.completed;
      if (filters.status === "all") return true;
    })
    .filter(
      (task) =>
        filters.category === "all" || task.category === filters.category,
    )
    .filter(
      (task) =>
        filters.priority === "all" || task.priority === filters.priority,
    )
    .filter(
      (task) =>
        filters.search === "" || task.title.includes(filters.search),
    );

  //PAGINATION
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

  return (
    <main className="flex-1 flex flex-col rounded-r-xl gap-6 p-6 overflow-hidden">
      <Header noOfTasks={noOfTasks} />

      <div className="flex flex-1 min-h-0 gap-6">
        <section className="flex-1 flex flex-col min-h-0 gap-6">
          <TaskForm addTasks={handleAddTasks} />

          <FilterButtons
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <div className="flex-1 pr-2 w-full">
            <TaskList
              tasks={currentPageTasks}
              onToggleTask={taskToggle}
              onDeleteTask={handleDeleteTask}
              filterStatus={filters.status}
            />
          </div>

          <div className="flex justify-center">
            <div className="flex gap-5 items-center text-gray-500 p-2 bg-white rounded-xl">
              <button type="button" onClick={onPrev}>
                <ChevronLeftIcon size="20" />
              </button>
              <span>{page}</span>
              <button type="button" onClick={onNext}>
                <ChevronRightIcon size="20" />
              </button>
            </div>
          </div>
        </section>

        <aside className="w-105 min-h-0">
          <Analytics data={analyticsData} />
        </aside>
      </div>
    </main>
  );
}

export default MainContent;
