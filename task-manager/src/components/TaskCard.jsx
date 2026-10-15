
import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {
  const priorityNames = {
    low: "Низкий",
    normal: "Средний",
    high: "Высокий"
  };

  return (
    <article className="task-card">
      <div className="card-top">
        <span>#{task.id}</span>
        <span className={`priority ${task.priority}`}>
          {priorityNames[task.priority]}
        </span>
      </div>

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span className={task.status ? "done" : "active"}>
        {task.status ? "Выполнена" : "В процессе"}
      </span>

      <div className="card-actions">
        <Link to={`/tasks/${task.id}`} className="open-btn">
          Открыть
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
