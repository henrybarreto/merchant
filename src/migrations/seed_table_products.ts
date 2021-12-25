import SqliteActions from "../database/actions/products/sqlite/SqliteProductsActions.ts";
import SqliteDatabase from "../database/sqlite/SqliteDatabase.ts";

/**
 * Insert products from json file to sqlite database
 */

const database = new SqliteDatabase("./merchant.db");
const action = new SqliteActions(database);
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("./resources/items.json");
const items_from_json: Array<any> = JSON.parse(decoder.decode(data));

console.info("Trying to add items to database...");

items_from_json.map((item: any) => {
  const item_name = item["UniqueName"];
  action.insertProductToProducts(item_name);
});

database.disconnect();
console.info("Items added!");
