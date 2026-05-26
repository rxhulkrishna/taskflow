const selectedStyle = "bg-indigo-200 text-indigo-700 transition";

function FilterButtons({ filter, setFilter }) {
  function _handleFilter(type) {
    setFilter(type);
  }

  return (
    <div className="flex bg-indigo-100 w-max rounded-xl text-sm h-[40px] items-center justify-center">
      <button
        onClick={() => _handleFilter("all")}
        className={`rounded-xl w-max h-full px-5  ${filter === "all" ? selectedStyle : ""}`}
        type="button"
      >
        All
      </button>
      <button
        onClick={() => _handleFilter("pending")}
        className={`rounded-xl w-max h-full px-5  ${filter === "pending" ? selectedStyle : ""}`}
        type="button"
      >
        Pending
      </button>
      <button
        onClick={() => _handleFilter("completed")}
        className={`rounded-xl w-max h-full px-5 ${filter === "completed" ? selectedStyle : ""}`}
        type="button"
      >
        Completed
      </button>
    </div>
  );
}

export default FilterButtons;
