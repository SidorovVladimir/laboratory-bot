import { client } from '../db.js';


export const getBriefingLog = async (req, res) => {
const {rows} = await client.query(`SELECT * FROM briefing_log`);
res.render('briefingLog', {lists: rows})
};
