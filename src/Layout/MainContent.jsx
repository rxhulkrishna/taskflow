import { useEffect, useState } from "react";
import Analytics from "../components/Analytics";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { TASKS_PER_PAGE } from "../constants/constants";
import { usePagination } from "../hooks/usePagination";

const initialFilter = {
  status: "all",
  category: "all",
  priority: "all",
  search: "",
};

function getInitialTasks() {
  const saved = localStorage.getItem("tasks");
  return saved !== null ? JSON.parse(saved) : [];
}

function MainContent() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [filters, setFilters] = useState(initialFilter);
  const [editTask, setEditTask] = useState(null);

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
      (task) => filters.search === "" || task.title.includes(filters.search),
    );

  const { currentPageTasks, onPrev, onNext, resetPage, page } = usePagination(
    filteredTasks,
    TASKS_PER_PAGE,
  );

  function handleAddTasks(task) {
    setTasks(task);
    if (editTask) {
      setEditTask(null);
    }
    setFilters(initialFilter);
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleEditTask(task) {
    setEditTask(task);
  }

  function handleFilterChange(newFilter) {
    setFilters(newFilter);
    resetPage();
  }

  return (
    <main className="flex-1 flex flex-col rounded-r-xl gap-6 p-6 overflow-x-hidden lg:overflow-hidden">
      <Header noOfTasks={noOfTasks} />

      <div className="flex flex-col lg:flex-row flex-1 lg:min-h-0 gap-6">
        <section className="flex-1 flex flex-col lg:min-h-0 gap-6">
          <TaskForm
            key={editTask?.id || "new"}
            onAddTask={handleAddTasks}
            editTask={editTask}
            onEditTask={setEditTask}
          />

          <FilterButtons
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <div className="flex-1 w-full">
            <TaskList
              tasks={currentPageTasks}
              onToggleTask={taskToggle}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
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

        <aside className="w-full lg:w-105 min-h-0">
          <Analytics data={analyticsData} />
        </aside>
      </div>
    </main>
  );
}

export default MainContent;
