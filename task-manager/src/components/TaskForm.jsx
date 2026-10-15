
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().trim().required("Укажите название!"),
  description: yup.string().trim().required("Укажите описание!"),
  priority: yup.string().required("Укажите приоритет!")
});

function TaskForm({ onAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      priority: ""
    }
  });

  const submit = async (data) => {
    const success = await onAdd({
      ...data,
      status: false
    });

    if (success) {
      reset();
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)}>
      <h2>Создать новую задачу</h2>

      <input
        {...register("title")}
        placeholder="Название"
      />
      {errors.title && (
        <p className="error">{errors.title.message}</p>
      )}

      <textarea
        {...register("description")}
        placeholder="Описание"
      />
      {errors.description && (
        <p className="error">{errors.description.message}</p>
      )}

      <label>Приоритет</label>

      <select {...register("priority")}>
        <option value="">Выберите приоритет</option>
        <option value="low">🟢 Низкий</option>
        <option value="normal">🟡 Средний</option>
        <option value="high">🔴 Высокий</option>
      </select>

      {errors.priority && (
        <p className="error">{errors.priority.message}</p>
      )}

      <button className="primary-btn" type="submit">
        Создать задачу
      </button>
    </form>
  );
}

export default TaskForm;
