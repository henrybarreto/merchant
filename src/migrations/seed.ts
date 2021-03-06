import Items from "./items.ts";

/**
 * Insert products from json fiel to sqlite database
 */
try {
  const items = new Items();
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile("./src/database/items.json");
  const items_from_json: Array<any> = JSON.parse(decoder.decode(data));
  console.log("Trying to add items to database...");
  items_from_json.map((item: any) => {
    const item_name = item["UniqueName"];
    items.db.query("INSERT INTO `products` (name) VALUES (?)", [item_name]);
  });
  items.db.close();
  console.log("Items added!");
  Deno.exit(0);
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
