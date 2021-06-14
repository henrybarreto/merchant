import { DB, Path } from "../../../deps.ts";
import Database from "../Database.ts";

export default class SqliteDatabase extends Database<DB> {
  protected database_connection: DB;
  constructor(connection_information: any) {
    super();
    try {
      let path_sqlite_database = Deno.realPathSync(new Path(connection_information).toString()).toString();
      let database_connection = new DB(path_sqlite_database);
      this.database_connection = database_connection
    } catch(error) {
      console.error("Could not connect to the database: " + error);
      Deno.exit(1);
    }
  }
  public desconnect(): void {
    throw new Error("Method not implemented.");
  }
  public execute(query_to_execute: string) {
    throw new Error("Method not implemented.");
  }
  public query(query_to_execute: string, ...data: [any]): any {
    try {
      const rows = this.database_connection.query(
        "SELECT `name` FROM `products` WHERE name LIKE ?",
        data
      );
      if (rows["_db"]) {
        return rows;
      } else {
        return undefined;
      }

    } catch (error) {
      console.error("Could not execute the query in the database!");
      console.error("Error: " + error.message);
      Deno.exit(1); 
    }
  }
}