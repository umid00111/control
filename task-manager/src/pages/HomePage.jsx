
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tasks")
      .then((response) => setTasks(response.data))
      .catch(() => toast.error("Не удалось загрузить задачи"))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async (data) => {
    try {
      const response = await api.post("/tasks", data);

      setTasks((previous) => [...previous, response.data]);
      toast.success("Задача создана!");
      return true;
    } catch {
      toast.error("Ошибка при создании задачи");
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks((previous) =>
        previous.filter((task) => task.id !== id)
      );

      toast.info("Задача удалена");
    } catch {
      toast.error("Не удалось удалить задачу");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.status;
    if (filter === "done") return task.status;
    return true;
  });

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">ПЛАНИРУЙ. ДЕЙСТВУЙ. ДОСТИГАЙ.</p>
        <h1>Твои задачи — под контролем</h1>
        <p>
          Организуй дела, расставляй приоритеты и достигай целей.
        </p>
      </section>

      <TaskForm onAdd={addTask} />

      <section className="tasks-section">
        <div className="section-heading">
          <div>
            <h2>Мои задачи</h2>
            <p>Всего задач: {tasks.length}</p>
          </div>

          <TaskFilter
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {loading ? (
          <p>Загрузка задач...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="empty">Задач пока нет</p>
        ) : (
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
