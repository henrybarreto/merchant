import { DB, Path } from "../../deps.ts";

export default class Database {
  public static db: DB = new DB(
    Deno.realPathSync(new Path("./merchant.db").toString()).toString(),
  );
  /**
     * Check if a product has a name valid
     * @param  {string} product_name
     * @returns boolean
     */
  public hasProduct(product_name: string): boolean {
    try {
      const rows = Database.db.query(
        "SELECT `name` FROM `products` WHERE name LIKE ?",
        [product_name],
      );
      if (rows["_db"]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(Deno.realPathSync("./merchant.db"));
      console.error(
        "The database maybe not in the same folder of the binary file",
      );
      console.error("Error: " + error.message);
      Deno.exit(1);
    }
  }
}
