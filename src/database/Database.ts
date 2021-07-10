import { DB, Path } from "../../deps.ts";

export default abstract class Database<D> {
  protected abstract database_connection: D;
  public abstract disconnect(): void;
  public abstract execute(query_to_execute: string): any;
  public abstract query(query_to_execute: string, ...data: [any]): any;
}
