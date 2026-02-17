-- Удаляем таблицы, если уже существуют (в правильном порядке из-за внешнего ключа)
DROP TABLE IF EXISTS personal_protective_equipments;
DROP TABLE IF EXISTS ppe_templates;
DROP TABLE IF EXISTS ppe_types;
DROP TABLE IF EXISTS ppe_operating_standarts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS briefing_log;
DROP TABLE IF EXISTS fire_briefing_log;
DROP TABLE IF EXISTS power_tool_inspection_log;
DROP TABLE IF EXISTS sling_inspection_log;


-- Создаём таблицу пользователей
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL
);
-- Создаём таблицу норм сиз
CREATE TABLE IF NOT EXISTS ppe_operating_standarts (
  id SERIAL PRIMARY KEY,
  number_months INTEGER NOT NULL
);
-- Создаём таблицу типов сиз
CREATE TABLE IF NOT EXISTS ppe_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Шаблоны СИЗ — конкретные наименования с типом и нормой
CREATE TABLE IF NOT EXISTS ppe_templates (
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
CREATE TABLE IF NOT EXISTS personal_protective_equipments (
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
CREATE TABLE IF NOT EXISTS auth (
  id SERIAL PRIMARY KEY,
  user_chat_id INTEGER NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  is_notifications_enabled BOOLEAN DEFAULT TRUE
);

-- Создаём таблицу журнал инструктажей на рабочем месте

CREATE TABLE IF NOT EXISTS briefing_log (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  briefing_type VARCHAR(100) NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  periodicity INTEGER NOT NULL
);

-- Создаём таблицу журнал противопожарных инструктажей

CREATE TABLE IF NOT EXISTS fire_briefing_log (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  briefing_type VARCHAR(100) NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  periodicity INTEGER NOT NULL
);

-- Создаём таблицу журнал проверки электроинструмента

CREATE TABLE IF NOT EXISTS power_tool_inspection_log (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  inventory_number VARCHAR(100) NOT NULL,
  periodicity INTEGER NOT NULL
);

-- Создаём таблицу журнал осмотра строп

CREATE TABLE IF NOT EXISTS sling_inspection_log (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  inventory_number VARCHAR(100) NOT NULL,
  periodicity INTEGER NOT NULL
);
