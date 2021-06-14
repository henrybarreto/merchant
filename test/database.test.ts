import { assert, assertThrows } from "../deps.ts";
import SqliteActions from "../src/database/sqlite/SqliteActions.ts";
import SqliteDatabase from "../src/database/sqlite/SqliteDatabase.ts";


Deno.test("Test the database connection", () => {
  let db = new SqliteDatabase("./merchant.db");
  db.disconnect();

  Deno.close(3);
}); 

Deno.test("Test query to the database", () => {
  const database = new SqliteDatabase("./merchant.db");
  const actions = new SqliteActions(database);
  assert(actions.hasProduct("T4_BAG"));
  database.disconnect();
  Deno.close(4);
});