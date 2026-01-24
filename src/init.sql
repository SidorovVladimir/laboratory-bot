-- Удаляем таблицы, если уже существуют (в правильном порядке из-за внешнего ключа)
DROP TABLE IF EXISTS personal_protective_equipments;
DROP TABLE IF EXISTS ppe_templates;
DROP TABLE IF EXISTS ppe_types;
DROP TABLE IF EXISTS ppe_operating_standarts;
DROP TABLE IF EXISTS users;

-- Создаём таблицу пользователей
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL
);
-- Создаём таблицу норм сиз
CREATE TABLE ppe_operating_standarts (
  id SERIAL PRIMARY KEY,
  number_months INTEGER NOT NULL
);
-- Создаём таблицу типов сиз
CREATE TABLE ppe_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Шаблоны СИЗ — конкретные наименования с типом и нормой
CREATE TABLE ppe_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- например: "Каска защитная, ГОСТ 123"
  type_id INTEGER NOT NULL,
  ppe_operating_id INTEGER NOT NULL,
  UNIQUE (name, type_id), -- чтобы не дублировать одно и то же
  CONSTRAINT fk_type
    FOREIGN KEY (type_id)
    REFERENCES ppe_types (id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_operating
    FOREIGN KEY (ppe_operating_id)
    REFERENCES ppe_operating_standarts (id)
    ON DELETE RESTRICT
);

-- Создаём таблицу средств индивидуальной защиты (СИЗ)
CREATE TABLE personal_protective_equipments (
  id SERIAL PRIMARY KEY,
  end_date DATE NOT NULL,
  user_id INTEGER NOT NULL,
  template_id INTEGER NOT NULL,
  -- Внешний ключ на таблицу users
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
    -- Внешний ключ на таблицу ppe_templates
  CONSTRAINT fk_ppe_templates
    FOREIGN KEY (template_id)
     REFERENCES ppe_templates (id)
    ON DELETE CASCADE
);

-- Создаём таблицу авторизации
CREATE TABLE auth (
  id SERIAL PRIMARY KEY,
  user_chat_id INTEGER NOT NULL,
  first_name VARCHAR(100) NOT NULL
);
