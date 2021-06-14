import SqliteActions from "../database/sqlite/SqliteActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";

/**
 * Create a table to the sqlite database
 */
try {
  console.log("Trying to create the table...");
  const database = new SqliteDatabase("./merchant.db");
  const action = new SqliteActions(database).createTableProducts();

  database.disconnect();
  console.log("Table created!");
  Deno.exit(0);
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
