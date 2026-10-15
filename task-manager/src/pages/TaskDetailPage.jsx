
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "normal",
    status: false
  });

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setForm({
          title: response.data.title,
          description: response.data.description,
          priority: response.data.priority,
          status: response.data.status
        });
      })
      .catch(() => toast.error("Задача не найдена"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const saveTask = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Заполните название и описание");
      return;
    }

    try {
      const response = await api.patch(`/tasks/${id}`, {
        ...form,
        title: form.title.trim(),
        description: form.description.trim()
      });

      setTask(response.data);
      setEditing(false);
      toast.success("Изменения сохранены");
    } catch {
      toast.error("Не удалось сохранить изменения");
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.info("Задача удалена");
      navigate("/");
    } catch {
      toast.error("Не удалось удалить задачу");
    }
  };

  if (loading) return <main className="container"><p>Загрузка...</p></main>;

  if (!task) {
    return (
      <main className="container">
        <h2>Задача не найдена</h2>
        <Link to="/">Вернуться на главную</Link>
      </main>
    );
  }

  return (
    <main className="container detail-page">
      <Link to="/" className="back-link">← Назад</Link>

      <section className="detail-card">
        <p className="eyebrow">ЗАДАЧА #{task.id}</p>

        {editing ? (
          <form onSubmit={saveTask} className="edit-form">
            <label>Название</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label>Описание</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <label>Приоритет</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Низкий</option>
              <option value="normal">Средний</option>
              <option value="high">Высокий</option>
            </select>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleChange}
              />
              Задача выполнена
            </label>

            <button className="primary-btn" type="submit">
              Сохранить изменения
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => setEditing(false)}
            >
              Отмена
            </button>
          </form>
        ) : (
          <>
            <h1>{task.title}</h1>
            <p className="detail-description">{task.description}</p>

            <p>
              Статус:{" "}
              <span className={task.status ? "done" : "active"}>
                {task.status ? "Выполнена" : "В процессе"}
              </span>
            </p>

            <p>
              Приоритет:{" "}
              {task.priority === "high"
                ? "Высокий"
                : task.priority === "low"
                ? "Низкий"
                : "Средний"}
            </p>

            <div className="detail-actions">
              <button
                className="primary-btn"
                onClick={() => setEditing(true)}
              >
                ✎ Редактировать
              </button>

              <button className="delete-btn" onClick={deleteTask}>
                🗑 Удалить
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default TaskDetailPage;
