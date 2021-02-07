import { DB } from "../../deps.ts";

export default class Items {
    public db: DB;
    constructor() {
        this.db = new DB("merchant.db");
    }
    /**
     * Check if a product has a name valid
     * @param  {string} product_name
     * @returns boolean
     */
    public hasProduct(product_name: string): boolean {
        const rows = this.db.query("SELECT `name` FROM `products` WHERE name LIKE ?", [product_name]);
        if (rows["_db"]) {
            return true;
        } else {
            return false;
        }
    }
}