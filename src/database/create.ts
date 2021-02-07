import Items from "./items.ts"

/**
 * Create a table to the sqlite database
 */
try {
    const items = new Items()
    console.log("Trying to create the table...");
    items.db.query("CREATE TABLE `products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255))")
    items.db.close()
    console.log("Table created!");
} catch (error) {
   console.error(error); 
}