import { useState } from "react";
import Analytics from "../components/Analytics";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function MainContent() {
  const [tasks, setTasks] = useState([]);
  const noOfTasks = tasks.length;

  return (
    <main className="flex-1 flex flex-col rounded-r-xl gap-6 p-6 overflow-hidden">
      <Header noOfTasks={noOfTasks}/>

      <div className="flex flex-1 min-h-0 gap-6">
        <section className="flex-1 flex flex-col min-h-0">
          <TaskForm addTasks={setTasks}/>

          <div className="flex-1 overflow-y-auto mt-6 pr-2">
            <TaskList tasks={tasks}/>
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
