
import { Link } from "react-router-dom";

function AboutPage() {
  const values = [
    {
      number: "01",
      title: "Просто и эффективно",
      text: "Создавай задачи и управляй ими без лишних действий."
    },
    {
      number: "02",
      title: "Умный трекинг",
      text: "Следи за выполнением задач и своим прогрессом."
    },
    {
      number: "03",
      title: "Современный дизайн",
      text: "Работай в удобном и понятном интерфейсе."
    },
    {
      number: "04",
      title: "Персональные настройки",
      text: "Выбирай приоритеты и организуй свой рабочий процесс."
    }
  ];

  return (
    <main className="container about-page">
      <section className="about-hero">
        <div>
          <p className="eyebrow">О НАШЕМ ПРОЕКТЕ</p>
          <h1>Меньше хаоса — больше результата</h1>

          <p>
            Наше приложение помогает организовать задачи,
            расставлять приоритеты и контролировать выполнение
            дел. Всё необходимое для продуктивного дня — в одном месте.
          </p>

          <Link to="/" className="primary-btn">
            Перейти к задачам
          </Link>
        </div>

        <div className="about-illustration">
          <div className="illustration-icon">✓</div>
          <h2>Всё по плану!</h2>
          <p>Каждая задача приближает тебя к цели.</p>
          <div className="fake-task">✓ Запланировать день</div>
          <div className="fake-task">✓ Расставить приоритеты</div>
          <div className="fake-task">○ Достичь цели</div>
        </div>
      </section>

      <section className="values-section">
        <h2>Наши ценности</h2>

        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
