const Pool = require('pg').Pool;
const pool = new Pool({
    user:"postgres",
    password:"FPziJgMmc8",
    database:"youtube",
    host:"localhost",
    port:5432
});
module.exports = pool;