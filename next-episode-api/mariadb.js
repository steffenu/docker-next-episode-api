const mariadb = require("mariadb");
const client = mariadb.createPool({
  host: "mariadb",
  user: "root",
  database: "eventghost",
});

module.exports = client;

/* async function asyncFunction() {
  let conn;
  try {
    conn = await client.getConnection();
    const res = await conn.query("INSERT INTO myTable value (?, ?)", [
      1,
      "mariadb",
    ]);
    const result = await client.query(
      "INSERT INTO users (id, title , status)",
      [2, "The Witcher", "Running"]
    );

    console.log(result); //[ {val: 1}, meta: ... ]
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

asyncFunction(); */
