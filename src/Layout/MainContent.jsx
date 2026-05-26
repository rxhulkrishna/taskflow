import { useState } from "react";
import Analytics from "../components/Analytics";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterButtons from "../components/FilterButtons";

function MainContent() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const noOfTasks = tasks.length;

  function taskToggle(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = (() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  })();

  return (
    <main className="flex-1 flex flex-col rounded-r-xl gap-6 p-6 overflow-hidden">
      <Header noOfTasks={noOfTasks} />

      <div className="flex flex-1 min-h-0 gap-6">
        <section className="flex-1 flex flex-col min-h-0 gap-6">
          <TaskForm addTasks={setTasks} />

          <FilterButtons filter={filter} setFilter={setFilter} />

          <div className="flex-1 overflow-y-auto pr-2 w-full">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={taskToggle}
              onDeleteTask={deleteTask}
            />
          </div>
        </section>

        <aside className="w-[420px] overflow-y-auto">
          <Analytics />
        </aside>
      </div>
    </main>
  );
}

export default MainContent;
