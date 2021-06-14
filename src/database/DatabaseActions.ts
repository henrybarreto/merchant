import Database from "./Database.ts";

export default abstract class DatabaseActions<D> {
  protected database: Database<D>;
  constructor(database: Database<D>) {
    this.database = database;  
  }
  public abstract hasProduct(product_name: string): boolean;
  public abstract createTableProducts(): void;
}