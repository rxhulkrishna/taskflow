import { options } from "../constants/constants";

const selectedStyle = "bg-indigo-200 text-indigo-700 transition";

function FilterButtons({ filters, onFilterChange }) {
  function handleFilter(value, type) {
    const newFilter = { ...filters, [type]: value };
    onFilterChange(newFilter);
  }

  return (
    <div className="flex gap-5 items-center justify-between">
      <div className="flex bg-indigo-100 w-max rounded-xl text-sm h-10 items-center justify-center">
        <button
          onClick={() => handleFilter("all", "status")}
          className={`rounded-xl w-max h-full px-5  ${filters.status === "all" ? selectedStyle : ""}`}
          type="button"
        >
          All
        </button>
        <button
          onClick={() => handleFilter("pending", "status")}
          className={`rounded-xl w-max h-full px-5  ${filters.status === "pending" ? selectedStyle : ""}`}
          type="button"
        >
          Pending
        </button>
        <button
          onClick={() => handleFilter("completed", "status")}
          className={`rounded-xl w-max h-full px-5 ${filters.status === "completed" ? selectedStyle : ""}`}
          type="button"
        >
          Completed
        </button>
      </div>
      <div className="flex items-center gap-5 text-sm text-gray-700">
        <input
          className="bg-white px-4 py-2 rounded-xl outline-0"
          type="text"
          placeholder="Search..."
          onChange={({ target }) => handleFilter(target.value, "search")}
        />
        <select
          className="bg-white px-4 py-2 rounded-xl"
          onChange={({ target }) => handleFilter(target.value, "category")}
        >
          <option value="all">Category</option>
          {options.category.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className="bg-white px-4 py-2 rounded-xl"
          onChange={({ target }) => handleFilter(target.value, "priority")}
        >
          <option value="all">Priority</option>
          {options.priority.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterButtons;
