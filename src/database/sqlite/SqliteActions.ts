import { DB } from "../../../deps.ts";
import DatabaseActions from "../DatabaseActions.ts";
import SqliteDatabase from "./SqliteDatabase.ts";

export default class SqliteActions extends DatabaseActions<DB> {
  constructor(sqlite_database: SqliteDatabase) {
    super(sqlite_database);
  }

  public hasProduct(product_name: string): boolean {
    try {
      let product_fetched = this.database.query(
        "SELECT `name` FROM `products` WHERE name LIKE ?",
        [product_name],
      );

      return (product_fetched ? true : false);
    } catch (error) {
      console.error("Error: " + error.message);
      Deno.exit(1);
    }
  }

  public createTableProducts(): void {
    try {
      const product_table = this.database.execute(
        "CREATE TABLE `products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255))"
      );
    } catch (error) {
      console.error("Error: " + error.message);
      Deno.exit(1); 
    }
  }

  public insertProductToProducts(item_name: string) {
    try {
      const product_table = this.database.query("INSERT INTO `products` (name) VALUES (?)", [item_name]);
    } catch (error) {
      console.error("Error: " + error.message);
      Deno.exit(1); 
    }
  }
}