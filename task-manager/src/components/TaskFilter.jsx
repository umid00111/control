
function TaskFilter({ filter, setFilter }) {
  return (
    <select
      className="filter"
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
    >
      <option value="all">Все задачи</option>
      <option value="active">Активные</option>
      <option value="done">Выполненные</option>
    </select>
  );
}

export default TaskFilter;
