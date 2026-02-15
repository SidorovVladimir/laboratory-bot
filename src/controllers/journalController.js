import { client } from '../db.js';

export const getBriefingLog = async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM briefing_log`);
  res.render('briefingLog', { lists: rows });
};

export const getFireBriefingLog = async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM fire_briefing_log`);
  res.render('fireBriefingLog', { lists: rows });
};

export const getPowerToolgLog = async (req, res) => {
  const { rows } = await client.query(
    `SELECT * FROM power_tool_inspection_log`
  );
  res.render('powerToolLog', { lists: rows });
};

export const getSlingLog = async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM sling_inspection_log`);
  res.render('slingLog', { lists: rows });
};

export const updateBriefingLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
    UPDATE briefing_log
    SET date = $1
    WHERE id = $2
    RETURNING *
    `,
      [new Date(), Number(id)]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    res.status(200).json({ message: 'Успешно', date: result.rows[0].date });
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка при обновлении записи в журнале',
    });
  }
};

export const updateFireBriefingLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
    UPDATE fire-briefing-log
    SET date = $1
    WHERE id = $2
    RETURNING *
    `,
      [new Date(), Number(id)]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    res.status(200).json({ message: 'Успешно', date: result.rows[0].date });
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка при обновлении записи в журнале',
    });
  }
};

export const updatePowerToolLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
    UPDATE power_tool_inspection_log
    SET date = $1
    WHERE id = $2
    RETURNING *
    `,
      [new Date(), Number(id)]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    res.status(200).json({ message: 'Успешно', date: result.rows[0].date });
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка при обновлении записи в журнале',
    });
  }
};

export const updateSlingLog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      `
    UPDATE sling_inspection_log
    SET date = $1
    WHERE id = $2
    RETURNING *
    `,
      [new Date(), Number(id)]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    res.status(200).json({ message: 'Успешно', date: result.rows[0].date });
  } catch (err) {
    res.status(500).json({
      message: 'Ошибка при обновлении записи в журнале',
    });
  }
};
