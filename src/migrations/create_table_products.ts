import SqliteActions from "../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";

/**
 * Create a table products to the sqlite database
 */
console.info("Trying to create the table...");
const database = new SqliteDatabase("./merchant.db");
new SqliteActions(database).createTableProducts();

database.disconnect();
console.info("Table created!");
