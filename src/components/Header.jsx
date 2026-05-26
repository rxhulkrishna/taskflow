function Header({noOfTasks}) {
  const taskLabel = noOfTasks === 1 ? "task" : "tasks";

  return <div>
    <h1 className="text-3xl font-medium">Good Morning, Rahul 👋</h1>
    {noOfTasks > 0 
    ? <span className="text-gray-500 text-sm">You have {noOfTasks} {taskLabel} to complete today.</span>
    : <span className="text-gray-500 text-sm">No tasks to complete.</span>
  }
  </div>;
}

export default Header;
